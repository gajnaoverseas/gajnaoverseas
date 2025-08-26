
import Hero from '@/components/Hero';
import CoffeeProducts from '@/components/CoffeeProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import EthicalSourcing from '@/components/EthicalSourcing';
import Magazine from '@/components/Magazine';
import SustainableCoffee from '@/components/SustainableCoffee';
import KnowledgeHub from '@/components/KnowledgeHub';
import Newsletter from '@/components/Newsletter';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
     
      <Hero />
      <CoffeeProducts />
      <WhyChooseUs />
      <EthicalSourcing />
      <Magazine />
      <SustainableCoffee />
      <KnowledgeHub />
      <Newsletter />
  
    </main>
  );
}
