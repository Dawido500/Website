"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ok" | "denied">("loading");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) setStatus("ok");
        else {
          setStatus("denied");
          router.replace("/admin");
        }
      })
      .catch(() => {
        setStatus("denied");
        router.replace("/admin");
      });
  }, [router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="font-body text-sm text-text">Laden …</p>
      </div>
    );
  }

  if (status === "denied") return null;

  return <>{children}</>;
}
