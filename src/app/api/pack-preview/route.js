import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const previewFiles = {
  "drum-kicks": "drum-kit-kicks.mp3",
  "drum-snares": "drum-kit-snares.mp3",
  "drum-percs": "drum-kit-percs.mp3",

  "sample-loop-01": "sample-pack-loop-01.mp3",
  "sample-loop-02": "sample-pack-loop-02.mp3",

  "beat-preview-01": "beat-pack-preview-01.mp3",
  "beat-preview-02": "beat-pack-preview-02.mp3",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key || !previewFiles[key]) {
    return new Response("Preview not found", { status: 404 });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "private",
      "previews",
      previewFiles[key]
    );

    const audioBuffer = await readFile(filePath);

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return new Response("Preview unavailable", { status: 404 });
  }
}