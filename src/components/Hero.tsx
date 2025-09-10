"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import bannerData, { BannerSlide } from "../data/bannerData";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

// Coffee bean icon for the slide indicators
const CoffeeBeanIcon = ({ active }: { active: boolean }) => (
  <div
    className={`w-4 h-4 mx-1 transition-all duration-300 ${
      active ? "opacity-100 scale-110" : "opacity-50"
    }`}
  >
    <BiSolidCoffeeBean className="text-coffee-gold" />
  </div>
);

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Using banner data from the data file
  const slides = bannerData;

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative bg-black text-white overflow-hidden lg:h-[100vh] h-[70vh] z-0 ">
      {/* Background image with transition effect and gradient overlay */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-no-repeat bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-80" : "opacity-0"
          }`}
          style={{
            backgroundImage: isMounted
              ? `url(${isMobile ? slide.mobileBackground : slide.background})`
              : "none",
            backgroundSize: "100% 100%",
          }}
        >

        </div>
      ))}

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 h-full flex flex-col justify-center">
                  {/* Header text with responsive design */}
          <div className="absolute md:top-48 top-28  lg:-right-10 right-12 px-4 lg:px-10">
            <div className="relative flex items-center justify-center">
              {/* Heading pill */}
              <h1 className="lg:text-lg text-xs sm:text-sm font-bold py-2 md:py-3 px-3 lg:px-6 bg-white text-center text-[#61714D] rounded-full whitespace-nowrap">
                Uniqueness of Indian Coffee Bean
              </h1>

              {/* Overlapping Icon - hidden on mobile to prevent overflow */}
              <div className="absolute left-0 -translate-x-6 mt-3 lg:mt-0">
                <Image
                  src="/coffee-bean.webp"
                  alt="beans"
                  width={40}
                  height={40}
                  className="rounded-full bg-[#61714D] p-2 mt-10 ml-3"
                />
              </div>
            </div>
          </div>
        {/* Main content section */}
        <div className="flex flex-col lg:flex-row lg:items-center mt-16 md:mt-0">
          <div className="lg:w-1/2 w-full mb-8 lg:mb-0 px-2 md:px-0">
            {/* Title with enhanced animation */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-left font-serif font-semibold mb-4 md:mb-6 text-white leading-tight">
              <AnimatePresence mode="wait">
                {currentSlideData.title.split("\n").map((line, i) => (
                  <motion.span
                    key={`${currentSlide}-${i}`}
                    className="block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </AnimatePresence>
            </h2>

            {/* Description paragraph with right-to-left animation */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`${currentSlide}-description`}
                className="text-base sm:text-lg md:text-xl text-center lg:text-left text-gray-200 leading-relaxed px-2 md:px-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {currentSlideData.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators with animation */}
        {/* <motion.div 
          className="flex justify-center items-center my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {slides.map((_, index) => (
            <motion.button 
              key={index} 
              onClick={() => goToSlide(index)}
              className="focus:outline-none mx-1"
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <CoffeeBeanIcon active={index === currentSlide} />
            </motion.button>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
