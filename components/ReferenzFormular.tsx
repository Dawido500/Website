"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X, Star } from "lucide-react";

interface Referenz {
  id?: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  stadt: string;
  jahr: number;
  reihenfolge: number;
  veroeffentlicht: boolean;
  titelbild: string | null;
}

interface ImageItem {
  url: string;
  path: string;        // storage path
  isExisting: boolean;  // already uploaded
  file?: File;          // local file to upload
  preview?: string;     // local object URL
}

interface InitialData {
  id: string;
  titel: string;
  beschreibung?: string;
  kategorie: string;
  stadt: string;
  jahr: number | null;
  reihenfolge: number;
  veroeffentlicht: boolean;
  titelbild: string | null;
  bilder?: string[];
}

interface Props {
  initial?: InitialData;
  onDone: () => void;
}


export default function ReferenzFormular({ initial, onDone }: Props) {
  const isEdit = !!initial?.id;

  const [form, setForm] = useState<Referenz>({
    titel: initial?.titel ?? "",
    beschreibung: initial?.beschreibung ?? "",
    kategorie: initial?.kategorie ?? "",
    stadt: initial?.stadt ?? "",
    jahr: initial?.jahr ?? new Date().getFullYear(),
    reihenfolge: initial?.reihenfolge ?? 0,
    veroeffentlicht: initial?.veroeffentlicht ?? true,
    titelbild: initial?.titelbild ?? null,
  });

  const [images, setImages] = useState<ImageItem[]>(() => {
    if (!initial?.bilder) return [];
    return initial.bilder.map((url) => {
      const path = url.split("/referenzen/").pop() ?? "";
      return { url, path, isExisting: true };
    });
  });

  const [titelbildUrl, setTitelbildUrl] = useState(initial?.titelbild ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (field: string, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /* ───── Image handling ───── */

  const addFiles = (files: FileList | File[]) => {
    const newImages: ImageItem[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        url: "",
        path: "",
        isExisting: false,
        file,
        preview: URL.createObjectURL(file),
      }));
    setImages((prev) => {
      const updated = [...prev, ...newImages];
      // Auto-select first as titelbild if none set
      if (!titelbildUrl && updated.length > 0) {
        setTitelbildUrl(updated[0].preview || updated[0].url);
      }
      return updated;
    });
  };

  const removeImage = async (index: number) => {
    const img = images[index];

    // Delete from storage if existing
    if (img.isExisting && img.path) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: [img.path] }),
      });
    }

    // Revoke object URL
    if (img.preview) URL.revokeObjectURL(img.preview);

    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Reset titelbild if removed
      const removedSrc = img.preview || img.url;
      if (titelbildUrl === removedSrc) {
        setTitelbildUrl(updated.length > 0 ? (updated[0].preview || updated[0].url) : "");
      }
      return updated;
    });
  };

  const setAsTitelbild = (img: ImageItem) => {
    setTitelbildUrl(img.preview || img.url);
  };

  /* ───── Drag & Drop ───── */

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  };

  /* ───── Save ───── */

  const handleSave = async () => {
    if (!form.titel.trim()) {
      setError("Titel ist erforderlich.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      let referenzId = initial?.id;

      // Create or update referenz record
      const payload = {
        titel: form.titel,
        beschreibung: form.beschreibung,
        kategorie: form.kategorie,
        stadt: form.stadt,
        jahr: form.jahr,
        reihenfolge: form.reihenfolge,
        veroeffentlicht: form.veroeffentlicht,
      };

      if (isEdit && referenzId) {
        const res = await fetch("/api/admin/referenzen", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: referenzId, ...payload }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text.startsWith("{") ? JSON.parse(text).error : "Fehler beim Speichern");
        }
      } else {
        const res = await fetch("/api/admin/referenzen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        if (!res.ok) {
          throw new Error(text.startsWith("{") ? JSON.parse(text).error : "Fehler beim Erstellen");
        }
        const data = JSON.parse(text);
        referenzId = data.id;
      }

      // Upload new images
      for (const img of images) {
        if (img.isExisting || !img.file) continue;

        const ext = img.file.name.split(".").pop() ?? "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const storagePath = `${referenzId}/${fileName}`;

        const fd = new FormData();
        fd.append("file", img.file);
        fd.append("path", storagePath);

        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const text = await res.text();
        if (!res.ok) throw new Error(text.startsWith("{") ? JSON.parse(text).error : "Upload fehlgeschlagen");
        const json = JSON.parse(text);

        // Map preview URL to real URL for titelbild matching
        if (img.preview && titelbildUrl === img.preview) {
          setTitelbildUrl(json.url);
        }

        img.url = json.url;
        img.path = storagePath;
        img.isExisting = true;

        if (img.preview) {
          URL.revokeObjectURL(img.preview);
          img.preview = undefined;
        }
      }

      // Collect all image URLs and determine titelbild
      const allImageUrls = images.filter(img => img.url).map(img => img.url);
      // Find the titelbild: match current titelbildUrl to an uploaded image, or use first
      let finalTitelbild: string | null = null;
      for (const img of images) {
        const src = img.preview || img.url;
        if (src === titelbildUrl) {
          finalTitelbild = img.url;
          break;
        }
      }
      if (!finalTitelbild && allImageUrls.length > 0) {
        finalTitelbild = allImageUrls[0];
      }

      // Update bilder + titelbild on the record
      await fetch("/api/admin/referenzen", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: referenzId, titelbild: finalTitelbild, bilder: allImageUrls }),
      });

      onDone();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Fehler beim Speichern.";
      setError(message);
      setSaving(false);
    }
  };

  /* ───── Render ───── */

  const inputClass =
    "w-full rounded-lg border border-[#E0DDD6] bg-transparent px-4 py-3 font-body text-[14px] text-dark outline-none transition-colors placeholder:text-text/40 focus:border-accent";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-[24px] text-dark">
          {isEdit ? "Referenz bearbeiten" : "Neue Referenz"}
        </h1>
        <button
          onClick={onDone}
          className="font-body text-sm text-text transition-colors hover:text-dark"
        >
          Abbrechen
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left — Fields */}
        <div className="space-y-5">
          <div className="rounded-xl border border-[#E0DDD6] bg-white p-6">
            <h2 className="mb-5 font-body text-xs font-medium uppercase tracking-wider text-text/50">
              Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-body text-[13px] text-text">
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={form.titel}
                  onChange={(e) => update("titel", e.target.value)}
                  placeholder="z. B. Altbau-Komplettsanierung"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block font-body text-[13px] text-text">
                  Beschreibung
                </label>
                <textarea
                  value={form.beschreibung}
                  onChange={(e) => update("beschreibung", e.target.value)}
                  rows={4}
                  placeholder="Kurze Projektbeschreibung …"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-[13px] text-text">
                    Kategorie
                  </label>
                  <input
                    type="text"
                    value={form.kategorie}
                    onChange={(e) => update("kategorie", e.target.value)}
                    placeholder="z. B. Komplettsanierung"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-[13px] text-text">
                    Stadt
                  </label>
                  <input
                    type="text"
                    value={form.stadt}
                    onChange={(e) => update("stadt", e.target.value)}
                    placeholder="z. B. München"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-[13px] text-text">
                    Jahr
                  </label>
                  <input
                    type="number"
                    value={form.jahr}
                    onChange={(e) => update("jahr", parseInt(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-[13px] text-text">
                    Reihenfolge
                  </label>
                  <input
                    type="number"
                    value={form.reihenfolge}
                    onChange={(e) => update("reihenfolge", parseInt(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={form.veroeffentlicht}
                  onChange={(e) => update("veroeffentlicht", e.target.checked)}
                  className="h-4 w-4 rounded border-[#E0DDD6] text-accent accent-accent"
                />
                <span className="font-body text-[14px] text-dark">
                  Veröffentlicht
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right — Images + Save */}
        <div className="space-y-5">
          {/* Upload zone */}
          <div className="rounded-xl border border-[#E0DDD6] bg-white p-6">
            <h2 className="mb-5 font-body text-xs font-medium uppercase tracking-wider text-text/50">
              Bilder
            </h2>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 transition-colors ${
                dragging
                  ? "border-accent bg-accent/5"
                  : "border-[#E0DDD6] hover:border-accent/40"
              }`}
            >
              <Upload
                className="mb-2 h-6 w-6 text-text/30"
                strokeWidth={1.5}
              />
              <p className="font-body text-sm text-text/60">
                Bilder hierher ziehen
              </p>
              <p className="font-body text-xs text-text/30">
                oder klicken zum Auswählen
              </p>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
              className="hidden"
            />

            {/* Image grid */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {images.map((img, i) => {
                  const src = img.preview || img.url;
                  const isTitel = titelbildUrl === src;
                  return (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-[#E0DDD6]">
                      <Image
                        src={src}
                        alt={`Bild ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />

                      {/* Titelbild badge */}
                      {isTitel && (
                        <span className="absolute left-1 top-1 rounded bg-accent px-1.5 py-0.5 font-body text-[10px] font-medium text-white">
                          Titelbild
                        </span>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        {!isTitel && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAsTitelbild(img);
                            }}
                            className="rounded-full bg-white/90 p-1.5 text-dark transition-colors hover:bg-white"
                            title="Als Titelbild setzen"
                          >
                            <Star className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(i);
                          }}
                          className="rounded-full bg-white/90 p-1.5 text-red-600 transition-colors hover:bg-white"
                          title="Entfernen"
                        >
                          <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Save */}
          {error && (
            <p className="font-body text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-accent py-3.5 font-body text-[15px] font-medium text-white transition-all hover:bg-accent/90 disabled:opacity-60"
          >
            {saving ? "Speichern …" : isEdit ? "Änderungen speichern" : "Referenz erstellen"}
          </button>
        </div>
      </div>
    </div>
  );
}
