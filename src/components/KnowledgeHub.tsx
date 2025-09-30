"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import blogData from "../data/blogData";

export default function KnowledgeHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
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
    
    // Get all blog card elements
    const title = titleRef.current;
    const cards = cardsRef.current?.querySelectorAll('.blog-card');
    const button = buttonRef.current;
    
    if (title && cards && button) {
      // Set initial state for all elements
      gsap.set(title, { y: -30, opacity: 0 });
      gsap.set(cards, { y: 30, opacity: 0 });
      gsap.set(button, { y: 30, opacity: 0 });
      
      // Add animations to the timeline
      tl.to(
        title,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      )
      .to(
        cards,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        0.3
      )
      .to(
        button,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.7
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
    <section ref={sectionRef} className="py-16  relative z-10">
      <Image
        src="/blog-bg.webp"
        alt="Knowledge Hub Background"
        fill
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="max-w-7xl mx-auto px-4">
        <h2 ref={titleRef} className="text-5xl font-serif font-semibold mb-12 text-coffee-brown text-center">
          Knowledge Hub
        </h2>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {blogData.map((post, index) => (
            <div key={index} className="blog-card  rounded-2xl overflow-hidden  transition-shadow duration-300">
              <div className="relative h-52 w-full">
                <Image 
                  src={post.featureImage} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                <h3 className="text-2xl font-serif mb-3 text-coffee-brown">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="inline-block text-coffee-brown font-medium hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={buttonRef} className="text-center">
          <Link href="/blog" className="inline-block bg-[#15803D]  text-white px-6 py-1 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300">
            Explore Our Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}