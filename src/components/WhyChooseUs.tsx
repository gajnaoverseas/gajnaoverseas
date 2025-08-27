"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import benefitsData from "../data/benefitsData";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
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
    
    // Get all card elements and images
    const cards = cardsRef.current?.querySelectorAll('.benefit-card > div:last-child');
    const imageContainers = cardsRef.current?.querySelectorAll('.benefit-card > div:first-child');
    
    if (cards && imageContainers) {
      // Set initial state for all elements
      gsap.set(imageContainers, { y: -30, opacity: 0 });
      gsap.set(cards, { y: 30, opacity: 0 });
      
      // Add animations to the timeline - first animate images coming down
      tl.to(
        imageContainers,
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" },
        0
      )
      // Then animate cards sliding up
      .to(
        cards,
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        0.4
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
    <section ref={sectionRef} className="py-24 bg-[#E9B8A8] relative z-10 pb-28">
      
      <div className="max-w-7xl mx-auto px-4 lg:h-[600px]">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-semibold mb-2 text-coffee-brown">
            Why Choose Gajna Overseas?
          </h2>
          <p className="text-coffee-brown text-lg max-w-3xl mx-auto">
            From classic espressos to innovative seasonal blends, our menu has something for every coffee lover.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-card relative pt-8 px-4 lg:h-[400px] w-full group max-w-[330px] mx-auto">
              {/* Image positioned outside the card */}
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-44 h-full z-20">
                <div className="relative w-full h-full drop-shadow-xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-translate-y-4">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Card content */}
              <div className="bg-[#572F22] rounded-2xl shadow-lg px-6 py-3 pt-44 pb-6 text-white mt-8 h-[360px] flex flex-col transition-all duration-500 ease-in-out group-hover:shadow-2xl">
                <h3 className="text-base font-serif mb-2">{benefit.title}</h3>
                <div className="overflow-y-auto flex-grow pr-2">
                  <p className="text-[12px] italic">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

    </section>
  );
}