"use client";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

type Props = {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
};

export default function CertificateViewer({ images, initialIndex = 0, onClose, title }: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  const downloadCurrent = () => {
    const url = images[index];
    const fileName = url.split("/").pop() || `certificate-${index + 1}.webp`;
    try {
      saveAs(url, fileName);
    } catch {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 z-[10001] bg-black/80">
      <div className="absolute inset-0 flex">
        {/* Thumbnails sidebar */}
        <aside className="w-24 sm:w-40 md:w-56 lg:w-64 h-full bg-black/40 border-r border-white/20 overflow-y-auto">
          <div className="p-2 space-y-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                className={`block w-full rounded-md overflow-hidden border ${i === index ? "border-emerald-400" : "border-transparent"}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to page ${i + 1}`}
              >
                {/* Using native img for scrollability and exact sizing */}
                <img
                  src={src}
                  alt={`Certificate page ${i + 1}`}
                  className="w-full h-20 sm:h-24 md:h-28 object-cover"
                />
              </button>
            ))}
          </div>
        </aside>

        {/* Main viewer area */}
        <div className="flex-1 h-full flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-black/50 border-b border-white/10">
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm sm:text-base font-semibold line-clamp-1">{title || "Certificate"}</span>
              <span className="text-xs sm:text-sm opacity-80">Page {index + 1} of {images.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous page"
              >
                ◀
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Next page"
              >
                ▶
              </button>
              <button
                onClick={downloadCurrent}
                className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                aria-label="Download current page"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Close viewer"
              >
                Close
              </button>
            </div>
          </div>

          {/* Scrollable image container */}
          <div className="flex-1 overflow-auto p-2 sm:p-4">
            <div className="min-h-full flex items-start justify-center">
              <img
                src={images[index]}
                alt={`Certificate page ${index + 1}`}
                className="h-[80vh] md:h-[85vh] w-auto max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}