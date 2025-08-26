"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import certificationsData from "../data/certificationsData";
import Link from "next/link";

export default function EthicalSourcing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

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
            className="flex flex-wrap justify-center items-center gap-8 mb-10"
          >
            {certificationsData.map((cert, index) => (
              <div key={index} className="logo-item flex flex-col items-center mx-4">
                <div className="w-40 h-40 relative mb-4">
                  <Image
                    src={cert.logo}
                    alt={cert.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-xs text-black max-w-72">{cert.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/certifications" className="certificates-button hover:shadow-xl bg-[#61714D] text-white px-8 py-3 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300">
              Click to view certificates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
