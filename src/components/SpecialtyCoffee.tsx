"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type SpecialtyCoffeeItem = {
    title: string;
    subtitle: string;
    description: string[];
    imageSrc: string;
    imageAlt: string;
    label: string;
    imagePosition: "left" | "right";
    bgColor?: string;
    textColor?: string;
    descriptionColor?: string;
    beanPosition?: "left" | "right";
    labelColor?: string;
    link?: string;
    variants?: { name: string; link: string }[];
};

const specialtyCoffees: SpecialtyCoffeeItem[] = [
    {
        title: "Mysore Nuggets Extra Bold",
        subtitle: "It is a rare, premium coffee that represents the best quality coffee from India.",
        description: [
            "This wonderful and exotic coffee is prepared from washed Arabicas grown in the regions of Chikmaglur, Coorg, Biligiris, Bababudangiris and Shevaroys. The beans are very large, uniformly bluish green in colour and have a clean, polished appearance. In the cup, the coffee exhibits full aroma, medium to good body, good acidity and fine flavour with a hint of spice."
        ],
        imageSrc: "/svg/Mysore Nuggets.svg",
        imageAlt: "Mysore Nuggets Extra Bold",
        label: "Grade Specific Specialty Coffee",
        imagePosition: "left",
        bgColor: "#91400E",
        link: "/products/mysore-nuggets-extra-bold"
    },
    {
        title: "Robusta Kaapi Royale",
        subtitle: "It is India's flagship Washed Robusta brand.",
        description: [
            "Thanks to a unique washing process, Indian Washed Robustas are nearest in taste to that of Arabicas and make for great standalone brewed coffee. The beans appear to be bold, round with pointed ends and are gray to bluish gray in colour. These intensely aromatic coffees have a soft, mild taste with a chocolatey note."
        ],
        imageSrc: "/svg/Robusta Kaapi Royale.svg",
        imageAlt: "Robusta Kaapi Royale",
        label: "Grade Specific Specialty Coffee",
        imagePosition: "right",
        bgColor: "#EEBA6C",
        textColor: "#853B0E",
        descriptionColor: "black",
        beanPosition: "left",
        labelColor: "#8B4513",
        link: "/products/robusta-kaapi-royale"
    },
    {
        title: "Monsooned Malabar",
        subtitle: "The only monsooned coffee in the world",
        description: [
            "Many years ago, coffee beans from India were accidentally 'monsooned' over a long voyage. Monsoon winds caused the beans to swell to one-and- a-half times their normal size and take on a purer, paler colour. Something magical seemed to have happened to the coffee... and consumers around Europe loved its unique flavour!",
            "India has perfected the art of deliberately \"monsooning\" coffee at special curing works along the Malabar Coast.",
            "Monsooned coffee or coffee beans 'swollen' with moisture from the air, is prepared at the curing works situated on the West coast of Southern India. Stored in specific warehouse, moist monsoon winds circulate around the coffee beans, making them swell in size and take on a mellowed but aggressive, musty flavour. This process yellows the bean and reduces the acidity, imparting a heavy, syrupy flatness reminiscent of aged coffees.",
            "For preparing monsooned coffees, only dry processed Arabica and Robusta beans are used. The coffees are mainly used in blends to mellow and impart richness to rougher, more acidic coffees.",
            "Creating the world's most exotic specialty coffee. In the cup, Monsooned Malabar has medium strength and a mild, mellow, sweetish taste."
        ],
        imageSrc: "/svg/Monsooned Malabar.svg",
        imageAlt: "Monsooned Malabar",
        label: "Process Specific Specialty Coffee",
        imagePosition: "left",
        bgColor: "#91400E",
        beanPosition: "left",
        variants: [
            { name: "Monsooned Malabar AAA", link: "/products/monsooned-malabar-aaa" },
            { name: "Monsooned Malabar AA", link: "/products/monsooned-malabar-aa" },
            { name: "Monsooned Malabar A", link: "/products/monsooned-malabar-a" },
            { name: "Monsooned Malabar Arabica Triage", link: "/products/monsooned-malabar-arabica-triage" }
        ]
    }
];

const CoffeeCard = ({ coffee, index }: { coffee: SpecialtyCoffeeItem; index: number }) => {
    const isImageLeft = coffee.imagePosition === "left";

    const CardContent = () => (
        <motion.div
            className="relative overflow-hidden shadow-xl transition-transform hover:scale-[1.01] duration-300"
            style={{ backgroundColor: coffee.bgColor || '#7a3b0e' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>
                {/* Image Section */}
                <div className="relative lg:w-[350px] flex-shrink-0 p-6 lg:p-8 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-[250px] aspect-[5/7] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={coffee.imageSrc}
                            alt={coffee.imageAlt}
                            fill
                            className="object-cover"
                            sizes="320px"
                        />
                    </div>
                    <p
                        className="text-sm font-medium mt-4 text-center"
                        style={{ color: coffee.labelColor || '#EEBA6C' }}
                    >
                        {coffee.label}
                    </p>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    <h3
                        className="text-2xl lg:text-5xl font-bold mb-3"
                        style={{ color: coffee.textColor || 'white' }}
                    >
                        {coffee.title}
                    </h3>
                    <p
                        className="italic text-base lg:text-lg mb-4 font-medium"
                        style={{ color: coffee.textColor || 'rgba(255, 255, 255, 0.9)' }}
                    >
                        {coffee.subtitle}
                    </p>
                    {coffee.description.map((para, i) => (
                        <p
                            key={i}
                            className="text-sm lg:text-lg leading-relaxed mb-4 last:mb-0"
                            style={{ color: coffee.descriptionColor || 'rgba(255, 255, 255, 0.8)' }}
                        >
                            {para}
                        </p>
                    ))}

                    {/* Variants Links */}
                    {coffee.variants && (
                        <div className="mt-6 flex flex-nowrap gap-3 overflow-x-auto">
                            {coffee.variants.map((variant, i) => (
                                <Link
                                    key={i}
                                    href={variant.link}
                                    className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full transition-colors backdrop-blur-sm border border-white/10 whitespace-nowrap"
                                >
                                    {variant.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Decorative Coffee Bean */}
                <div
                    className={`hidden lg:block absolute ${coffee.beanPosition === "left"
                        ? "left-4 lg:left-6 -bottom-4 lg:-bottom-16"
                        : "right-4 lg:right-10 -bottom-4 lg:-bottom-14"
                        }`}
                >
                    <Image
                        src="/coffee-beans/Coffee Bean unroasted Image.png"
                        alt="Green Coffee Bean"
                        width={240}
                        height={240}
                        className="opacity-80"
                    />
                </div>
            </div>
        </motion.div>
    );

    if (coffee.variants) {
        return <CardContent />;
    }

    return (
        <Link href={coffee.link || "#"} className="block">
            <CardContent />
        </Link>
    );
};

export default function SpecialtyCoffee() {
    return (
        <section className="py-16 md:py-24 bg-white border-b-2">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-coffee-brown mb-4">
                        Specialty Coffees of India
                    </h2>
                    <p className="text-black font-semibold text-base md:text-lg max-w-6xl mx-auto leading-relaxed">
                        There are three specialty coffees of India, but scores do not have any implication on these three Indian specialty coffees.
                    </p>
                    <ol className="mt-4 text-coffee-brown font-bold italic text-base max-w-xl mx-auto space-y-1 list-decimal list-inside text-left">
                        <li>Mysore Nuggets Extra Bold - Its a Grade Specific Speciality Coffee</li>
                        <li>Robusta Kaapi Royale - Its a Grade Specific Speciality Coffee</li>
                        <li>Monsooned Malabar - Its a Process  Specific Speciality Coffee</li>
                    </ol>
                </motion.div>

                {/* Specialty Coffee Cards - No gap between sections */}
                <div className="space-y-0">
                    {specialtyCoffees.map((coffee, index) => (
                        <CoffeeCard key={coffee.title} coffee={coffee} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
