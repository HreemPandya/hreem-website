import { useEffect, useRef, useState } from "react";

// Live three.js render of the StickDrift lobby (grandma strolling between the
// game pads). A still shows right away, the canvas fades in once it's drawing.
// The three.js code is only fetched when this mounts (i.e. the modal opens).
const LobbyPreview = ({ still, alt }) => {
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let dispose;
    import("../lib/stickdrift-lobby/preview.js")
      .then(({ mountPreview }) => {
        if (cancelled || !canvasRef.current) return;
        try {
          dispose = mountPreview(canvasRef.current, { onFrame: () => setLive(true) }).dispose;
        } catch {
          /* no WebGL: keep the still */
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    // Fills the whole column; the camera fits the garden's width, so nothing gets cropped.
    <div className="absolute inset-0 bg-[#0b140d]" role="img" aria-label={alt}>
      <img src={still} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default LobbyPreview;
