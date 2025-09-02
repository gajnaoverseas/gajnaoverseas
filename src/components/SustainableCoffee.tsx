"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SustainableCoffee() {
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
        ></motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <Image
                src="/treeimage.webp"
                alt="Sustainable Coffee Cultivation in India"
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <h2 className="text-6xl font-serif font-semibold mb-4 text-amber-100">
                Sustainable Coffee Cultivation in India
              </h2>
              <p className="text-lg leading-relaxed my-4 text-white">
                The Coffees of India are grown in a symbiotic relationship with
                their environment. They are grown in natural forests, without
                cutting down shade trees
              </p>
              <p className="text-lg leading-relaxed text-black opacity-90 p-4 bg-[#F9C977] ml-[-6vw] rounded-xl">
                In all Indian coffee estates, our coffees are grown under a
                two-tier mixed shade canopy. Some of these shade trees produce
                fruits and vegetables, which become an additional source of
                income for growers. Coffee estates in our country are a natural
                habitat for birds, insects and animals. 
              </p>
              <p className="text-lg leading-relaxed my-4 text-white">
                At Araku Valley, a region in the Indian state of Andhra Pradesh,
                coffee cultivation has given new life to once-barren hills.
                Coffee estates have replaced the earlier custom of shifting
                cultivation, which had left these Hills denuded
              </p>
              <p className="text-lg leading-relaxed text-black opacity-90 p-4 bg-[#F9C977] ml-[-6vw] rounded-xl">
                In India, the coffee estates also provide a livelihood to
                economically marginalised individuals by offering local tribes a
                sustainable income. The coffee estates also provide healthcare,
                education and housing for workers and their families, making
                their occupation a holistically rewarding one
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
