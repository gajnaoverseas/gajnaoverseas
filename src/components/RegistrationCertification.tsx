"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
      <div className="relative bg-[url('/banners/bgreg.webp')] bg-cover bg-center h-[50vh] w-full text-white px-8 pt-[7vw] flex flex-col items-center justify-start">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl  font-bold mb-4">
            Registrations & Certifications
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Certified to Export. Committed to Standards.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16"></div>

        {/* Main Content */}
        <div ref={contentRef} className=" gap-12 mb-16">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
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
          </div>

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
        className="bg-coffee-brown  shadow-lg p-8"
      >
        <div className="text-center py-10">
          <h3 className="text-4xl  font-bold text-white mb-4">
            Registrations & Quality Assurance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          {/* Coffee Board of India - Certificate 1 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate1.webp"
                alt="Coffee Board Certificate 1"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">
              Coffee Board of India
            </h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>

                    {/* Coffee Board of India - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate4.webp"
                alt="Coffee Board Certificate 2"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">
              Coffee Board of India
            </h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>
                    {/* APEDA - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate5.webp"
                alt="APEDA Certificate 2"
                width={280}
                height={320}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">APEDA</h4>
            <p className="text-white text-sm">
              Agricultural & Processed Food Products Export Development
              Authority
            </p>
          </div>

          
          {/* TPCI - Certificate 4 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate6.webp"
                alt="TPCI Certificate 2"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">TPCI</h4>
            <p className="text-white text-sm">
              Trade Promotion Council of India
            </p>
          </div>

          {/* APEDA - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate2.webp"
                alt="APEDA Certificate"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">APEDA</h4>
            <p className="text-white text-sm">
              Agricultural & Processed Food Products Export Development
              Authority
            </p>
          </div>

          {/* TPCI - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate3.webp"
                alt="TPCI Certificate"
                width={280}
                height={300}
                className="w-full h-[300px] object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">TPCI</h4>
            <p className="text-white text-sm">
              Trade Promotion Council of India
            </p>
          </div>

          {/* Row 2 */}




        </div>
      </div>
    </section>
  );
}
