// A live, self-playing view of the 3D lobby for the dashboard. It renders the real lobby scene (same Hub as the game)
// and walks grandma around the paths from pad to pad, so the dashboard shows exactly what the resident will step into.
// It is cheap on purpose: 30 fps, paused while off-screen or in a background tab, one still frame for reduced-motion users.
import * as THREE from 'three'
import { Hub } from './hub.js'

// Grandma's one trip: from the plaza out to the left portal, skirting the lamp post, then she steps in and vanishes.
// (The old route clipped the lamp at [-3.6, -1.0] and she stayed stuck on it.)
const START = [0, -3.6]
const ROUTE = [[-3.4, -3.4], [-4.6, -1.4], [-6.0, 0.4], [-7.4, 0.8]]
const VANISH_PAUSE = 1.4 // seconds she stays gone before walking in again
const STUCK_LIMIT = 2.5 // respawn if she makes no progress for this long

export function mountPreview(canvas, { onFrame } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.toneMapping = THREE.AgXToneMapping
  renderer.toneMappingExposure = 0.8

  const hub = new Hub()
  hub.fitWidth = true
  hub.follow = false // the whole garden in view
  hub.tilt = 0.62
  hub.grandma.root.position.set(START[0], START[1], 0)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    hub.resize(w / h)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas)

  let stop = false, last = performance.now(), t = 0, leg = 0, wait = 0, told = false, stuck = 0, bestD = Infinity
  const pad = { move: [0, 0, 0], look: [0, 0], zoom: 0, cam: false, enter: false, back: false, source: 'preview' }

  const frame = (now) => {
    if (stop) return
    requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.1)
    if (dt < 1 / 32 && told) return // ~30 fps is plenty for a preview
    last = now
    if (!visible || document.hidden) return
    t += dt
    hub.yaw = 0.16 * Math.sin(t * 0.12) // a slow sway so it feels alive
    const p = hub.grandma.root.position
    if (wait > 0) {
      // she's gone through the portal; after a beat she appears back at the start
      wait -= dt
      pad.move = [0, 0, 0]
      if (wait <= 0) {
        p.set(START[0], START[1], 0)
        hub.grandma.root.visible = true
        leg = 0
        stuck = 0
        bestD = Infinity
      }
    } else {
      const [tx, ty] = ROUTE[leg]
      const dx = tx - p.x, dy = ty - p.y
      const d = Math.hypot(dx, dy)
      if (d < 0.25) {
        stuck = 0
        if (leg === ROUTE.length - 1) {
          hub.grandma.root.visible = false
          wait = VANISH_PAUSE
          pad.move = [0, 0, 0]
        } else leg++
        bestD = Infinity
      } else {
        // the stick is read relative to the camera, so undo the sway to keep her heading true
        const c = Math.cos(hub.yaw), sn = Math.sin(hub.yaw), wx = dx / d, wy = dy / d
        pad.move = [wx * c + wy * sn, -wx * sn + wy * c, 0.85]
        if (d < bestD - 0.01) { bestD = d; stuck = 0 } else stuck += dt
        if (stuck > STUCK_LIMIT) wait = 0.01 // blocked somehow: just start the trip over
      }
    }
    hub.update(dt, pad)
    renderer.render(hub.scene, hub.camera)
    if (!told) {
      told = true
      onFrame?.()
    }
  }
  if (still) {
    requestAnimationFrame(() => {
      hub.update(0.016, pad)
      renderer.render(hub.scene, hub.camera)
      onFrame?.()
    })
  } else requestAnimationFrame(frame)

  return {
    dispose() {
      stop = true
      ro.disconnect()
      io.disconnect()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
