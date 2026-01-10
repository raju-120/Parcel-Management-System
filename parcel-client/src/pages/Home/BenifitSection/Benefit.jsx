import { BenefitData, FeatureCard } from "./BenifitSectionData";

const Benefit = () => {
  return (
    <section className="py-16 bg-base-200 mt-3 rounded-2xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-12">
          Our Key Benefits
        </h2>

        {/* Stack cards vertically */}
        <div className="flex flex-col gap-6">
          {BenefitData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefit;
