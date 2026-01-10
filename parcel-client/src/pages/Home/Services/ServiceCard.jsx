const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="
      card shadow-md 
      bg-base-100
      border border-transparent
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:-translate-y-1
      hover:border-brand
      hover:bg-brand
      group
    ">
      <div className="card-body items-center text-center">

        {/* Icon */}
        <div className="
          text-4xl mb-4
          text-base-content
          transition-colors duration-300
          group-hover:text-brand
        ">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="
          card-title text-lg font-semibold
          text-base-content
          transition-colors duration-300
          group-hover:text-brand
        ">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-base-content/70">
          {service.description}
        </p>

      </div>
    </div>
  );
};

export default ServiceCard;