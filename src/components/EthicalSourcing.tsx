"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
  // Removed popup viewer; PDFs open directly in a new tab.

  // Prefer a PDF link if available; otherwise fall back to the first asset.
  const pickPrimaryCertificateUrl = (assets?: string[]) => {
    if (!assets || assets.length === 0) return undefined;
    const pdf = assets.find((a) => a.toLowerCase().endsWith(".pdf"));
    return pdf ?? assets[0];
  };

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
          <h2 className="main-title text-center text-4xl md:text-6xl font-serif text-coffee-brown mb-20">
            Registrations & Certificates
          </h2>

          <div ref={logosRef} className="mb-2 max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4 ">
                {certificationsData.map((cert, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 px-10 md:basis-1/3 lg:basis-1/5">
                    <div className="flex flex-col items-center">
                      {/* Card Box with equal height */}
                      <div className="logo-item flex flex-col items-center justify-between mx-0 border-2 border-coffee-brown shadow-lg rounded-2xl p-4 h-[295px] w-full">
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
                      {(() => {
                        const url = pickPrimaryCertificateUrl(cert.certificateImages);
                        if (cert.hasViewButton && url) {
                          const isPdf = url.toLowerCase().endsWith(".pdf");
                          return (
                            <Link
                              href={encodeURI(url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="my-5 bg-[#15803D] px-3 py-1 rounded-full text-white text-xs hover:bg-[#4D5A3E] transition-colors duration-300"
                            >
                              {isPdf ? "View Certificate" : "View Details"}
                            </Link>
                          );
                        }
                        return null;
                      })()}

                    </div>

                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 lg:-left-16" />
              <CarouselNext className="-right-4 lg:-right-16" />
            </Carousel>
          </div>

          {/* Removed global CTA. Each card now has its own View Certificate button. */}
        </div>
      </div>

      {/* No popup; each card opens the certificate in a new tab. */}
    </section>
  );
}
