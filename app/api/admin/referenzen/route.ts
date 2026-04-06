import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await prisma.referenz.findMany({
    orderBy: { reihenfolge: "asc" },
  });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const record = await prisma.referenz.create({
    data: {
      titel: body.titel,
      beschreibung: body.beschreibung ?? "",
      kategorie: body.kategorie ?? "Komplettsanierung",
      stadt: body.stadt ?? "",
      jahr: body.jahr ?? new Date().getFullYear(),
      reihenfolge: body.reihenfolge ?? 0,
      veroeffentlicht: body.veroeffentlicht ?? true,
      titelbild: body.titelbild ?? null,
      bilder: body.bilder ?? [],
    },
  });

  return NextResponse.json(record);
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const record = await prisma.referenz.update({
    where: { id },
    data,
  });

  return NextResponse.json(record);
}
