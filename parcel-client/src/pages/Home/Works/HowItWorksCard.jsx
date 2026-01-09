const HowItWorksCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="card-body items-center text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
          <Icon />
        </div>

        <h3 className="text-lg font-semibold text-base-content">
          {item.title}
        </h3>

        <p className="text-sm text-base-content/70">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
