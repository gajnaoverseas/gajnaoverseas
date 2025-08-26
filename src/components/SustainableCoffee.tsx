"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SustainableCoffee() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic data for sustainable coffee practices
  const sustainabilityData = [
    {
      id: 1,
      title: "Sustainable Coffee Cultivation in India",
      subtitle: "",
      description: "The Coffees of India are grown in a symbiotic relationship with their environment. They are grown in natural forests, without cutting down shade trees.",
      details: "In all Indian coffee estates, our coffees are grown under a two-tier mixed shade canopy. Some of these shade trees produce fruits and vegetables, which become an additional source of income for growers. Coffee estates in our country are a natural habitat for birds, insects and animals.",
      image: "/treeimage.webp"
    },
    {
      id: 2,
      title: "Biodiversity Conservation",
      subtitle: "",
      description: "At Araku Valley, a region in the Indian state of Andhra Pradesh, coffee cultivation has given new life to once-barren hills. Coffee estates have replaced the earlier custom of shifting cultivation, which had left these Hills denuded.In India, the coffee estates also provide a livelihood to economically marginalised individuals by offering local tribes a sustainable income. The coffee estates also provide healthcare, education and housing for workers and their families, making their occupation a holistically rewarding one.",
      details: "Coffee estates act as corridors connecting fragmented forests, allowing wildlife movement and genetic exchange. The shade canopy provides nesting sites for migratory birds and supports endemic species unique to the Western Ghats.",
      image: "/treeimage.webp"
    },
    
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sustainabilityData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sustainabilityData.length) % sustainabilityData.length);
  };

  const currentData = sustainabilityData[currentSlide];

  return (
    <section className="py-16 bg-gradient-to-br from-amber-900 to-amber-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/coffee-plants.svg')] bg-repeat bg-opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-serif font-semibold mb-4 text-amber-100">
           Sustainable Coffee Cultivation in India
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div 
            className="relative"
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <Image
                src={currentData.image}
                alt={currentData.subtitle}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-6"
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-serif font-semibold mb-4 text-amber-200">
                {currentData.subtitle}
              </h3>
              <p className="text-xl leading-relaxed mb-6 text-amber-100">
                {currentData.description}
              </p>
              <p className="text-lg leading-relaxed text-amber-50 opacity-90">
                {currentData.details}
              </p>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2 mt-8">
              {sustainabilityData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-amber-200 scale-125' 
                      : 'bg-amber-400 opacity-50 hover:opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center mt-12 space-x-8">
          <motion.button
            onClick={prevSlide}
            className="p-3 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <div className="text-amber-200 font-medium">
            {currentSlide + 1} / {sustainabilityData.length}
          </div>

          <motion.button
            onClick={nextSlide}
            className="p-3 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}