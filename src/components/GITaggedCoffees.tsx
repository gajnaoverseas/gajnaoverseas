"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GITaggedCoffeeItem = {
    title: string;
    giNumber: string;
    coffeeType: "Arabica" | "Robusta";
    borderColor: string;
    coordinates?: {
        lat: string;
        long: string;
    };
    regionSignificance: string[];
    cupQuality: string;
    imageSrc: string;
    imageAlt: string;
    link?: string;
};

const giTaggedCoffees: GITaggedCoffeeItem[] = [
    {
        title: "Monsooned Malabar Arabica Coffee",
        giNumber: "54",
        coffeeType: "Arabica",
        borderColor: "#4A5FC1",
        regionSignificance: [
            "Prepared from whole Arabica and Robusta cherry",
            "The coffee is processed during the intense South West Monsoon"
        ],
        cupQuality: "In the cup the coffee is mild, mellow and neutral flavor.",
        imageSrc: "/svg/Monsooned Malabar.svg",
        imageAlt: "Monsooned Malabar Arabica Coffee",
        link: "/products/monsooned-malabar-arabica-coffee"
    },
    {
        title: "Monsooned Malabar Robusta Coffee",
        giNumber: "55",
        coffeeType: "Robusta",
        borderColor: "#4A5FC1",
        regionSignificance: [
            "Prepared from whole Arabica and Robusta cherry",
            "The coffee is processed during the intense South West Monsoon"
        ],
        cupQuality: "In the cup the coffee is mild, mellow and neutral flavor.",
        imageSrc: "/svg/Monsooned Malabar.svg",
        imageAlt: "Monsooned Malabar Robusta Coffee",
        link: "/products/monsooned-malabar-robusta-coffee"
    },
    {
        title: "Coorg Arabica Coffee",
        giNumber: "331",
        coffeeType: "Arabica",
        borderColor: "#7CB342",
        regionSignificance: [
            "A micro hotspot of biodiversity",
            "Multistoried coffee agro forestry",
            "Coorg Coffee culture - Devarkadu",
            "Unique place with many GI registered products"
        ],
        cupQuality: "Pleasant Aroma, Balanced cup with mild acidity, Strong body with a hint of floral note.",
        imageSrc: "/svg/Coorg Arabica Coffee.png",
        imageAlt: "Coorg Arabica Coffee",
        link: "/products/coorg-arabica-coffee"
    },
    {
        title: "Wayanaad Robusta Coffee",
        giNumber: "332",
        coffeeType: "Robusta",
        borderColor: "#E91E63",
        regionSignificance: [
            "Suitable microclimate for Robusta coffee varieties",
            "Robusta coffee accounts to more than 95% of the total coffee cultivation",
            "More than 90% small and tiny farmers"
        ],
        cupQuality: "Soft to neutral cup, full bodied, malty and chocolatey note with light to medium flavour.",
        imageSrc: "/svg/Wayanaad.svg",
        imageAlt: "Wayanaad Robusta Coffee",
        link: "/products/wayanaad-robusta-coffee"
    },
    {
        title: "Chikmagalur Arabica Coffee",
        giNumber: "333",
        coffeeType: "Arabica",
        borderColor: "#FF9800",
        coordinates: {
            lat: "12° 54' 42\" and 13° 53' 53\" N",
            long: "75° 04' 46\" and 76° 21' 50\" E"
        },
        regionSignificance: [
            "Coffee land of India",
            "Rich flora and fauna",
            "Tigers, medicinal plants"
        ],
        cupQuality: "Mild acidity and medium body with floral and a hint of citrus note of lemon grass",
        imageSrc: "/svg/Chikmagalur.svg",
        imageAlt: "Chikmagalur Arabica Coffee",
        link: "/products/chikmagalur-arabica-coffee"
    },
    {
        title: "Araku Valley Arabica Coffee",
        giNumber: "334",
        coffeeType: "Arabica",
        borderColor: "#E91E63",
        coordinates: {
            lat: "17° 87' 13\" and 18° 85' 61\" N",
            long: "82° 35' 33\" and 82° 87' 75\" E"
        },
        regionSignificance: [
            "Grown by 100% Tribal Farmers with small holdings",
            "Organic method of cultivation",
            "Unique varieties grown at higher altitude"
        ],
        cupQuality: "Light to medium body, pleasant acidity with citrus note of grape fruit with mild jaggary sweetness.",
        imageSrc: "/svg/Araku Valley.svg",
        imageAlt: "Araku Valley Arabica Coffee",
        link: "/products/araku-valley-arabica-coffee"
    },
    {
        title: "Bababudangiris Arabica Coffee",
        giNumber: "335",
        coffeeType: "Arabica",
        borderColor: "#FF9800",
        coordinates: {
            lat: "13° 314\" and 13° 534\" N",
            long: "75° 573\" and 75° 79\" E"
        },
        regionSignificance: [
            "Birth place of coffee",
            "High-grown",
            "Traditionally and popularly known as Giri coffee more than a century"
        ],
        cupQuality: "Striking acidity with full body and sweetness with mild flavour and a balanced cup.",
        imageSrc: "/svg/Bababudangiris.svg",
        imageAlt: "Bababudangiris Arabica Coffee",
        link: "/products/bababudangiris-arabica-coffee"
    }
];

import Link from "next/link";

// ... (imports)

// ... (types and data)

const CoffeeCard = ({ coffee }: { coffee: GITaggedCoffeeItem }) => {
    // const slug = coffee.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return (
        <Link href={coffee.link || "#"} className="block min-w-full">
            <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm h-full transition-transform hover:scale-[1.01] duration-300"
                style={{ border: `2px solid ${coffee.borderColor}` }}
            >
                {/* Top Section: Image + Details */}
                <div className="flex flex-col items-center justify-center lg:px-20 md:flex-row gap-6 md:gap-36 mb-8">
                    {/* Coffee Bag Image */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="relative w-[240px] h-[250px]">
                            <Image
                                src={coffee.imageSrc}
                                alt={coffee.imageAlt}
                                fill
                                className="object-contain"
                                sizes="240px"
                            />
                        </div>
                        <span className="mt-2 text-sm font-medium text-[#5D4037]">
                            {coffee.coffeeType}
                        </span>
                    </div>

                    {/* Title and Details */}
                    <div className="flex-1">
                        <h3 className="text-2xl md:text-5xl font-bold text-[#8B4513] underline decoration-[#8B4513] underline-offset-4 mb-4">
                            {coffee.title}
                        </h3>

                        <div className="space-y-2 text-[#2A1810]">
                            <p>
                                <span className="font-bold">GI Registration number:</span> {coffee.giNumber}
                            </p>
                            {coffee.coordinates && (
                                <div>
                                    <p>
                                        <span className="font-bold">Coordinates:</span>{" "}
                                        <span className="font-semibold">Latitude:</span> {coffee.coordinates.lat}
                                    </p>
                                    <p className="lg:ml-[106px]">
                                        <span className="font-semibold">Longitude:</span> {coffee.coordinates.long}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Two Info Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Significance of Region */}
                    <div className="bg-gradient-to-b from-white to-[#EEBA6C] rounded-xl p-5">
                        <div className="mb-3">
                            <Image src="/svg/IndiaMapIcon.svg" alt="" width={50} height={50} />
                        </div>
                        <h4 className="font-bold text-[#2A1810] text-lg mb-3">Significance of region:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-[#4A3225] text-base font-semibold leading-relaxed">
                            {coffee.regionSignificance.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Cup Quality */}
                    <div className="bg-gradient-to-b from-white to-[#EEBA6C] rounded-xl p-5">
                        <div className="mb-3">
                            <Image src="/svg/Cup-Icon.svg" alt="" width={50} height={50} />
                        </div>
                        <h4 className="font-bold text-[#2A1810] text-lg mb-3">Cup quality:</h4>
                        <p className="text-[#4A3225] text-base font-semibold leading-relaxed">{coffee.cupQuality}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function GITaggedCoffees() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = giTaggedCoffees.length;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header with Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-coffee-brown text-center md:text-left">
                        GI Registered Coffees of India
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={goToPrevious}
                            className="bg-[#8B4513] hover:bg-[#6d3610] text-white p-3 rounded-full shadow-lg transition-colors"
                            aria-label="Previous coffee"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <span className="text-[#5D4037] font-medium min-w-[60px] text-center">
                            {currentIndex + 1} / {totalItems}
                        </span>

                        <button
                            onClick={goToNext}
                            className="bg-[#8B4513] hover:bg-[#6d3610] text-white p-3 rounded-full shadow-lg transition-colors"
                            aria-label="Next coffee"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Carousel Content */}
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CoffeeCard coffee={giTaggedCoffees[currentIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {giTaggedCoffees.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex
                                    ? "bg-[#8B4513]"
                                    : "bg-[#D4A574] hover:bg-[#b8895a]"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
