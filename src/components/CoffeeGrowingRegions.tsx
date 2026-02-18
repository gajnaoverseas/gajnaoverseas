"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type RegionCardItem = {
    name: string;
    regionLabel: string;
    description: string;
    borderColor: string;
    titleColor: string;
    elevation: string;
    rainfall: string;
    coffeeType: string;
    varieties: string;
    intercrops: string;
    imageSrc: string;
};

const regions: RegionCardItem[] = [
    {
        name: "Anamalais",
        regionLabel: "Anamalais (Tamil Nadu)",
        description: "Finely grown large Arabica beans",
        borderColor: "#00BCD4",
        titleColor: "#00BCD4",
        elevation: "1000-1400 m MSL",
        rainfall: "2500-3000 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Cauvery, Sin.9",
        intercrops: "Pepper, Orange, Banana",
        imageSrc: "/svg/Anamalais.svg"
    },
    {
        name: "Araku Valley",
        regionLabel: "Araku Valley (Andhra Pradesh)",
        description: "Arabica plantations rejuvenated barren hills",
        borderColor: "#ED0080",
        titleColor: "#ED0080",
        elevation: "900-1100 m MSL",
        rainfall: "1000-1200 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.4, Sin.5, Cauvery",
        intercrops: "Pepper, Mango, Jackfruit, Vegetables",
        imageSrc: "/svg/Araku Valley.svg"
    },
    {
        name: "Bababudangiris",
        regionLabel: "Bababudangiris (Karnataka)",
        description: "The birthplace of the Coffees of India!",
        borderColor: "#9C27B0",
        titleColor: "#9C27B0",
        elevation: "1000-1500 m MSL",
        rainfall: "1750-2200 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.9, Cauvery",
        intercrops: "Pepper, Cardamon, Arecanut",
        imageSrc: "/svg/Bababudangiris.svg"
    },
    {
        name: "Brahmaputra",
        regionLabel: "Brahmaputra",
        description: "The birthplace of the Coffees of India!",
        borderColor: "#F44336",
        titleColor: "#F44336",
        elevation: "800-1200 m MSL",
        rainfall: "1500-2000 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Cauvery",
        intercrops: "Pineapple, Pepper, Jackfruit, Vegetables",
        imageSrc: "/svg/Brahmaputra.svg"
    },
    {
        name: "Biligiris",
        regionLabel: "Biligiris (Karnataka/Tamil Nadu)",
        description: "High-grown, full-bodied Arabicas",
        borderColor: "#00904C",
        titleColor: "#00904C",
        elevation: "1500-2000 m MSL",
        rainfall: "1100-1200 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.9, Cauvery",
        intercrops: "Orange, Banana, Pepper",
        imageSrc: "/svg/Biligiris.svg"
    },
    {
        name: "Coorg",
        regionLabel: "Coorg (Karnataka)",
        description: "India's largest coffee region, with Arabicas and Robustas",
        borderColor: "#95C22A",
        titleColor: "#95C22A",
        elevation: "750-1100 m MSL",
        rainfall: "1000-2500 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Sin.6, Sin.9, Cauvery; Robusta - S.274, CxR",
        intercrops: "Pepper, Cardamom, Orange, Banana, Arecanut",
        imageSrc: "/svg/Coorg Arabica Coffee.png"
    },
    {
        name: "Chikmagalur",
        regionLabel: "Chikmagalur (Karnataka)",
        description: "Coffee country, with Arabicas & Robustas, pepper & spice",
        borderColor: "#FF9800",
        titleColor: "#FF9800",
        elevation: "700-1200 m MSL",
        rainfall: "1000-4500 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Sin.5B, Sin.9, Cauvery; Robusta - Perdenia, S.274, CxR",
        intercrops: "Pepper, Cardamom, Arecanut, Orange, Vanilla",
        imageSrc: "/svg/Chikmagalur.svg"
    },
    {
        name: "Manjarabad",
        regionLabel: "Manjarabad (Karnataka)",
        description: "Arabicas grown in gently sloping terrain",
        borderColor: "#FFE600",
        titleColor: "#FFE600",
        elevation: "900-1100 m MSL",
        rainfall: "1000-2500 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Sin.6, Sin.9, Cauvery; Robusta - S.274, CxR",
        intercrops: "Pepper, Cardamom, Orange, Arecanut, Banana",
        imageSrc: "/svg/Manjarabad.svg"
    },
    {
        name: "Nilgiris",
        regionLabel: "Nilgiris (Tamil Nadu)",
        description: "Home to the best grown, slow ripened 'Kents' Arabica",
        borderColor: "#0374BC",
        titleColor: "#0374BC",
        elevation: "900-1400 m MSL",
        rainfall: "1600-2600 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Kents, Cauvery; Robusta - Perdenia, S.274, CxR",
        intercrops: "Pepper, Orange, Banana, Ginger, Vegetables",
        imageSrc: "/svg/Nilgiris.svg"
    },
    {
        name: "Pulneys",
        regionLabel: "Pulneys (Tamil Nadu)",
        description: "Finest quality high grown Arabicas S.795, Sin.9 and Cauvery",
        borderColor: "#D3E173",
        titleColor: "#D3E173",
        elevation: "600-2000 m MSL",
        rainfall: "1000-1600 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.5B, Sin.9, Sin.10, Cauvery",
        intercrops: "Orange, Banana, Pepper, Cardamom, Vegetables",
        imageSrc: "/svg/Pulneys.svg"
    },
    {
        name: "Shevaroys",
        regionLabel: "Shevaroys (Tamil Nadu)",
        description: "Very high grown Arabicas, S.795, Sin.9 and Cauvery",
        borderColor: "#FFCB04",
        titleColor: "#FFCB04",
        elevation: "900-1500 m MSL",
        rainfall: "800-1500 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Cauvery, Sin.9",
        intercrops: "Orange, Banana, Pepper",
        imageSrc: "/svg/Shevaroys.svg"
    },
    {
        name: "Travancore",
        regionLabel: "Travancore (Kerala)",
        description: "Rain-nourished Robustas of the CxR variety",
        borderColor: "#00AEEF",
        titleColor: "#00AEEF",
        elevation: "400-1600 m MSL",
        rainfall: "2000-4000 mm",
        coffeeType: "Robusta",
        varieties: "S.274, CxR",
        intercrops: "Pepper, Banana, Ginger, Vegetables, Medicinal Plants",
        imageSrc: "/svg/Travancore.svg"
    },
    {
        name: "Wayanad",
        regionLabel: "Wayanad (Kerala)",
        description: "Largest Robusta producing region",
        borderColor: "#C41E3A",
        titleColor: "#C41E3A",
        elevation: "600-900 m MSL",
        rainfall: "1100-1200 mm",
        coffeeType: "Robusta",
        varieties: "Peridenia, S.274, CxR",
        intercrops: "Pepper, Banana, Ginger, Vegetables",
        imageSrc: "/svg/Wayanaad.svg"
    }
];

const RegionCard = ({ region }: { region: RegionCardItem }) => {
    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-sm"
            style={{ borderLeft: `4px solid ${region.borderColor}` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
        >
            <div className="p-4">
                {/* Top Section: Image + Heading */}
                <div className="flex gap-4 mb-4">
                    {/* Region Image */}
                    <div className="flex-shrink-0">
                        <div className="relative w-[120px] h-[150px]">
                            <Image
                                src={region.imageSrc}
                                alt={region.name}
                                fill
                                className="object-contain"
                                sizes="120px"
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="flex-1 flex flex-col justify-center">
                        <p className="text-sm text-gray-600 mb-1">
                            {region.regionLabel}
                        </p>
                        <h3
                            className="text-lg font-bold"
                            style={{ color: region.titleColor }}
                        >
                            {region.description}
                        </h3>
                        <hr
                            className="mt-2"
                            style={{ borderColor: region.borderColor, borderWidth: '1px' }}
                        />
                    </div>
                </div>

                {/* Bottom Section: Details */}
                <div className="space-y-1.5 text-sm text-gray-700">
                    <div className="flex">
                        <span className="font-bold w-[130px] flex-shrink-0">Elevation</span>
                        <span className="mx-2">:</span>
                        <span>{region.elevation}</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold w-[130px] flex-shrink-0">Rainfall</span>
                        <span className="mx-2">:</span>
                        <span>{region.rainfall}</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold w-[130px] flex-shrink-0">Main Coffee Type</span>
                        <span className="mx-2">:</span>
                        <span>{region.coffeeType}</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold w-[130px] flex-shrink-0">Main Varieties</span>
                        <span className="mx-2">:</span>
                        <span>{region.varieties}</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold w-[130px] flex-shrink-0">Main Intercrops</span>
                        <span className="mx-2">:</span>
                        <span>{region.intercrops}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function CoffeeGrowingRegions() {
    return (
        <section className="py-16 md:py-20 bg-[#F5F5F5]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-14">
                    {/* Logo + Heading */}
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <Image
                            src="/mag/coffeeofindia.webp"
                            alt="Coffees of India Logo"
                            width={60}
                            height={70}
                            className="object-contain"
                        />
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-coffee-brown">
                            Coffees of India
                        </h2>
                    </div>

                    {/* Bulleted Subtext - single line, centered */}
                    <ul className="flex items-center justify-center gap-6 md:gap-10 text-sm md:text-base text-gray-700 mb-6  translate-x-10">
                        <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block" />
                            Shade grown
                        </li>
                        <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block" />
                            Hand picked
                        </li>
                        <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 inline-block" />
                            Sundried
                        </li>
                    </ul>

                    {/* Heading Paragraph 1 */}
                    <p className="text-base md:text-lg font-bold italic text-coffee-brown max-w-5xl mx-auto mb-3">
                        The coffees of India are a diverse range of 16 Coffees from 13 different coffee-growing regions.
                    </p>

                    {/* Heading Paragraph 2 */}
                    <p className="text-sm md:text-base text-gray-700 max-w-5xl mx-auto mb-6">
                        There are 13 regional varieties of Arabicas and Robustas and 3 specialty coffees.
                    </p>

                    {/* Bold specification line */}
                    <p className="text-sm md:text-base font-bold text-gray-800 max-w-5xl mx-auto mb-3">
                        Regional Logos of 13 different coffee growing regions in India with the specifications in terms of Altitude, Rainfall, etc.–
                    </p>

                    {/* Multi-line production practices paragraph */}
                    <p className="text-sm md:text-base text-gray-700 max-w-5xl mx-auto leading-relaxed">
                        Production practices in different coffee-growing regions are more or less the same. However, the microclimate in each region is unique due to changes in altitude, composition of shade trees and diversified crops. These will give small changes in the coffee cup quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regions.slice(0, -1).map((region, index) => (
                        <RegionCard key={index} region={region} />
                    ))}
                </div>

                {/* Last card centered with same width as grid columns */}
                <div className="flex justify-center mt-6">
                    <div className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                        <RegionCard region={regions[regions.length - 1]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
