const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="card-body items-center text-center">
        <div className="text-primary text-4xl mb-4">
          <Icon />
        </div>

        <h3 className="card-title text-lg font-semibold text-base-content">
          {service.title}
        </h3>

        <p className="text-sm text-base-content/70">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
