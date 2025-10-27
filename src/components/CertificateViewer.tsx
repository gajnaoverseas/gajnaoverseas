"use client";
import { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";
import { X } from "lucide-react";
import { Download } from "lucide-react";
import { ArrowBigLeft } from "lucide-react";
import { ArrowBigRight } from "lucide-react";
import { Plus, Minus } from "lucide-react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";



type Props = {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  title?: string;
};

export default function CertificateViewer({ images, initialIndex = 0, onClose, title }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);

  // Measure displayed image size at base zoom to scale both axes
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [baseSize, setBaseSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const measureBaseSize = () => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;
    const naturalWidth = img.naturalWidth || 0;
    const naturalHeight = img.naturalHeight || 0;
    if (!naturalWidth || !naturalHeight) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    // Fit image within container preserving aspect ratio (object-contain behavior)
    const scale = Math.min(cw / naturalWidth, ch / naturalHeight);
    setBaseSize({ width: Math.max(1, Math.floor(naturalWidth * scale)), height: Math.max(1, Math.floor(naturalHeight * scale)) });
  };

  useEffect(() => {
    const onResize = () => {
      measureBaseSize();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Recalculate base size when image changes
  useEffect(() => {
    // Small delay to ensure image is loaded
    const timer = setTimeout(() => {
      measureBaseSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [index]);

  // Initialize sidebar visibility: hidden on mobile, visible on desktop
  useEffect(() => {
    try {
      const isDesktop = window.innerWidth >= 640; // sm breakpoint
      setShowSidebar(isDesktop);
    } catch {}
  }, []);

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
        {/* Semi-transparent thumbnail overlay for both mobile and desktop */}
        {showSidebar && (
          <aside className="absolute left-0 top-10 z-40 h-full w-44  md:w-56 lg:w-80 bg-black/70 backdrop-blur-sm border-r border-white/20 overflow-y-auto">
            <div className="p-2 space-y-2">
              <div className="flex justify-end mb-2 sm:hidden">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                  aria-label="Close sidebar"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              {images.map((src, i) => (
                <button
                  key={src + i}
                  className={`block w-full rounded-md overflow-hidden border ${i === index ? "border-emerald-400" : "border-transparent"}`}
                  onClick={() => {
                    setIndex(i);
                    // Only close sidebar on mobile after selection
                    if (window.innerWidth < 640) {
                      setShowSidebar(false);
                    }
                  }}
                  aria-label={`Go to page ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Certificate page ${i + 1}`}
                    className="w-full h-52  md:h-72 object-contain"
                  />
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main viewer area - now takes full width */}
        <div className="flex-1 min-w-0 h-full flex flex-col w-full">
          {/* Toolbar (static, unaffected by zoom) */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-black/50 border-b border-white/10">
            <div className="flex items-center gap-3 text-white">
              {/* <span className="md:hidden flex text-sm sm:text-base font-semibold line-clamp-1">{title || "Certificate"}</span> */}
              {/* <span className="text-xs sm:text-sm opacity-80">Page {index + 1} of {images.length}</span> */}
            </div>
          <div className="flex items-center gap-2">
              {/* Toggle sidebar visibility */}
              <button
                onClick={() => setShowSidebar((v) => !v)}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
                title={showSidebar ? "Hide sidebar" : "Show sidebar"}
              >
                {showSidebar ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
              </button>
              {/* Zoom controls */}
              <button
                onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                disabled={zoom <= 0.25}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
                aria-label="Zoom out"
                title="Zoom out"
              >
                <Minus className="h-3 w-3" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(6, +(z + 0.25).toFixed(2)))}
                disabled={zoom >= 6}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
                aria-label="Zoom in"
                title="Zoom in"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous page"
              >
                <ArrowBigLeft className="h-3 w-3" />
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Next page"
              >
                <ArrowBigRight className="h-3 w-3" />
              </button>
              <button
                onClick={downloadCurrent}
                className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                aria-label="Download current page"
              >
                <Download className="h-3 w-3" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded bg-white/10 text-white hover:bg-white/20"
                aria-label="Close viewer"
                title="Close"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Thumbnails sidebar is now on the left; no top strip */}



          {/* Scrollable image container (right) */}
          <div className="flex flex-1 overflow-auto p-2 sm:p-4 relative z-10" style={{ touchAction: "pan-x pan-y" }}>
            <div ref={containerRef} className="h-full w-full relative">
              {/* Scale both width and height so zoom fills viewport and allows panning */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: baseSize.width > 0 ? baseSize.width * zoom : "auto",
                  height: baseSize.height > 0 ? baseSize.height * zoom : "auto",
                  minWidth: baseSize.width > 0 ? baseSize.width * zoom : "auto",
                  minHeight: baseSize.height > 0 ? baseSize.height * zoom : "auto",
                }}
              >
                <img
                  ref={imgRef}
                  onLoad={() => {
                    // Ensure baseSize is calculated when image loads
                    setTimeout(measureBaseSize, 50);
                  }}
                  src={images[index]}
                  alt={`Certificate page ${index + 1}`}
                  className="object-contain select-none w-full h-full"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}