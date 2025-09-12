"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import certificationsData from "../data/certificationsData";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function EthicalSourcing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    name: string;
    images: string[];
  } | null>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Get all text and logo elements
    const textElements = sectionRef.current?.querySelectorAll(".fade-in-text");
    const logos = logosRef.current?.querySelectorAll(".logo-item");
    const button = sectionRef.current?.querySelector(".certificates-button");

    if (textElements && logos && button) {
      // Set initial state for all elements
      gsap.set(textElements, { y: 20, opacity: 0 });
      gsap.set(logos, { y: 30, opacity: 0 });
      gsap.set(button, { y: 20, opacity: 0 });

      // Add animations to the timeline
      tl.to(
        textElements,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        0
      )
        .to(
          logos,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          0.4
        )
        .to(
          button,
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0.8
        );
    }

    // Clean up the animation when the component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className=" relative z-10 py-16">
      {/* Ethical Sourcing Strip */}
      {/* <div className="max-w-7xl mx-auto px-4 py-16  ">
        
        <div className="">
          
          <h2 className="text-5xl font-serif font-semibold mb-6 text-coffee-brown text-center fade-in-text">
            Ethical Sourcing Strip
          </h2>
          <p className="text-[#61714D] lg:text-2xl text-lg italic  max-w-4xl mx-auto text-left fade-in-text">
            We prioritize responsible sourcing by partnering only with growers
            who practice sustainable agriculture and uphold ethical labor
            standards — protecting biodiversity, soil health, and the well-being
            of farming communities
          </p>
        </div>
      </div> */}

      {/* Registrations & Certifications */}
      <div className="bg-white border-t-2 border-coffee-brown pt-6">
        <div className="max-w-7xl mx-auto px-4 py-8">
         <h2 className="main-title text-center text-4xl md:text-6xl font-serif text-[#562F23] mb-20">
            Registrations & Certifications
          </h2>

          <div ref={logosRef} className="mb-2 max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4 ">
                {certificationsData.map((cert, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 px-10 md:basis-1/3 lg:basis-1/5">
                    <div className="flex flex-col items-center">
                      {/* Card Box with equal height */}
                      <div className="logo-item flex flex-col items-center justify-between mx-0 border-2 border-coffee-brown shadow-lg rounded-2xl p-4 h-60 w-full">
                        <div className="w-32 h-32 relative mb-4">
                          <Image
                            src={cert.logo}
                            alt={cert.alt}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-center text-sm text-black font-bold line-clamp-3">
                          {cert.title}
                        </h3>
                        <p className="text-center text-xs text-black max-w-72 mb-3 line-clamp-3">
                          {cert.desc}
                        </p>
                      </div>

                      {/* View Certificate Button (outside border box) */}
                      {cert.hasViewButton &&
                        cert.certificateImages &&
                        cert.certificateImages.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCertificate({
                               name: cert.name,
                               images: cert.certificateImages!,
                             });
                            }}
                            className="my-5 bg-[#434d35] p-1 rounded-lg text-white text-xs transition-colors duration-300 underline cursor-pointer"
                            type="button"
                          >
                            View Certificate
                            {cert.certificateImages.length > 1 ? "s" : ""}
                          </button>
                        )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 lg:-left-12" />
              <CarouselNext className="-right-2 lg:-right-12 " />
            </Carousel>
          </div>

          {/* <div className="text-center">
            <Link href="/certifications" className="certificates-button hover:shadow-xl bg-[#61714D] text-white px-8 py-3 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300">
              Click to view certificates
            </Link>
          </div> */}
        </div>
      </div>

      {/* Certificate Modal - Simple Image Viewer */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCertificate.name} Certificate
                {selectedCertificate.images.length > 1 ? "s" : ""}
              </h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded transition-colors"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div className="p-6">
              <div className="relative w-full h-[60vh] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={selectedCertificate.images[0]}
                  alt={`${selectedCertificate.name} Certificate`}
                  fill
                  className="object-contain p-4"
                  onError={() => {
                    console.log("Image failed to load:", selectedCertificate.images[0]);
                  }}
                />
              </div>
              
              {/* Image Counter */}
              {selectedCertificate.images.length > 1 && (
                <div className="text-center mt-4 text-sm text-gray-600">
                  {selectedCertificate.images.length} certificate{selectedCertificate.images.length > 1 ? 's' : ''} available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
