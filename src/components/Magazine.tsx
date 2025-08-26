"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Magazine() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate magazine data from the available images with extracted information
  const magazineImages = [
    { 
      id: 1, 
      src: "/mag/Anamalais copy.png", 
      title: "Anamalais",
      elevation: "1000-1400m MSL",
      rainfall: "2500-3000 mm",
      coffeeType: "Arabica",
      varieties: "S.795, Cauvery, Sln.9",
      harvest: "Pepper, Orange, Banana"
    },
    { 
      id: 2, 
      src: "/mag/Anamalais copy(1).png", 
      title: "Araku Valley  ",
      elevation: "900-1100 m MSL",
      rainfall: "1000-1200 mm",
      coffeeType: "Arabica",
      varieties: "S.795, Cauvery, Sln.4, Sln.5",
      harvest: "Pepper, Mango, Jackfruit, Vegetables"
    },
    // { 
    //   id: 3, 
    //   src: "/mag/Anamalais copy(2).png", 
    //   title: "Araku Valley",
    //   elevation: "900-1100m MSL",
    //   rainfall: "1000-1200mm",
    //   coffeeType: "Arabica",
    //   varieties: "S.795, Sln.4, Sln.5, Cauvery",
    //   harvest: "Nov-Feb"
    // },
    { 
      id: 4, 
      src: "/mag/Anamalais copy(2).png", 
      title: "Bababudangiri",
      elevation: "1000-1500m MSL",
      rainfall: "1750-2200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Pepper, Cardamom, Arecanut"
    },
    { 
      id: 5, 
      src: "/mag/Anamalais copy(3).png", 
      title: "Brahmaputra",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 6, 
      src: "/mag/Anamalais copy(4).png", 
      title: "Chikmagalur",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 7, 
      src: "/mag/Anamalais copy(5).png", 
      title: "Wayanad",
      elevation: "600-900m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Robusta",
      varieties: "Peridenia, S.274, CxR",
      harvest: "Pepper, Banana, Ginger, Vegetables"
    },
    { 
      id: 8, 
      src: "/mag/Anamalais copy(6).png", 
      title: "Monsooned Malabar",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 9, 
      src: "/mag/Anamalais copy(7).png", 
      title: "Mysore Nuggets",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 10, 
      src: "/mag/Anamalais copy(8).png", 
      title: "Robusta Kaapi Royale",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 11, 
      src: "/mag/Anamalais copy(9).png", 
      title: "Manjarabad",
      elevation: "1500-2000m MSL",
      rainfall: "1100-1200mm",
      coffeeType: "Arabica",
      varieties: "S.795, Sln.9, Cauvery",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 12, 
      src: "/mag/Anamalais copy(10).png", 
      title: "Travancore",
      elevation: "400-1600m MSL",
      rainfall: "2000-4000mm",
      coffeeType: "Robusta",
      varieties: "S.274, CxR",
      harvest: "Pepper, Banana, Ginger, Vegetables, Medicinal plants"
    },
    { 
      id: 13, 
      src: "/mag/Anamalais copy(11).png", 
      title: "Shevaroys",
      elevation: "900-1500m MSL",
      rainfall: "800-1500mm",
      coffeeType: "Arabica",
      varieties: "S.795, Cauvery, Sln.9",
      harvest: "Orange, Banana, Pepper"
    },
    { 
      id: 14, 
      src: "/mag/Anamalais copy(12).png", 
      title: "Pulneys",
      elevation: "600-2000m MSL",
      rainfall: "1000-1600mm",
      coffeeType: "Arabica",
      varieties: "S.795, Cauvery, Sln.9, Sln.10, Sln.5B",
      harvest: "Orange, Banana, Pepper"
    },

  ];

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-semibold mb-4 text-coffee-brown">
            Coffee Growing Regions of India
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Explore the diverse coffee-growing regions of India through our interactive magazine. 
            Hover over each region to discover their unique characteristics and coffee varieties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {magazineImages.map((magazine, index) => (
            <motion.div
              key={magazine.id}
              className="relative cursor-pointer group overflow-hidden"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Container */}
              <div className="relative w-full aspect-[3/4] rounded-lg shadow-lg overflow-hidden">
                
                {/* Content Card (Behind) */}
                <div className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-lg">
                  <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                    <h4 className="text-sm font-bold text-coffee-brown mb-3">
                      {magazine.title}
                    </h4>
                    <div className="text-xs font-bold text-gray-600 space-y-1 text-left">
                      <p>Elevation:<span className="font-medium"> {magazine.elevation}</span></p>
                      <p>Rainfall:<span className="font-medium"> {magazine.rainfall}</span></p>
                      <p>Coffee Type:<span className="font-medium"> {magazine.coffeeType}</span></p>
                      <p>Main Varieties:<span className="font-medium"> {magazine.varieties}</span></p>
                      <p>Main intercrops : <span className="font-medium"> {magazine.harvest}</span></p>
                    </div>
                  </div>
                </div>

                {/* Cover Card (Front) */}
                <motion.div
                  className="absolute inset-0 w-full h-full rounded-lg shadow-lg overflow-hidden bg-white"
                  animate={{
                    x: hoveredIndex === index ? "-100%" : "0%"
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={magazine.src}
                    alt={magazine.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                  
                  {/* Title overlay when not hovered */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg"
                    animate={{
                      opacity: hoveredIndex === index ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* <h3 className="text-white text-xs font-medium text-center">
                      {magazine.title}
                    </h3> */}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <motion.button
            className="bg-coffee-brown text-white px-8 py-3 rounded-full font-medium hover:bg-coffee-brown/90 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Regions
          </motion.button>
        </div>
      </div>
    </section>
  );
}