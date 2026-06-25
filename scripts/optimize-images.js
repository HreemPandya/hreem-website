/* One-off: resize + convert the carousel artwork and project images to WebP, so
   visitors download ~100KB instead of multi-MB PNGs. Run: node scripts/optimize-images.js
   Sources live in public/assets; outputs are written next to them as <name>.webp. */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Sources live outside the deployed folder (scripts/image-sources); optimized
// WebP outputs are written into public/assets (which is what ships).
const srcRoot = path.join(__dirname, "image-sources");
const outRoot = path.join(__dirname, "..", "public", "assets");

// [sourceFile, outputName (no ext), maxWidth, quality]
const jobs = [
  // Artwork carousel (digital art — keep quality a touch higher)
  ["drawing1.png", "drawing1", 1280, 82],
  ["drawing2.png", "drawing2", 1280, 82],
  ["drawing3.png", "drawing3", 1280, 82],
  ["drawing4.png", "drawing4", 1280, 82],
  ["drawing5.png", "drawing5", 1280, 82],
  ["drawing6.png", "drawing6", 1280, 82],
  ["drawing7.png", "drawing7", 1280, 82],
  ["drawing8 (2).png", "drawing8", 1280, 82],
  // Project cards (shown small)
  ["base-fridgemind-proj.png", "base-fridgemind-proj", 1100, 80],
  ["base-cliara.png", "base-cliara", 1100, 80],
  ["base-bemyeyes-crop.png", "base-bemyeyes-crop", 1100, 80],
  ["base-crisis.png", "base-crisis", 1100, 80],
  ["base-securedu-copy.png", "base-securedu-copy", 1100, 80],
  ["project-4.png", "project-4", 1100, 80],
  ["project-6.png", "project-6", 1100, 80],
  // Project modals (shown larger)
  ["project-5.png", "project-5", 1400, 80],
  ["project-8.png", "project-8", 1400, 80],
  ["project-3-copy.png", "project-3-copy", 1400, 80],
  ["expanded-cliara.png", "expanded-cliara", 1400, 80],
  ["expanded-hc.png", "expanded-hc", 1400, 80],
  ["expanded-gesture.png", "expanded-gesture", 1400, 80],
  ["expanded-crisis.png", "expanded-crisis", 1400, 80],
  ["expanded-secure.png", "expanded-secure", 1400, 80],
];

async function main() {
  for (const [srcName, outName, maxW, quality] of jobs) {
    const srcPath = path.join(srcRoot, srcName);
    if (!fs.existsSync(srcPath)) {
      console.warn("skip (missing source):", srcName);
      continue;
    }
    const outPath = path.join(outRoot, `${outName}.webp`);
    await sharp(srcPath)
      .resize(maxW, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality, effort: 4 })
      .toFile(outPath);
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`wrote ${outName}.webp (${kb} KB)`);
  }
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
