import Hero from "@/components/Hero";
import CoffeeProducts from "@/components/CoffeeProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import EthicalSourcing from "@/components/EthicalSourcing";
import CoffeeRegions from "@/components/CoffeeRegions";
import SustainableCoffee from "@/components/SustainableCoffee";
import SpecialtyCoffee from "@/components/SpecialtyCoffee";
import GITaggedCoffees from "@/components/GITaggedCoffees";
import CoffeeGrowingRegions from "@/components/CoffeeGrowingRegions";
import KnowledgeHub from "@/components/KnowledgeHub";
// import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <CoffeeProducts />
      <WhyChooseUs />
      <EthicalSourcing />
      <SustainableCoffee />
      <CoffeeRegions />
       <CoffeeGrowingRegions />
      <SpecialtyCoffee />
      <GITaggedCoffees />
     
      <KnowledgeHub />
      {/* <Newsletter /> */}
    </main>
  );
}
