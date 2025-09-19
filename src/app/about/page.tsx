"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const mentorsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Introduction section animation
      gsap.fromTo(
        introRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mentors section animation
      gsap.fromTo(
        mentorsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: mentorsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Vision section animation
      gsap.fromTo(
        visionRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Partners section animation
      gsap.fromTo(
        partnersRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const mentors = [
    {
      id: 1,
      name: "Mentor 1",
      org: "Coffee Board of India",
      img: "/about/mentor/1.jpg",
    },
    {
      id: 2,
      name: "Mentor 2",
      org: "Coffee Board of India",
      img: "/about/mentor/2.jpg",
    },
    {
      id: 3,
      name: "Mentor 3",
      org: "Coffee Board of India",
      img: "/about/mentor/3.jpg",
    },
    {
      id: 4,
      name: "Mentor 4",
      org: "Coffee Board of India",
      img: "/about/mentor/4.jpg",
    },
    {
      id: 5,
      name: "Mentor 5",
      org: "Coffee Board of India",
      img: "/about/mentor/5.jpg",
    },
  ];

  const digitalMarketingPartners: Partner[] = [
    { id: 1, name: "DigitallyNext", org: "Digital Marketing Agency", img: "/about/partners/dn.webp" },

  ];

  const caPartners: Partner[] = [
    { id: 1, name: "BGDS & CO.", org: "Chartered Accountant", img: "/about/partners/ca.webp" },

  ];

  const logisticsPartners: Partner[] = [
    { id: 1, name: "FastShip", org: "Shipping & Logistics", img: "/about/partners/fastship.webp" },

  ];

  type Partner = {
    id: number;
    name: string;
    org: string;
    img: string;
  };

  return (
    <div className="min-h-screen bg-white lg:mt-36 mt-14">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-r from-coffee-brown to-amber-800 text-white lg:py-20 py-10"
      >
   
          <h1 className="text-5xl md:text-7xl font-serif font-semibold lg:mb-6 text-center">
            About Us
          </h1>

       
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-semibold text-coffee-brown mb-6 font-serif">
                  Introduction
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Priyavirat Singh, the{" "}
                  <span className="font-bold text-coffee-brown">
                    Founder and Director
                  </span>{" "}
                  at Gajna Overseas Private Limited, has a good knowledge of the
                  Indian Origin Coffees. He has trained himself in the coffee
                  field at the Coffee Board of India on the various aspects of
                  Indian Origin Green Coffee Beans.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With years of experience and deep understanding of coffee
                  cultivation, processing, and export, Priyavirat Singh has
                  established Gajna Overseas as a trusted name in the coffee
                  industry.
                </p>
              </div>
              <div className="flex justify-center flex-col items-center">
                <Image
                  src="/about/owner.webp"
                  alt="Priyavirat Singh"
                  width={1200}
                  height={200}
                  className="rounded-full"
                />
                <p className="lg:text-4xl text-2xl font-bold text-coffee-brown lg:mt-6 mt-4 lg:ml-20">
                  Priyavirat Singh
                </p>
                <p className="lg:text-lg text-sm font-bold text-green-700 lg:ml-32">
                  Director at Gajna Overseas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section ref={mentorsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold text-coffee-brown mb-12 font-serif">
              Mentors at Coffee Board of India
            </h2>
            <div className="grid md:grid-cols-5 gap-8">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                      src={mentor.img}
                      alt={mentor.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{mentor.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values Section */}
      <section ref={visionRef} className="py-16 bg-coffee-brown text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 font-serif">
              Vision, Mission & Core Values of Gajna Overseas
            </h2>

            {/* Modern Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Vision Card - Featured */}
              <div className="lg:col-span-2 relative overflow-hidden text-left">
                <div className="bg-gradient-to-br from-amber-600/20 to-orange-700/20 backdrop-blur-sm border border-white/20 rounded-2xl p-10 shadow-2xl">
                  <div className="flex items-center mb-6">
                    
                    <h3 className="text-4xl font-bold text-white fonts">Our Vision</h3>
                  </div>
                  <p className="lg:text-xl text-white/90 leading-relaxed font-medium">
                    To make Gajna Overseas a reliable, trusted and renowned international brand in the export of Green Coffee Beans.
                  </p>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-600/20 to-teal-700/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl h-full">
                  <div className="flex items-center mb-6 text-left">
                    
                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                  </div>
                  <div className="space-y-6 text-left">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <p className="text-white/90 leading-relaxed lg:text-lg text-sm">
                        To make business relations with Coffee Farmers adhering to Good Agricultural Practices (GAP), Coffee Estates implementing GAP, Co-op/FPOs implementing GAP, and Coffee curing works approved by Coffee Board Of India.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <p className="text-white/90 leading-relaxed lg:text-lg text-sm">
                        Continuous efforts to expand our presence in the international market.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <p className="text-white/90 leading-relaxed lg:text-lg text-sm">
                        Taking responsibility for all our actions to win the trust of both our customers as well as suppliers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Values Card */}
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-purple-600/20 to-indigo-700/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl h-full">
                  <div className="flex items-center mb-6">
                    
                    <h3 className="text-3xl font-bold text-white">Core Values</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-left">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Build a positive team / confident team
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Maintaining integrity and honesty even when things get tough
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Build open and honest relationships with clear communication
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Build trust through transparency and open, authentic communication
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Infographic Section */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white mb-4 font-serif">Our Journey in Numbers</h3>
                <p className="text-xl text-white/80 mt-10 lg:mt-0">Visualizing our commitment to excellence</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Global Reach</h4>
                  <p className="text-white/80">Expanding our presence across international markets</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Quality Assurance</h4>
                  <p className="text-white/80">Certified by Coffee Board of India standards</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Trusted Partners</h4>
                  <p className="text-white/80">Building lasting relationships with farmers and clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Partners Section */}
      <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <div className="max-w-6xl mx-auto ">
          <h2 className="text-4xl font-bold text-coffee-brown text-center mb-12 ">
            Our Business Partners
          </h2>

          <div className="grid md:grid-cols-3 gap-8 ">
            {/* Digital Marketing Partners */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-coffee-brown mb-6 text-left">
                Digital Marketing Partners
              </h3>
              <div className="space-y-4">
                {digitalMarketingPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        width={1200}
                        height={64}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                      <p className="text-sm text-gray-600">{partner.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chartered Accountants */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-coffee-brown mb-6 text-left">
                Chartered Accountants
              </h3>
              <div className="space-y-4">
                {caPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                      <p className="text-sm text-gray-600">{partner.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Partners */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-coffee-brown mb-6 text-center">
                Logistics Partners
              </h3>
              <div className="space-y-4">
                {logisticsPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={partner.img}
                        alt={partner.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                      <p className="text-sm text-gray-600">{partner.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
