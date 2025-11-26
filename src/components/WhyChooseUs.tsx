"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    // Get all elements to animate
    const title = sectionRef.current?.querySelector(".main-title");
    const quote = sectionRef.current?.querySelector(".quote-text");
    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    const lines = sectionRef.current?.querySelectorAll(".connecting-line");

    if (title && quote && cards && lines) {
      // Set initial state
      gsap.set(title, { y: -30, opacity: 0 });
      gsap.set(quote, { y: 30, opacity: 0 });
      gsap.set(cards, { y: 50, opacity: 0 });
      gsap.set(lines, { scaleX: 0, opacity: 0 });

      // Add animations to the timeline
      tl.to(title, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0)
        .to(quote, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.2)
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          0.4
        )
        .to(
          lines,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.8
        );
    }

    // Clean up
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const features = [
    {
      title: "Coffee Sourcing\nwith Origin Access",
      subtitle: "Deep-rooted relationships.\nDirect from the source",
      description:
        "We collaborate closely with Coffee Estate Owners, FPOs, and Coffee Curing Works across India's diverse Coffee growing regions.",
      icon: "/why-choose-us/sourcing-icon.png",
    },
    {
      title: "Intelligent Packaging That\nPreserves Quality",
      subtitle: "We have a deep understanding\nof coffee-packaging",
      description:
        "Our packaging solutions are designed with deep category knowledge — moisture-safe liners and eco-conscious options and  formats that safeguard bean integrity and aroma across long hauls.",
      icon: "/why-choose-us/packaging-icon.png",
    },
    {
      title: "Seamless Coffee\nExports, End-to-End",
      subtitle: "We're expert in logistics and\nCoffee Export documentation",
      description:
        "We streamline the entire export journey, managing logistics, documentation, and compliance with expertise. Gajna Overseas ensures your green beans reach you hassle-free.",
      icon: "/why-choose-us/export-icon.png",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16  relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="main-title text-4xl md:text-6xl font-serif text-[#562F23] mb-8">
            Why Choose Gajna Overseas?
          </h2>
        </div>

        {/* Quote Icons */}
        {/* <div className="relative mb-12">
          <div className="absolute left-8 md:left-16 -top-16 w-12 h-12 md:w-16 md:h-16 ">
            <Image
              src="/l-quotes.webp"
              alt="Quote Icon"
              width={120}
              height={124}
            />
          </div>
          <div className="absolute right-8 md:right-96 md:-bottom-36 -bottom-60 w-12 h-12 md:w-16 md:h-16 ">
            <Image
              src="/r-quotes.webp"
              alt="Quote Icon"
              width={124}
              height={124}
            />
          </div>
        </div> */}

        {/* Quote Text */}
        <div className="text-center mb-10">
          <p className=" text-lg md:text-xl mt-[-3vw] pb-4 text-black max-w-5xl mx-auto leading-relaxed font-serif italic font-semibold">
            By choosing Gajna Overseas, you choose an expert in:
          </p>
          <p className="quote-text text-lg md:text-xl text-black max-w-7xl mx-auto leading-relaxed font-serif italic flex flex-wrap gap-10 justify-center">
            <span className="px-2 rounded-full">
              <span className="w-20 h-20 rounded-full text-2xl text-coffee-white inline-block bg-cover bg-center bg-no-repeat relative bg-[url('/coffee-beans/tri.webp')]">
                <p className="mt-[20px] ml-5 font-bold text-[#445138] text-center">1</p>
              </span>
              <span className="mr-10 align-middle">Coffee Sourcing</span>
            </span>

            <span className="px-2 rounded-full">
              <span className="w-20 h-20 rounded-full text-2xl text-coffee-white inline-block bg-cover bg-center bg-no-repeat relative bg-[url('/coffee-beans/tri.webp')]">
                <p className="mt-[20px] ml-5 font-bold text-[#445138] text-center">2</p>
              </span>
              <span className="mr-10 align-middle">Coffee Packaging</span>
            </span>

            <span className="px-2 rounded-full">
              <span className="w-20 h-20 rounded-full text-2xl text-coffee-white inline-block bg-cover bg-center bg-no-repeat relative bg-[url('/coffee-beans/tri.webp')]">
                <p className="mt-[20px] ml-5 font-bold text-[#445138] text-center">3</p>
              </span>
              <span className="mr-10 align-middle">Coffee Logistics</span>
            </span>

            <span className="px-2 rounded-full mt-[-2vw]">
              <span className="w-20 h-20 rounded-full text-2xl text-coffee-white inline-block bg-cover bg-center bg-no-repeat relative bg-[url('/coffee-beans/tri.webp')]">
                <p className="mt-[20px] ml-5 font-bold text-[#445138] text-center">4</p>
              </span>
              <span className="mr-10 align-middle text-center">Documentation of Green Coffee Export</span>
            </span> 
          </p>


        </div>

        {/* Features Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto relative items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card text-center relative z-10 shadow-lg px-6 py-4 rounded-2xl border-coffee-brown border-[1px]"
              >
                {/* Title and Subtitle */}
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-[#562F23] mb-3 whitespace-pre-line">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#562F23] whitespace-pre-line">
                    {feature.subtitle}
                  </p>
                </div>
                {/* Icon Circle */}
                <div className="relative mx-auto mb-8 z-20">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-[#FFF0D6] rounded-full flex items-center justify-center mx-auto relative">
                    <div className="w-28 h-28 md:w-36 md:h-36 relative">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base  text-black leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            ))}

            {/* Connecting Lines */}
            {/* <div className="hidden md:block absolute top-56 left-1/2 transform -translate-x-1/2 w-full max-w-7xl z-0">
              <div className="relative">
                <div className="absolute top-0 left-1/4 w-1/4 h-0 border-t-2 border-dashed border-[#7D4B3C]"></div>
                <div className="absolute top-0 right-1/4 w-1/4 h-0 border-t-2 border-dashed border-[#7D4B3C]"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
