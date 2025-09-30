"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ZoomIn, ZoomOut, RotateCcw, Download, Printer, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function RegistrationCertification() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    if (contentRef.current && certificatesRef.current) {
      gsap.set([contentRef.current, certificatesRef.current], { y: 30, opacity: 0 });
      tl.to(contentRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .to(certificatesRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const certificateImages = [
    { src: "/certificates/Certificate1.webp", title: "Coffee Board of India - Exporter Registration" },
    { src: "/certificates/Certificate4.webp", title: "Coffee Board of India - Exporter Registration" },
    { src: "/certificates/Certificate5.webp", title: "APEDA" },
    { src: "/certificates/Certificate6.webp", title: "TPCI" },
    { src: "/certificates/Certificate2.webp", title: "APEDA" },
    { src: "/certificates/Certificate3.webp", title: "TPCI" },
  ];
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const openViewer = (src: string) => {
    const idx = certificateImages.findIndex((i) => i.src === src);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setIsViewerOpen(true);
    setZoom(1);
    setRotation(0);
  };
  const closeViewer = () => setIsViewerOpen(false);
  const nextImage = () => setCurrentIndex((i) => (i + 1) % certificateImages.length);
  const prevImage = () => setCurrentIndex((i) => (i - 1 + certificateImages.length) % certificateImages.length);
  const zoomInFn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOutFn = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetView = () => { setZoom(1); setRotation(0); };
  const rotate = () => setRotation((r) => (r + 90) % 360);
  const downloadCurrent = () => {
    const a = document.createElement("a");
    a.href = certificateImages[currentIndex].src;
    a.download = certificateImages[currentIndex].src.split("/").pop() || "certificate.webp";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const printCurrent = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Print</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;background:#fff"><img src="${certificateImages[currentIndex].src}" style="max-width:100%;max-height:100vh;"/></body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  return (
    <section ref={sectionRef} className="bg-gray-50">
      {/* Overlay Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <button aria-label="Close" onClick={closeViewer} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
            <X size={20} />
          </button>
          <button aria-label="Previous" onClick={prevImage} className="absolute left-4 md:left-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft size={24} />
          </button>
          <button aria-label="Next" onClick={nextImage} className="absolute right-4 md:right-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronRight size={24} />
          </button>

          <div className="max-h-[85vh] max-w-[90vw] flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 bg-white/10 text-white rounded-lg px-3 py-2">
              <button onClick={zoomInFn} className="p-2 hover:bg-white/20 rounded" aria-label="Zoom In"><ZoomIn size={18} /></button>
              <button onClick={zoomOutFn} className="p-2 hover:bg-white/20 rounded" aria-label="Zoom Out"><ZoomOut size={18} /></button>
              <button onClick={rotate} className="p-2 hover:bg-white/20 rounded" aria-label="Rotate"><RotateCcw size={18} /></button>
              <button onClick={resetView} className="p-2 hover:bg-white/20 rounded" aria-label="Reset">Reset</button>
              <button onClick={downloadCurrent} className="p-2 hover:bg-white/20 rounded" aria-label="Download"><Download size={18} /></button>
              <button onClick={printCurrent} className="p-2 hover:bg-white/20 rounded" aria-label="Print"><Printer size={18} /></button>
            </div>
            <div className="overflow-auto">
              <Image
                src={certificateImages[currentIndex].src}
                alt={certificateImages[currentIndex].title}
                width={900}
                height={900}
                className="object-contain max-h-[75vh]"
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Top Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 font-serif">Registration & Certification</h1>
          </div>

          {/* Registration grid (responsive) */}
          <div ref={contentRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { src: "/registration/apeda.webp", alt: "APEDA Registration" },
              { src: "/registration/9.webp", alt: "Registration Certificate" },
              { src: "/registration/ccri.webp", alt: "CCRI Certificate" },
              { src: "/registration/ECGC.webp", alt: "ECGC Registration" },
              { src: "/registration/7.webp", alt: "Certificate" },
              { src: "/registration/6.webp", alt: "Registration Document" },
              { src: "/registration/1.webp", alt: "Certificate 1" },
              { src: "/registration/4.webp", alt: "Certificate 4" },
              { src: "/registration/3.webp", alt: "Certificate 3" },
            ].map((img) => (
              <div key={img.src} className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow">
                <Image src={img.src} alt={img.alt} width={160} height={160} className="w-24 h-24 md:w-28 md:h-28 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <div ref={certificatesRef} className="bg-coffee-brown shadow-lg p-8">
        <div className="text-center py-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Registrations & Quality Assurance</h3>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Coffee Board of India - Certificate 1 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate1.webp" alt="Coffee Board Certificate 1" width={280} height={350} className="w-full h-auto object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate1.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">Coffee Board of India</h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>

          {/* Coffee Board of India - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate4.webp" alt="Coffee Board Certificate 2" width={280} height={350} className="w-full h-auto object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate4.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">Coffee Board of India</h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>

          {/* APEDA - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate5.webp" alt="APEDA Certificate" width={280} height={320} className="w-full h-auto object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate5.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">APEDA</h4>
            <p className="text-white text-sm">Agricultural & Processed Food Products Export Development Authority</p>
          </div>

          {/* TPCI - Certificate 4 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate6.webp" alt="TPCI Certificate" width={280} height={350} className="w-full h-auto object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate6.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">TPCI</h4>
            <p className="text-white text-sm">Trade Promotion Council of India</p>
          </div>

          {/* APEDA - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate2.webp" alt="APEDA Certificate" width={280} height={350} className="w-full h-auto object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate2.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">APEDA</h4>
            <p className="text-white text-sm">Agricultural & Processed Food Products Export Development Authority</p>
          </div>

          {/* TPCI - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image src="/certificates/Certificate3.webp" alt="TPCI Certificate" width={280} height={300} className="w-full h-[300px] object-contain rounded-lg cursor-zoom-in" onClick={() => openViewer("/certificates/Certificate3.webp")} />
            </div>
            <h4 className="text-white font-bold text-lg mb-1">TPCI</h4>
            <p className="text-white text-sm">Trade Promotion Council of India</p>
          </div>
        </div>
      </div>
    </section>
  );
}