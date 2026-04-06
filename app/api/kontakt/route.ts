import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendeKontaktBenachrichtigung } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, telefon, email, nachricht } = body;

    if (!name || !email || !nachricht) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    await prisma.kontaktAnfrage.create({
      data: { name, telefon, email, nachricht },
    });

    // E-Mail-Benachrichtigung senden (nicht blockierend)
    sendeKontaktBenachrichtigung({ name, email, telefon, nachricht }).catch(
      (err) => console.error("E-Mail-Versand fehlgeschlagen:", err)
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Fehler beim Senden" },
      { status: 500 }
    );
  }
}
