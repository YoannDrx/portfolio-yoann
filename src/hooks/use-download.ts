"use client";

import { useState, useCallback } from "react";

type DownloadStates = Record<string, boolean>;

export function useDownload() {
  const [loading, setLoading] = useState<DownloadStates>({});

  const download = useCallback(
    async (id: string, url: string, filename: string) => {
      if (loading[id]) return;

      setLoading((prev) => ({ ...prev, [id]: true }));

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      } catch (err) {
        console.error("Download error:", err);
      } finally {
        setLoading((prev) => ({ ...prev, [id]: false }));
      }
    },
    [loading]
  );

  const isLoading = useCallback(
    (id: string) => !!loading[id],
    [loading]
  );

  return { download, isLoading };
}
