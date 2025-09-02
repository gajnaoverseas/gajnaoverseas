"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import certificationsData from "../data/certificationsData";
import Link from "next/link";

export default function EthicalSourcing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    name: string;
    images: string[];
    currentIndex: number;
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
    <section ref={sectionRef} className=" relative z-10">
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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-5xl font-serif font-semibold mb-10 text-coffee-brown text-center fade-in-text">
            Registrations & Certifications
          </h2>

          <div
            ref={logosRef}
            className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10 max-w-6xl mx-auto"
          >
            {certificationsData.map((cert, index) => (
              <div key={index} className="flex flex-col items-center">
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
                          currentIndex: 0,
                        });
                      }}
                      className="my-5 bg-transparent  text-coffee-brown text-xs transition-colors duration-300 underline cursor-pointer"
                      type="button"
                    >
                      View Certificate
                      {cert.certificateImages.length > 1 ? "s" : ""}
                    </button>
                  )}
              </div>
            ))}
          </div>

          {/* <div className="text-center">
            <Link href="/certifications" className="certificates-button hover:shadow-xl bg-[#61714D] text-white px-8 py-3 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300">
              Click to view certificates
            </Link>
          </div> */}
        </div>
      </div>

      {/* Certificate Modal with Carousel */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-2"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-lg max-h-[50vh] w-full flex items-center  mt-36"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Image Container */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl flex-1 mr-4">
              <div className="relative w-full h-[70vh]">
                <Image
                  src={
                    selectedCertificate.images[selectedCertificate.currentIndex]
                  }
                  alt={`${selectedCertificate.name} Certificate ${
                    selectedCertificate.currentIndex + 1
                  }`}
                  fill
                  className="object-contain p-4"
                  onError={() => {
                    console.log(
                      "Image failed to load:",
                      selectedCertificate.images[
                        selectedCertificate.currentIndex
                      ]
                    );
                  }}
                />

                {/* Navigation Arrows */}
                {selectedCertificate.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={() =>
                        setSelectedCertificate((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentIndex:
                                  prev.currentIndex > 0
                                    ? prev.currentIndex - 1
                                    : prev.images.length - 1,
                              }
                            : null
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      type="button"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setSelectedCertificate((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentIndex:
                                  prev.currentIndex < prev.images.length - 1
                                    ? prev.currentIndex + 1
                                    : 0,
                              }
                            : null
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                      type="button"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Dots Indicator */}
              {selectedCertificate.images.length > 1 && (
                <div className="flex justify-center space-x-2 p-4 bg-gray-5 mt-[-2vw]">
                  {selectedCertificate.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedCertificate((prev) =>
                          prev
                            ? {
                                ...prev,
                                currentIndex: index,
                              }
                            : null
                        )
                      }
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === selectedCertificate.currentIndex
                          ? "bg-coffee-brown"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      type="button"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Close Button - Right Side */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 ml-4"
              type="button"
            >
              <svg
                className="w-6 h-6"
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
        </div>
      )}
    </section>
  );
}
