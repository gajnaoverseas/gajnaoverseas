"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type RegionCardItem = {
    name: string;
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
        description: "Arabica plantations rejuvenated barren hills",
        borderColor: "#E91E63",
        titleColor: "#E91E63",
        elevation: "900-1100 m MSL",
        rainfall: "1000-1200 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.4, Sin.5, Cauvery",
        intercrops: "Pepper, Mango, Jackfruit, Vegetables",
        imageSrc: "/svg/Araku Valley.svg"
    },
    {
        name: "Bababudangiris",
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
        description: "High-grown, full-bodied Arabicas",
        borderColor: "#9C27B0",
        titleColor: "#9C27B0",
        elevation: "1500-2000 m MSL",
        rainfall: "1100-1200 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.9, Cauvery",
        intercrops: "Orange, Banana, Pepper",
        imageSrc: "/svg/Biligiris.svg"
    },
    {
        name: "Coorg",
        description: "India's largest coffee region, with Arabicas and Robustas",
        borderColor: "#4CAF50",
        titleColor: "#4CAF50",
        elevation: "750-1100 m MSL",
        rainfall: "1000-2500 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Sin.6, Sin.9, Cauvery; Robusta - S.274, CxR",
        intercrops: "Pepper, Cardamom, Orange, Banana, Arecanut",
        imageSrc: "/svg/Coorg Arabica Coffee.png"
    },
    {
        name: "Chikmagalur",
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
        description: "Arabicas grown in gently sloping terrain",
        borderColor: "#FF9800",
        titleColor: "#FF9800",
        elevation: "900-1100 m MSL",
        rainfall: "1000-2500 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Sin.6, Sin.9, Cauvery; Robusta - S.274, CxR",
        intercrops: "Pepper, Cardamom, Orange, Arecanut, Banana",
        imageSrc: "/svg/Manjarabad.svg"
    },
    {
        name: "Nilgiris",
        description: "Home to the best grown, slow ripened 'Kents' Arabica",
        borderColor: "#3F51B5",
        titleColor: "#3F51B5",
        elevation: "900-1400 m MSL",
        rainfall: "1600-2600 mm",
        coffeeType: "Arabica, Robusta",
        varieties: "Arabica - S.795, Kents, Cauvery; Robusta - Perdenia, S.274, CxR",
        intercrops: "Pepper, Orange, Banana, Ginger, Vegetables",
        imageSrc: "/svg/Nilgiris.svg"
    },
    {
        name: "Pulneys",
        description: "Finest quality high grown Arabicas S.795, Sin.9 and Cauvery",
        borderColor: "#3F51B5",
        titleColor: "#3F51B5",
        elevation: "600-2000 m MSL",
        rainfall: "1000-1600 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Sin.5B, Sin.9, Sin.10, Cauvery",
        intercrops: "Orange, Banana, Pepper, Cardamom, Vegetables",
        imageSrc: "/svg/Pulneys.svg"
    },
    {
        name: "Shevaroys",
        description: "Very high grown Arabicas, S.795, Sin.9 and Cauvery",
        borderColor: "#9C27B0",
        titleColor: "#9C27B0",
        elevation: "900-1500 m MSL",
        rainfall: "800-1500 mm",
        coffeeType: "Arabica",
        varieties: "S.795, Cauvery, Sin.9",
        intercrops: "Orange, Banana, Pepper",
        imageSrc: "/svg/Shevaroys.svg"
    },
    {
        name: "Travancore",
        description: "Rain-nourished Robustas of the CxR variety",
        borderColor: "#00BCD4",
        titleColor: "#00BCD4",
        elevation: "400-1600 m MSL",
        rainfall: "2000-4000 mm",
        coffeeType: "Robusta",
        varieties: "S.274, CxR",
        intercrops: "Pepper, Banana, Ginger, Vegetables, Medicinal Plants",
        imageSrc: "/svg/Travancore.svg"
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-coffee-brown mb-12 text-center">
                    Region Cards
                </h2>

                {/* Region Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regions.map((region, index) => (
                        <RegionCard key={index} region={region} />
                    ))}
                </div>
            </div>
        </section>
    );
}
