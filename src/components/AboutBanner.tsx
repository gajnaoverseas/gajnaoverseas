"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Smartphone, Video, Target, Sprout, Truck, Heart, Users, User, Eye, ClipboardCheck } from "lucide-react";
import CertificateViewer from "./CertificateViewer";

export default function AboutBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerTitle, setViewerTitle] = useState<string>("");

  const openViewer = (images: string[], title: string) => {
    setViewerImages(images);
    setViewerTitle(title);
    setViewerOpen(true);
  };

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
      {/* Responsive Registration & Certification Layout */}
      <section className="pt-8 sm:pt-12 lg:pt-16 pb-2 sm:pb-2 lg:pb-16 mt-20 sm:mt-32 lg:mt-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout (sm and below) */}
          <div className="block sm:hidden mt-12">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Row */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col text-center items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <Target className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Company Mission</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <Sprout className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Sourcing Expert</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <Truck className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Logistics Expert</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <ClipboardCheck className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Documentation Expert</h3>
              </div>

              {/* Middle Row - Title */}
              <div className="col-span-2 bg-green-700 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center font-serif">
                  About Us
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <Heart className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Company Values</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-2 h-36">
                <Users className="w-10 h-10 text-coffee-brown" />
                <h3 className="text-sm font-semibold text-coffee-brown">Meet The Team</h3>
              </div>

              {/* Bottom certificates row (hidden until assets are used) */}
              {/* <div className="col-span-2 bg-white border-2 border-gray-300 rounded-lg p-2 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
                ...images here when available...
              </div> */}
            </div>
          </div>

          {/* Tablet Layout (sm to lg) */}
          <div className="hidden sm:block lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Row */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col text-center items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <Target className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Company Mission</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <Sprout className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Sourcing Expert</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <Truck className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Logistics Expert</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <ClipboardCheck className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Documentation Expert</h3>
              </div>

              {/* Middle Row - Title */}
              <div className="col-span-2 bg-green-700 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center font-serif">
                  About Us
                </h1>
              </div>

              {/* Bottom Row */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <Heart className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Company Values</h3>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 gap-3 h-40">
                <Users className="w-12 h-12 text-coffee-brown" />
                <h3 className="text-base font-semibold text-coffee-brown">Meet The Team</h3>
              </div>

              {/* Bottom certificates row (hidden until assets are used) */}
              {/* <div className="col-span-2 bg-white border-2 border-gray-300 rounded-lg p-2 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">
                ...images here when available...
              </div> */}
            </div>
          </div>

          {/* Desktop Layout (lg and above) - Original Design Enhanced */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Column 1 */}
            <div className="flex flex-col gap-0">
              <div className="w-[15vw] h-[30vh] p-6 text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-4">
                <Target className="w-16 h-16 text-coffee-brown" />
                <h3 className="text-lg">Company Mission</h3>
              </div>
              <div className="w-[15vw] h-[30vh] p-6 text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-4">
                <Eye className="w-16 h-16 text-coffee-brown" />
                <h3 className="text-lg">Company Vision</h3>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-0">
              <div className="flex flex-row gap-0">
                <div className="p-6 h-[20vh] w-[20vw] text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-3">
                  <Sprout className="w-12 h-12 text-coffee-brown" />
                  <h3 className="text-lg text-center">Sourcing Expert</h3>
                </div>
                <div className="p-6 h-[20vh] w-[20vw] text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-3">
                  <Truck className="w-12 h-12 text-coffee-brown" />
                  <h3 className="text-lg text-center">Logistics Expert</h3>
                </div>
              </div>

              <div className="p-6 h-[20vh] w-[40vw] + 16px bg-green-700 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl xl:text-6xl leading-tight font-bold text-white text-center font-serif">
                  About Us
                </h1>
              </div>

              <div className="h-[20vh] w-[40vw] + 16px text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-row justify-center items-center gap-10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center gap-2">
                  <Users className="w-12 h-12 text-coffee-brown" />
                  <h3 className="text-lg">Meet The Team</h3>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-0">
              <div className="w-[15vw] h-[30vh] p-6 text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-4">
                <ClipboardCheck className="w-16 h-16 text-coffee-brown" />
                <h3 className="text-lg text-center">Documentation Expert</h3>
              </div>
              <div className="w-[15vw] h-[30vh] p-6 text-coffee-brown font-bold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105 gap-4">
                <Heart className="w-16 h-16 text-coffee-brown" />
                <h3 className="text-lg">Company Values</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section (hidden on mobile to remove extra spacing) */}
        <div className="hidden sm:block text-center mb-16"></div>

        {/* Main Content */}
        <div ref={contentRef} className=" gap-12 sm:mb-16 mb-4">

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

    </section>
  );
}
