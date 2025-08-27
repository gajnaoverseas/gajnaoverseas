"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

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
    <section ref={sectionRef} className="py-16 bg-white relative z-10">
      <Image
        src="/blog-bg.webp"
        alt="Knowledge Hub Background"
        fill
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-semibold mb-2 text-[#562F23]">
            Explore Our Coffees
          </h2>
          <p className="text-black">Our 2 core offerings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Arabica Coffee */}
          <div
            ref={arabicaRef}
            className="flex flex-col items-center h-full"
            style={{ visibility: "visible", opacity: 1 }}
          >
            <motion.div
              className="overflow-hidden group w-full max-w-sm cursor-pointer flex-1 flex flex-col"
              whileHover="hover"
              initial="initial"
            >
              <div className="relative flex flex-col items-center h-full">
                {/* Coffee bean image */}
                <motion.div
                  className="relative z-20 mt-6 flex-shrink-0"
                  variants={{
                    initial: { y: 0, scale: 1 },
                    hover: { y: -20, scale: 1.1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src="/coffee-beans/arabica.webp"
                    alt="Arabica Coffee"
                    width={200}
                    height={200}
                    className="mb-4"
                  />
                </motion.div>

                {/* Card with content */}
                <motion.div
                  className="bg-[#7D4B3C] text-white px-6 py-4 rounded-2xl w-full shadow-lg mt-[-80px] relative overflow-hidden"
                  variants={{
                    initial: { height: "200px" },
                    hover: { height: "340px" },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="text-center pt-12 h-full flex flex-col justify-start">
                    {/* Title */}
                    <motion.h3
                      className="text-3xl font-serif mb-3"
                      variants={{
                        initial: { y: 0 },
                        hover: { y: -10 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      Arabica
                    </motion.h3>

                    {/* Description - hidden initially, visible on hover */}
                    <motion.p
                      className="text-base mb-3 px-2 leading-relaxed"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                    >
                      Slightly smaller than Arabica Rounder Shape Grows at lower
                      altitudes Higher caffeine content than Arabica Has a
                      straight cut in the middle Earthy and slightly bitter
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <div className="text-center mt-6">
              <Link
                href="/coffee/arabica"
                className="inline-block py-3 px-6 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300 text-sm"
              >
                Explore Indian Grade Arabica
              </Link>
            </div>
          </div>

          {/* Robusta Coffee */}
          <div
            ref={arabicaRef}
            className="flex flex-col items-center h-full"
            style={{ visibility: "visible", opacity: 1 }}
          >
            <motion.div
              className="overflow-hidden group w-full max-w-sm cursor-pointer flex-1 flex flex-col"
              whileHover="hover"
              initial="initial"
            >
              <div className="relative flex flex-col items-center h-full">
                {/* Coffee bean image */}
                <motion.div
                  className="relative z-20 mt-6 flex-shrink-0"
                  variants={{
                    initial: { y: 0, scale: 1 },
                    hover: { y: -20, scale: 1.1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src="/coffee-beans/Robusta.webp"
                    alt="Arabica Coffee"
                    width={225}
                    height={200}
                    className="mb-4"
                  />
                </motion.div>

                {/* Card with content */}
                <motion.div
                  className="bg-[#7D4B3C] text-white px-6 py-4 rounded-2xl w-full shadow-lg mt-[-80px] relative overflow-hidden"
                  variants={{
                    initial: { height: "200px" },
                    hover: { height: "300px" },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="text-center pt-12  flex flex-col justify-start">
                    {/* Title */}
                    <motion.h3
                      className="text-3xl font-serif mb-3"
                      variants={{
                        initial: { y: 0 },
                        hover: { y: -10 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      Robusta
                    </motion.h3>

                    {/* Description - hidden initially, visible on hover */}
                    <motion.p
                      className="text-base mb-3 px-2 leading-relaxed"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.1,
                      }}
                    >
                      Slightly Larger than Robusta Elliptical Shape Grows at
                      higher altitudes Higher acidity than Robusta Has an
                      S-shaped cut in the middle 
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <div className="text-center mt-6">
              <Link
                href="/coffee/robusta"
                className="inline-block py-3 px-6 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300 text-sm"
              >
                Explore Indian Grade Arabica
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
