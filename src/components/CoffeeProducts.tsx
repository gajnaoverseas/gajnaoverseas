"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { motion } from "framer-motion";

export default function CoffeeProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arabicaRef = useRef<HTMLDivElement>(null);
  const robustaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Make sure elements are visible first
    if (arabicaRef.current) arabicaRef.current.style.visibility = "visible";
    if (robustaRef.current) robustaRef.current.style.visibility = "visible";

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Get the card and image elements to animate (not the CTA buttons)
    const arabicaCard = arabicaRef.current?.querySelector(".overflow-hidden");
    const robustaCard = robustaRef.current?.querySelector(".overflow-hidden");

    // Add animations to the timeline
    tl.fromTo(
      [arabicaCard, robustaCard],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" }
    );

    // Clean up the animation when the component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <section ref={sectionRef} className="py-16 pb-24 bg-white relative z-10 border border-coffee-brown">
      <Image
        src="/blog-bg.webp"
        alt="Knowledge Hub Background"
        fill
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="main-title text-4xl md:text-6xl font-serif text-[#562F23] mb-8">
            Explore Our Coffees
          </h2>
          <p className="text-black text-xl font-semibold mt-[3vw] mb-[-3vw]">Our 2 core offerings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Arabica Coffee */}
          <div
            ref={arabicaRef}
            className="flex flex-col items-center h-full"
            style={{ visibility: "visible", opacity: 1 }}
          >
            <div
              className="overflow-hidden group w-full max-w-sm cursor-pointer flex-1 flex flex-col"
            >
              <div className="relative flex flex-col items-center h-full">
                {/* Coffee bean image */}
                <div
                  className="relative z-20 mt-6 flex-shrink-0 h-[200px] flex items-center justify-center"
                >
                  <Image
                    src="/coffee-beans/arabica.webp"
                    alt="Arabica Coffee"
                    width={270}
                    height={200}
                    className="mb-4"
                  />
                </div>

                {/* Card with content */}
                <div
                  className="bg-[#7D4B3C] text-white px-6 py-4 rounded-2xl w-full shadow-lg mt-[-80px] relative overflow-hidden min-h-[280px]"
                >
                  <div className="text-center pt-12 h-full flex flex-col justify-start">
                    {/* Title */}
                    <h3
                      className="text-3xl font-serif my-4"
                    >
                      Arabica
                    </h3>
                    <p className="text-base mb-3 px-2 leading-relaxed text-left">
                      • Slightly larger than Robusta<br/>
                      • Elliptical-shaped beans<br/>
                      • Grown at higher altitudes<br/>
                      • Higher acidity compared to Robusta<br/>
                      • Distinctive S-shaped cut in the center<br/>
                      • Known for elegant, fruity aroma
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 relative z-30">
              <Link
                href="/arabica"
                className="inline-block py-3 px-6 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300 text-sm cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Explore Indian Arabica Grades
              </Link>
            </div>
          </div>

          {/* Robusta Coffee */}
          <div
            ref={robustaRef}
            className="flex flex-col items-center h-full"
            style={{ visibility: "visible", opacity: 1 }}
          >
            <div
              className="overflow-hidden group w-full max-w-sm cursor-pointer flex-1 flex flex-col"
            >
              <div className="relative flex flex-col items-center h-full">
                {/* Coffee bean image */}
                <div
                  className="relative z-20 mt-6 flex-shrink-0 h-[200px] flex items-center justify-center"
                >
                  <Image
                    src="/coffee-beans/Robusta.webp"
                    alt="Robusta Coffee"
                    width={270}
                    height={200}
                    className="mb-4"
                  />
                </div>

                {/* Card with content */}
                <div
                  className="bg-[#7D4B3C] text-white px-6 py-4 rounded-2xl w-full shadow-lg mt-[-80px] relative overflow-hidden min-h-[280px]"
                >
                  <div className="text-center pt-12 h-full flex flex-col justify-start">
                    {/* Title */}
                    <h3
                      className="text-3xl font-serif my-4"
                    >
                      Robusta
                    </h3>

                    {/* Description */}
                    <p
                      className="text-base mb-3 px-2 leading-relaxed text-left"
                    >
                      • Slightly smaller than Arabica<br/>
                      • Rounder-shaped beans<br/>
                      • Grown at lower altitudes<br/>
                      • Higher caffeine content than Arabica<br/>
                      • Features a straight cut in the center<br/>
                      • Earthy, slightly bitter flavor profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 relative z-30">
              <Link
                href="/robusta"
                className="inline-block py-3 px-6 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300 text-sm cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Explore Indian  Robusta Grades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
