/* One-off / occasional: compress landing hero sources for production. Run: node scripts/optimize-hero-images.js */
const sharp = require("sharp");
const path = require("path");

const root = path.join(__dirname, "..", "public", "assets");

async function main() {
  const orange = sharp(path.join(root, "orange-pfp.png")).resize(1200, null, {
    withoutEnlargement: true,
    fit: "inside",
  });
  await orange.clone().webp({ quality: 82, effort: 4 }).toFile(path.join(root, "orange-pfp-hero.webp"));
  await orange.clone().png({ compressionLevel: 9 }).toFile(path.join(root, "orange-pfp-hero.png"));

  const light = sharp(path.join(root, "light-mode-up3.png")).resize(1200, null, {
    withoutEnlargement: true,
    fit: "inside",
  });
  await light.clone().webp({ quality: 82, effort: 4 }).toFile(path.join(root, "light-mode-hero.webp"));
  await light.clone().png({ compressionLevel: 9 }).toFile(path.join(root, "light-mode-hero.png"));

  console.log("Wrote orange-pfp-hero.webp/png and light-mode-hero.webp/png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
