import Image from "next/image";
import React from "react";

// India Map SVG Component with highlighted coffee regions

export default function CoffeeRegions() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden border-t-2 border-white">
      {/* Decorative coffee bean - Top Left */}
      <Image
        src="/coffee-bean.webp"
        alt=""
        width={120}
        height={120}
        className="hidden md:block absolute -left-10 top-8 opacity-80 -rotate-12"
      />

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-white text-3xl md:text-5xl lg:text-6xl font-serif font-semibold mb-12">
          Coffee Growing Regions of India
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
            {/* Decorative coffee bean near card - positioned on the left side */}
            {/* <Image
              src="/coffee-bean.webp"
              alt=""
              width={80}
              height={80}
              className="hidden lg:block absolute -left-20 top-1/4 opacity-70 rotate-45"
            /> */}

            <div className="rounded-xl bg-gradient-to-br from-[#853B0E] to-[#EEBA6C] border-[#EEBA6C] border-[1px] p-6 md:p-8 shadow-xl backdrop-blur-sm lg:h-[450px] lg:w-[480px]">
              <ul className="space-y-5 text-sm md:text-base lg:text-lg text-white font-medium list-disc list-outside pl-5 leading-relaxed">
                <li>
                  Coffee in India is grown in different geographical regions under varying
                  degrees of altitude and rainfall.
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

              {/* Coffee bean inside card */}
              {/* <div className="flex justify-end mt-6">
                <Image
                  src="/logobean.webp"
                  alt="Coffee bean"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div> */}
            </div>

            {/* Decorative coffee bean near card - positioned on the right side */}
            {/* <Image
              src="/coffee-bean.webp"
              alt=""
              width={90}
              height={90}
              className="hidden lg:block absolute -right-16 bottom-1/4 opacity-70 -rotate-30"
            /> */}
          </div>
        </div>
      </div>

      {/* Decorative coffee beans - Bottom corners */}
      {/* <Image
        src="/coffee-bean.webp"
        alt=""
        width={100}
        height={100}
        className="hidden md:block absolute left-8 bottom-10 opacity-60 rotate-45"
      /> */}
      <Image
        src="/coffee-beans/green.png"
        alt=""
        width={140}
        height={140}
        className="hidden md:block absolute right-[720px] bottom-28  rotate-[12deg]"
      />
    </section>
  );
}
