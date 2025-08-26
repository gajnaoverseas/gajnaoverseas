// Benefits data for the WhyChooseUs component

export interface BenefitCard {
  title: string;
  description: string;
  image: string;
}

const benefitsData: BenefitCard[] = [
  {
    title: "Indian Green Coffee, Selected for Roasters",
    description: "Traceable lots from India’s key coffee-growing regions, chosen for quality, consistency, and roastability exactly what modern roasters demand.",
    image: "/cards/1.webp"
  },
  {
    title: "Grade-Specific Lots, Export-Ready",
    description: "Every shipment is sorted, graded, and prepared to meet international specs whether you're sourcing for blends, single-origin roasts, or bulk contracts.",
    image: "/cards/2.webp"
  },
  {
    title: "Efficient Packing, Documentation & Port Handling",
    description: "From bagging to paperwork, our export operations are designed for speed, accuracy, and hassle-free clearance so your coffee arrives right, every time.",
    image: "/cards/3.webp"
  }
];

export default benefitsData;