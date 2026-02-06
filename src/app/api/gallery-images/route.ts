import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");
    const exists = fs.existsSync(galleryDir);
    if (!exists) {
      return NextResponse.json({ images: [] });
    }

    const files = fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(webp|png|jpg|jpeg|gif)$/i.test(f));

    // Sort numerically if filenames are numbers like 1.webp, 2.webp, etc.
    const numericSort = (a: string, b: string) => {
      const na = parseInt(a.split(".")[0], 10);
      const nb = parseInt(b.split(".")[0], 10);
      if (isNaN(na) || isNaN(nb)) return a.localeCompare(b);
      return na - nb;
    };
    const sorted = files.sort(numericSort);

    const images = sorted.map((f) => `/gallery/${f}`);
    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json({ images: [], error: "Failed to list gallery" }, { status: 500 });
  }
}
