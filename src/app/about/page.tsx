"use client";

import Image from "next/image";
import AboutBanner from "@/components/AboutBanner";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";



export default function AboutUs() {


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
      <AboutBanner />

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <div className="space-y-6">

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
                  src="/about/owner1.webp"
                  alt="Priyavirat Singh"
                  width={1200}
                  height={200}
                  className="rounded-full"
                />
                <p className="lg:text-2xl text-2xl font-bold text-coffee-brown lg:mt-6 mt-4">
                  Priyavirat Singh               <Link href="https://www.linkedin.com/in/priyaviratsingh/" target="_blank"><FaLinkedin className="inline-block w-15 h-15 text-blue-600">{' '}</FaLinkedin></Link>
                </p>
                <p className="lg:text-sm text-sm font-bold text-green-700  mt-2">
                  Director at Gajna Overseas 
                  
                </p>
                <p className="lg:text-lg text-sm font-bold text-black  mt-1">
                  DIN No - 09373886
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mentors Section */}
      {/* <section ref={mentorsRef} className="py-16 bg-white">
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
        </section> */}

      {/* Vision, Mission & Core Values Section */}
      <section className="py-16 bg-[#7B2A0F] text-white">
        <div className="container mx-auto px-4 bg-[#7B2A0F]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 font-serif">
              Vision, Mission & Core Values of Gajna Overseas
            </h2>

            {/* Modern Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Vision Card - Featured */}
              <div className="lg:col-span-2 relative overflow-hidden text-left">
                <div className=" border border-white/20 rounded-2xl p-10 shadow-2xl">
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
                <div className="bg-transparent border border-white/20 rounded-2xl p-8 shadow-2xl h-full">
                  <div className="flex items-center mb-6 text-left">

                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                  </div>
                  <div className="space-y-6 text-left">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <ul className="text-white/90 leading-relaxed lg:text-lg text-sm space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-[#40C6A6] text-xl leading-6">•</span>
                          <span>To make business relations with coffee farmers adhering to Good Agricultural Practices (GAP).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#40C6A6] text-xl leading-6">•</span>
                          <span>Partnering with coffee estates adhering to Good Agricultural Practices (GAP).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#40C6A6] text-xl leading-6">•</span>
                          <span>Engaging with Co-ops and FPOs committed to GAP standards.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#40C6A6] text-xl leading-6">•</span>
                          <span>To work with coffee curing facilities approved by the Coffee Board of India.</span>
                        </li>
                      </ul>


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
                <div className="bg-transparent backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl h-full">
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

          </div>
        </div>
      </section>

      {/* Business Partners Section */}
      {/* <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <div className="max-w-6xl mx-auto ">
          <h2 className="text-4xl font-bold text-coffee-brown text-center mb-12 ">
            Our Partners
          </h2>

          <div className="grid md:grid-cols-3 gap-8 ">
         
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
    </section> */}
    </div>
  );
}
