import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs/promises";
import path from "path";

const logoSource = path.join(process.cwd(), "public/images/crbro-logo.png");
const isotypeSource = path.join(process.cwd(), "public/images/crbro-isotype.png");

const outputDir = path.join(process.cwd(), "public/icons");
const appDir = path.join(process.cwd(), "src/app");

async function ensureDirs() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(appDir, { recursive: true });
}

async function makeLogoIcon(size, output) {
  const logoBuffer = await sharp(logoSource)
    .resize(Math.round(size * 0.86), Math.round(size * 0.86), {
      fit: "contain",
      background: { r: 17, g: 17, b: 17, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#111111",
    },
  })
    .composite([{ input: logoBuffer, gravity: "center" }])
    .png()
    .toFile(output);
}

async function makeIsotypeIcon(size, output) {
  const iconBuffer = await sharp(isotypeSource)
    .resize(Math.round(size * 0.72), Math.round(size * 0.72), {
      fit: "contain",
      background: { r: 17, g: 17, b: 17, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#111111",
    },
  })
    .composite([{ input: iconBuffer, gravity: "center" }])
    .png()
    .toFile(output);
}

async function makeFavicons() {
  const favicon16 = path.join(outputDir, "favicon-16.png");
  const favicon32 = path.join(outputDir, "favicon-32.png");
  const favicon48 = path.join(outputDir, "favicon-48.png");

  await makeLogoIcon(16, favicon16);
  await makeLogoIcon(32, favicon32);
  await makeLogoIcon(48, favicon48);

  const ico = await pngToIco([favicon16, favicon32, favicon48]);

  await fs.writeFile(path.join(appDir, "favicon.ico"), ico);
  await fs.writeFile(path.join(appDir, "icon.ico"), ico);
  await fs.writeFile(path.join(outputDir, "favicon.ico"), ico);
  await fs.writeFile(path.join(process.cwd(), "public/favicon.ico"), ico);
  await fs.writeFile(path.join(process.cwd(), "public/icon.ico"), ico);

  console.log("Created favicon.ico files");
}

async function makeAppIcons() {
  const sizes = [16, 32, 48, 96, 180, 192, 256, 512];

  for (const size of sizes) {
    await makeIsotypeIcon(size, path.join(outputDir, `icon-${size}.png`));
    console.log(`Created public/icons/icon-${size}.png`);
  }

  await makeIsotypeIcon(512, path.join(appDir, "icon.png"));
  await makeIsotypeIcon(180, path.join(appDir, "apple-icon.png"));
  await makeIsotypeIcon(180, path.join(outputDir, "apple-touch-icon.png"));

  console.log("Created app icons");
}

async function main() {
  await ensureDirs();
  await makeFavicons();
  await makeAppIcons();

  console.log("CRBRO favicon generated clean.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});