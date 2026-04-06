-- CreateTable
CREATE TABLE "referenzen" (
    "id" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "beschreibung" TEXT,
    "kategorie" TEXT NOT NULL DEFAULT 'Komplettsanierung',
    "stadt" TEXT,
    "jahr" INTEGER NOT NULL DEFAULT 2026,
    "bilder" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "titelbild" TEXT,
    "erstellt_am" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "veroeffentlicht" BOOLEAN NOT NULL DEFAULT true,
    "reihenfolge" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "referenzen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kontakt_anfragen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telefon" TEXT,
    "email" TEXT NOT NULL,
    "nachricht" TEXT,
    "erstellt_am" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gelesen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "kontakt_anfragen_pkey" PRIMARY KEY ("id")
);
