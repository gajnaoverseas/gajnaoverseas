"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Smartphone, Video } from "lucide-react";
// PDF certificates served from /public/certificates
const PDF_CERTIFICATES = [
  {
    title: "Apeda RCMC",
    subtitle: "Agricultural & Processed Food Products Export Development Authority",
    file: "/certificates/Apeda RCMC.pdf",
  },
  {
    title: "MSME Certificate",
    subtitle: "Ministry of MSME — Udyam Registration",
    available: false,
  },
  {
    title: "Coffee Board RCMC",
    subtitle: "Coffee Board of India",
    file: "/certificates/RCMC - Coffee Board.pdf",
  },
  {
    title: "GST Registration Certificate",
    subtitle: "GSTIN Certificate",
    file: "/certificates/GST-Registration-Certificate.pdf",
  },
  {
    title: "Import Export Code",
    subtitle: "IEC",
    file: "/certificates/IEC-GajnaOverseas(OPC)PrivateLimited.pdf",
  },
  {
    title: "Coffee Entrepreneurship — Certificate of Participation",
    subtitle: "Coffee Board of India",
    file: "/certificates/Coffee Entrepreneurship - Certificate of Participation By Coffee Board Of India.pdf",
  },
  {
    title: "Coffee Exporters Training Programme (Vikrayam)",
    subtitle: "Certificate of Participation",
    file: "/certificates/Certificate - Coffee Exporters Training Programme.pdf",
  },
  {
    title: "Coffee Roasting & Brewing Programme (Kaapi Shastra)",
    subtitle: "Training Program",
    file: "/certificates/Kaapi Shastra - Training Program on Coffee Roasting Brewing..pdf",
  },
  {
    title: "Certificate of Incorporation of Gajna Overseas",
    subtitle: "MCA Registrar of Companies",
    file: "/certificates/CERTIFICATE-OF-INCORPORATION.pdf",
  },
  {
    title: "PAN — Gajna Overseas",
    subtitle: "Permanent Account Number",
    file: "/certificates/PAN - Gajna Overseas (OPC) Private Limited.pdf",
  },
];

/**
 * Render a clean first-page preview of a PDF without browser toolbar.
 * Automatically fits the page to the card width for better legibility.
 */
function PdfCard({
  cert,
}: {
  cert: { title: string; subtitle: string; file?: string };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(360);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? el.clientWidth;
      // Fit to card width; center canvas so extra space is balanced
      setWidth(Math.floor(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="text-center">
      <div ref={containerRef} className="bg-white rounded-2xl p-2 md:p-2 mb-4 shadow-lg flex justify-center mx-auto max-w-[480px]">
        {cert.file ? (
          <Document
            file={cert.file}
            loading={<div className="w-full max-w-[480px] aspect-[3/4] flex items-center justify-center text-gray-500">Loading preview…</div>}
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mx-auto"
              width={width}
            />
          </Document>
        ) : (
          <div className="relative w-full max-w-[480px] aspect-[3/4] rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-600 text-sm">Not available right now</p>
          </div>
        )}

      </div>
      <h4 className="text-white font-bold text-lg mb-1">{cert.title}</h4>
      <p className="text-white text-sm">{cert.subtitle}</p>
      {cert.file ? (
        <Link
          href={encodeURI(cert.file)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-500"
        >
          View Certificate
        </Link>
      ) : (
        <span className="mt-3 inline-block bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed">
          Not Available
        </span>
      )}
    </div>
  );
}

export default function RegistrationCertification() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  // Removed image viewer state; PDFs will open directly in a new tab.

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

    // Animate content sections
    if (contentRef.current && certificatesRef.current) {
      gsap.set([contentRef.current, certificatesRef.current], {
        y: 30,
        opacity: 0,
      });

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        certificatesRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 ">
      {/* Responsive Registrations & Certificates Layout */}
      <section className="py-8 sm:py-12 lg:py-16 mt-20 sm:mt-32 lg:mt-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout (sm and below) */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {/* Row 1 */}
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/apeda.webp"
                  alt="APEDA Registration"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/9.webp"
                  alt="Registration Certificate"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Row 2 */}
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/ccri.webp"
                  alt="CCRI Certificate"
                  width={80}
                  height={80}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/ECGC.webp"
                  alt="ECGC Registration"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Row 3 */}
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/7.webp"
                  alt="Certificate"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="aspect-square bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/6.webp"
                  alt="Registration Document"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Row 4 - Bottom certificates in a single row */}
              <div className="lg:col-span-2  bg-white border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center gap-6 hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/1.webp"
                  alt="Certificate 1"
                  width={60}
                  height={60}
                  className="w-12 h-12 object-contain"
                />
                <Image
                  src="/registration/4.webp"
                  alt="Certificate 4"
                  width={60}
                  height={60}
                  className="w-12 h-12 object-contain"
                />
                <Image
                  src="/registration/3.webp"
                  alt="Certificate 3"
                  width={60}
                  height={60}
                  className="w-10 h-12 object-contain"
                />
                <div>
                  <Image
                    src="/registration/10.webp"
                    alt="Certificate 2"
                    width={1200}
                    height={100}
                    className="w-[4vw] h-[5vw] object-contain rounded-2xl"
                  />
                  <p className="text-center text-xs text-black">
                    Directorate of Plant Protection, Quarantine & Storage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout (sm to lg) */}
          <div className="hidden sm:block lg:hidden">
            <div className="grid grid-cols-3 gap-4">
              {/* Top Row */}
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/apeda.webp"
                  alt="APEDA Registration"
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/9.webp"
                  alt="Registration Certificate"
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/ccri.webp"
                  alt="CCRI Certificate"
                  width={120}
                  height={120}
                  className="w-18 h-18 object-contain"
                />
              </div>

              {/* Middle Row - Title */}
              <div className="col-span-3 bg-green-700 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center font-serif">
                  Registrations & Certificates
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/ECGC.webp"
                  alt="ECGC Registration"
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/7.webp"
                  alt="Certificate"
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="aspect-[4/3] bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/6.webp"
                  alt="Registration Document"
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* Bottom certificates row */}
              <div className="col-span-3 bg-white border-2 border-gray-300 rounded-lg p-2 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="/registration/1.webp"
                  alt="Certificate 1"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src="/registration/4.webp"
                  alt="Certificate 4"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src="/registration/3.webp"
                  alt="Certificate 3"
                  width={100}
                  height={100}
                  className="w-14 h-16 object-contain"
                />
                <div>
                  <Image
                    src="/registration/10.webp"
                    alt="Certificate 2"
                    width={1200}
                    height={100}
                    className="w-[4vw] h-[5vw] object-contain rounded-2xl"
                  />
                  <p className="text-center text-xs text-black">
                    Directorate of Plant Protection, Quarantine & Storage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg and above) - Original Design Enhanced */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Column 1 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/registration/apeda.webp"
                  alt="APEDA Registration"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
              </div>
              <div className="w-[15vw] h-[30vh] p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/registration/7.webp"
                  alt="Certificate"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="p-6 h-[20vh] w-[20vw] bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Image
                    src="/registration/9.webp"
                    alt="Registration Certificate"
                    width={1200}
                    height={100}
                    className="w-[8vw] h-[8vw] object-contain"
                  />
                </div>
                <div className="p-6 h-[20vh] w-[20vw] bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-center items-center flex-col">
                    <Image
                      src="/registration/10.webp"
                      alt="Certificate 2"
                      width={1200}
                      height={100}
                      className="w-[4vw] h-[5vw] object-contain rounded-2xl"
                    />
                    <p className="text-center text-xs text-black">
                      Directorate of Plant Protection, Quarantine & Storage
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 h-[20vh] w-[40vw] bg-green-700 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl xl:text-6xl leading-tight font-bold text-white text-center font-serif">
                  Registrations & Certificates
                </h1>
              </div>

              <div className="h-[20vh] w-[40vw] bg-white border-2 border-gray-300 rounded-lg flex flex-row justify-center items-center gap-10 hover:shadow-xl transition-all duration-300 hover:scale-105">



                <Image
                  src="/registration/ccri.webp"
                  alt="CCRI Certificate"
                  width={1200}
                  height={100}
                  className="w-[7vw] h-[7vw] object-contain"
                />
                <Image
                  src="/registration/1.webp"
                  alt="Certificate 1"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
                <Image
                  src="/registration/3.webp"
                  alt="Certificate 3"
                  width={1200}
                  height={100}
                  className="w-[6vw] h-[7vw] object-contain"
                />
                <Image
                  src="/registration/4.webp"
                  alt="Certificate 4"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/registration/ECGC.webp"
                  alt="ECGC Registration"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
              </div>
              <div className="w-[15vw] h-[30vh] p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/registration/6.webp"
                  alt="Registration Document"
                  width={1200}
                  height={100}
                  className="w-[8vw] h-[8vw] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16"></div>

        {/* Main Content */}
        <div ref={contentRef} className=" gap-12 mb-16">

          {/* <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl text-center  font-bold text-coffee-brown mb-6">
                <span className="inline-flex items-center gap-2">
                  Our Certifications
                  <Image
                    src="/seedreg.webp"
                    alt="coffeebrown"
                    width={50}
                    height={50}
                  />
                </span>
                <br />
                Reflect Our Commitment
              </h2>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  At Gajna Overseas, quality isn&apos;t just a process — it&apos;s a
                  principle we uphold at every stage of our sourcing and export
                  operations. From sourcing coffee beans at estates practicing
                  Good Agricultural Practices (GAP) to handling, documentation,
                  and dispatch, we follow industry-best protocols with full
                  transparency.
                </p>

                <p>
                  We&apos;re registered with India&apos;s top export promotion bodies and
                  adhere to the regulatory requirements laid out by the Coffee
                  Board of India. These certifications are not just badges —
                  they reflect our promise of doing things the right way, every
                  single time.
                </p>
              </div>
            </div>
          </div> */}

          {/* Right Column - Images */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate1.webp"
                  alt="Certificate 1"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate2.webp"
                  alt="Certificate 2"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate3.webp"
                  alt="Certificate 3"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Certifications Section */}
      <div
        ref={certificatesRef}
        className="bg-coffee-brown  shadow-lg p-8 mt-[-2vw]"
      >


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PDF_CERTIFICATES.map((cert) => (
            <PdfCard key={cert.title} cert={cert} />
          ))}
          {/* React-PDF previews inserted above; legacy image blocks removed */}

          {/* Legacy image block removed */}
          {/* Legacy image block removed */}


          {/* Legacy image block removed */}



          {/* Legacy image block removed */}

          {/* Legacy image block removed */}

          {/* Row 2 */}




        </div>
      </div>
      {/* PDFs open directly; image viewer removed */}
    </section>
  );
}