import HowItWorksCard from "./HowItWorksCard";
import { howItWorksData } from "./HowItWorksData";
import HowItWorksHeader from "./HowItWorksHeader";

const Works= () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <HowItWorksHeader
          title="How It Works"
          subtitle="Simple, fast, and reliable steps to deliver your parcels effortlessly."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksData.map((item, index) => (
            <HowItWorksCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
