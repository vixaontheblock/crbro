import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs/promises";
import path from "path";

const input = path.join(process.cwd(), "public/images/crbro-isotype.png");
const outputDir = path.join(process.cwd(), "public/icons");
const appDir = path.join(process.cwd(), "src/app");

const sizes = [16, 32, 48, 96, 180, 192, 256, 512];

async function ensureDirs() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(appDir, { recursive: true });
}

async function generatePng(size) {
  const output = path.join(outputDir, `icon-${size}.png`);

  await sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: "#111111",
    })
    .flatten({ background: "#111111" })
    .png()
    .toFile(output);

  console.log(`Created public/icons/icon-${size}.png`);
}

async function generateFavicons() {
  const favicon16 = path.join(outputDir, "favicon-16.png");
  const favicon32 = path.join(outputDir, "favicon-32.png");
  const favicon48 = path.join(outputDir, "favicon-48.png");

  await sharp(input)
    .resize(16, 16, { fit: "contain", background: "#111111" })
    .flatten({ background: "#111111" })
    .png()
    .toFile(favicon16);

  await sharp(input)
    .resize(32, 32, { fit: "contain", background: "#111111" })
    .flatten({ background: "#111111" })
    .png()
    .toFile(favicon32);

  await sharp(input)
    .resize(48, 48, { fit: "contain", background: "#111111" })
    .flatten({ background: "#111111" })
    .png()
    .toFile(favicon48);

  const icoBuffer = await pngToIco([favicon16, favicon32, favicon48]);

  await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);
  await fs.writeFile(path.join(process.cwd(), "public/favicon.ico"), icoBuffer);

  console.log("Created src/app/favicon.ico");
  console.log("Created public/favicon.ico");
}

async function generateNextIcons() {
  await sharp(input)
    .resize(512, 512, {
      fit: "contain",
      background: "#111111",
    })
    .flatten({ background: "#111111" })
    .png()
    .toFile(path.join(appDir, "icon.png"));

  await sharp(input)
    .resize(180, 180, {
      fit: "contain",
      background: "#111111",
    })
    .flatten({ background: "#111111" })
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));

  await sharp(input)
    .resize(180, 180, {
      fit: "contain",
      background: "#111111",
    })
    .flatten({ background: "#111111" })
    .png()
    .toFile(path.join(outputDir, "apple-touch-icon.png"));

  console.log("Created src/app/icon.png");
  console.log("Created src/app/apple-icon.png");
  console.log("Created public/icons/apple-touch-icon.png");
}

async function main() {
  try {
    await ensureDirs();

    await Promise.all(sizes.map(generatePng));
    await generateFavicons();
    await generateNextIcons();

    console.log("All CRBRO icons generated successfully.");
  } catch (error) {
    console.error("Icon generation failed:", error);
    process.exit(1);
  }
}

main();