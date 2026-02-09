"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
        imageSrc: "/mag/Anamalais copy(6).png",
        imageAlt: "Monsooned Malabar Arabica Coffee"
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
        imageSrc: "/mag/Anamalais copy(6).png",
        imageAlt: "Monsooned Malabar Robusta Coffee"
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
        imageSrc: "/mag/Coorg Arabica Coffee.png",
        imageAlt: "Coorg Arabica Coffee"
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
        imageSrc: "/mag/Anamalais copy(5).png",
        imageAlt: "Wayanaad Robusta Coffee"
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
        imageSrc: "/mag/Anamalais copy(4).png",
        imageAlt: "Chikmagalur Arabica Coffee"
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
        imageSrc: "/mag/Anamalais copy(1).png",
        imageAlt: "Araku Valley Arabica Coffee"
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
        imageSrc: "/mag/Anamalais copy(2).png",
        imageAlt: "Bababudangiris Arabica Coffee"
    }
];

const CoffeeCard = ({ coffee }: { coffee: GITaggedCoffeeItem }) => {
    return (
        <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            style={{ border: `2px solid ${coffee.borderColor}` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
        >
            {/* Top Section: Image + Details */}
            <div className="flex flex-col items-center justify-center lg:px-20 md:flex-row gap-6 md:gap-36 mb-8">
                {/* Coffee Bag Image */}
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative w-[240px] h-[290px]">
                        <Image
                            src={coffee.imageSrc}
                            alt={coffee.imageAlt}
                            fill
                            className="object-contain"
                            sizes="140px"
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
        </motion.div>
    );
};

export default function GITaggedCoffees() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-coffee-brown mb-16 text-center">
              
                    GI Registered Coffees of India
                </h2>

                <div className="space-y-8">
                    {giTaggedCoffees.map((coffee, index) => (
                        <CoffeeCard key={index} coffee={coffee} />
                    ))}
                </div>
            </div>
        </section>
    );
}
