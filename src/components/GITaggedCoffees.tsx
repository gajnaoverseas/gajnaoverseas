"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
        link: "/products?search=Monsooned+Malabar+Arabica"
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
        link: "/products?search=Monsooned+Malabar+Robusta"
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
        link: "/products?search=Coorg+Arabica"
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
        link: "/products?search=Wayanaad+Robusta"
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
        link: "/products?search=Chikmagalur+Arabica"
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
        link: "/products?search=Araku+Valley+Arabica"
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
        link: "/products?search=Bababudangiris+Arabica"
    }
];

const CoffeeCard = ({ coffee }: { coffee: GITaggedCoffeeItem }) => {
    const hasCoordinates = !!coffee.coordinates;
    const gridCols = hasCoordinates ? "md:grid-cols-3" : "md:grid-cols-2";

    return (
        <Link href={coffee.link || "#"} className="block min-w-full">
            <div
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm h-full"
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
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Info Cards */}
                <div className={`grid ${gridCols} gap-6`}>
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

                    {/* Coordinates (only for coffees that have them) */}
                    {hasCoordinates && (
                        <div className="bg-gradient-to-b from-white to-[#EEBA6C] rounded-xl p-5">
                            <div className="mb-3">
                                {/* Compass/Coordinates icon */}
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="25" y1="2" x2="25" y2="48" stroke="#8B4513" strokeWidth="2.5" />
                                    <line x1="2" y1="25" x2="48" y2="25" stroke="#8B4513" strokeWidth="2.5" />
                                    <line x1="25" y1="2" x2="22" y2="8" stroke="#8B4513" strokeWidth="2.5" />
                                    <line x1="25" y1="2" x2="28" y2="8" stroke="#8B4513" strokeWidth="2.5" />
                                    <circle cx="25" cy="25" r="6" stroke="#8B4513" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-[#2A1810] text-lg mb-3">Coordinates:</h4>
                            <p className="text-[#4A3225] text-base font-semibold leading-relaxed">
                                <span className="font-bold">Latitude:</span> {coffee.coordinates!.lat}
                            </p>
                            <p className="text-[#4A3225] text-base font-semibold leading-relaxed mt-1">
                                <span className="font-bold">Longitude:</span> {coffee.coordinates!.long}
                            </p>
                        </div>
                    )}
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
                {/* Section Header */}
                <div className="text-center mb-8 flex justify-center items-center gap-4">
                    <Image src="/gi.webp" alt="" width={50} height={50} />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-coffee-brown ">
                        GI Registered Coffees of India
                    </h2>
                </div>

                {/* GI Logos Row */}
                <div className="flex flex-wrap justify-center items-end gap-6 md:gap-8 mb-12">
                    {giTaggedCoffees.map((coffee, index) => (
                        <button
                            key={coffee.giNumber}
                            onClick={() => goToSlide(index)}
                            className={`flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer rounded-xl p-2 ${index === currentIndex
                                ? "scale-110 ring-2 ring-[#8B4513] bg-[#8B4513]/10"
                                : ""
                                }`}
                        >
                            <div className="relative w-[70px] h-[85px] md:w-[90px] md:h-[110px]">
                                <Image
                                    src={coffee.imageSrc}
                                    alt={coffee.imageAlt}
                                    fill
                                    className="object-contain"
                                    sizes="90px"
                                />
                            </div>
                            <span className="text-sm md:text-base font-semibold text-[#5D4037]">
                                GI. No: {coffee.giNumber}
                            </span>
                        </button>
                    ))}
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

                    {/* Navigation Below Cards */}
                    <div className="flex items-center justify-center gap-4 mt-8">
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
            </div>
        </section>
    );
}
