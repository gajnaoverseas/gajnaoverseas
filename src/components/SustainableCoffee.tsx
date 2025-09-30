"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SustainableCoffee() {
  return (
    <section className="py-28  bg-gradient-to-br from-amber-900 to-amber-800 text-white relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 relative z-10 mt-[-4vw]">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="lg:text-7xl text-4xl font-serif  mb-4  text-amber-100">
            Sustainable Coffee Cultivation in India
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col mb-10">
              <Image
                src="/treeimage.webp"
                alt="Sustainable Coffee Cultivation in India"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg "
                priority
              />

            </div>
            <p className="text-lg leading-relaxed text-black opacity-90 p-4 bg-[#F9C977] rounded-xl overflow-hidden mb-10">
              At Araku Valley, a coffee growing region in the Indian state of Andhra Pradesh,
              coffee cultivation has given new life to once-barren hills.
              Coffee estates have replaced the earlier custom of shifting cultivation,
              which had left these Hills denuded
            </p>

          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="flex flex-col items-start justify-start h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div>
              <p className="text-lg bg-[#F9C977] leading-relaxed mb-20  border border-white p-4 rounded-xl text-black">
                The Coffees of India are grown in a symbiotic relationship with
                their environment. They are grown in natural forests, without
                cutting down shade trees.
                In all Indian coffee estates, our coffees are grown under a
                two-tier mixed shade canopy. Some of these shade trees produce
                fruits and vegetables, which become an additional source of
                income for growers.
              </p>
              <p className="text-lg leading-relaxed  text-white border border-white p-4 rounded-xl mb-20">
                <span className="font-semibold italic block text-center">
                  One of the 25 bio-diversity hot-spots of the world...
                </span>
                <br />
                Coffee estates in India are a natural habitat for birds, insects and animals.
                <br />
                Home to 133 varieties of butterfiles, 121 types of amphibians,
                and 157 species of reptiles, 508 kinds of birds and 120 species of mammals.
                <br />
                <span className="font-semibold italic block text-center">
                  Defining wide range of unique flora and fauna
                </span>
              </p>



              <p className="text-lg leading-relaxed mt-4 text-white border border-white p-4 rounded-xl mb-10">
                In India, the coffee estates also provide a livelihood to economically
                marginalised individuals by offering local tribes a sustainable income.
                The coffee estates also provide healthcare, education and housing for
                workers and their families, making their occupation a holistically
                rewarding one
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
