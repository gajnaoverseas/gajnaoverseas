import Image from "next/image";
import React from "react";

// India Map SVG Component with highlighted coffee regions

export default function CoffeeRegions() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden border-t-2 border-white">
      {/* Decorative coffee bean - Top Left */}
      <Image
        src="/coffee-beans/Coffee Bean unroasted Image.png"
        alt=""
        width={240}
        height={120}
        className="hidden md:block absolute -left-24 top-8 opacity-40 rotate-12"
      />

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-white text-3xl md:text-5xl lg:text-6xl font-serif font-semibold mb-12">
          Diverse Coffee Growing Regions of India
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Left: India Map */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[6/7]">
              <Image src="/svg/Map.svg" alt="" width={500} height={500} />
            </div>
          </div>

          {/* Right: Content Card */}
          <div className="relative">
            <div className="rounded-xl bg-gradient-to-br from-[#853B0E] to-[#EEBA6C] border-[#EEBA6C] border-[1px] p-6 md:p-8 shadow-xl backdrop-blur-sm lg:h-auto lg:w-[480px]">
              <p className="text-sm md:text-base lg:text-lg text-white font-medium leading-relaxed mb-4">
                Coffee growing regions of India can be grouped under three distinct categories:
              </p>
              <ul className="space-y-4 text-sm md:text-base lg:text-lg text-white font-medium list-disc list-outside pl-5 leading-relaxed">
                <li>
                  Traditional areas representing the southern states of Karnataka, Kerala and Tamil Nadu
                </li>
                <li>
                  Non- Traditional areas comprising Andhra Pradesh and Orrisa in the Eastern Ghats of the country
                </li>
                <li>
                  The North Eastern region comprising of the &apos;Seven Sisters&apos; states of Assam, Manipur, Meghalaya, Mizoram, Tripura, Nagaland and Arunachal Pradesh
                </li>
              </ul>
            </div>

            {/* Decorative coffee bean near bottom of card */}
            <div className="hidden lg:block absolute -bottom-32 -translate-x-20">
              <Image
                src="/coffee-beans/Coffee Bean unroasted Image.png"
                alt="Coffee bean"
                width={250}
                height={250}
                className=" -rotate-[6deg]"
              />
            </div>
          </div>
        </div>

        {/* Bottom bullet points */}
        <div className="mt-16 max-w-6xl mx-auto">
          <ul className="space-y-3 text-sm md:text-xl  text-white font-medium list-disc list-outside pl-5 leading-relaxed">
            <li>
              Coffee in India is grown in different geographical regions under varying degrees of altitude and rainfall.
            </li>
            <li>
              These differences bring subtle but exciting variations to the flavor of Indian coffee.
            </li>
            <li>
              13 regional coffees and 3 speciality coffees each one unique and distinct but all deliciously Indian.
            </li>
            <li>
              Coffees of India are very well known for the micro-lots and estate branded coffees.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
