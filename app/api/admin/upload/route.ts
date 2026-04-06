import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/referenzen");

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 80;

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const filePath = formData.get("path") as string | null;

  if (!file || !filePath) {
    return NextResponse.json(
      { error: "File and path required" },
      { status: 400 }
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files allowed" },
      { status: 400 }
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 10MB)" },
      { status: 400 }
    );
  }

  // Always save as .jpg for consistency
  const jpgPath = filePath.replace(/\.[^.]+$/, ".jpg");
  const targetPath = path.join(UPLOAD_DIR, jpgPath);
  const targetDir = path.dirname(targetPath);

  fs.mkdirSync(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());

  // Resize and optimize with sharp
  await sharp(buffer)
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY })
    .toFile(targetPath);

  const url = `/uploads/referenzen/${jpgPath}`;
  return NextResponse.json({ url });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paths } = await req.json();

  if (!paths || !Array.isArray(paths)) {
    return NextResponse.json(
      { error: "Paths array required" },
      { status: 400 }
    );
  }

  for (const p of paths) {
    const filePath = path.join(UPLOAD_DIR, p);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  return NextResponse.json({ ok: true });
}
