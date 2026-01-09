const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-base-content">
        {title}
      </h2>
      <p className="mt-4 text-base text-base-content/70">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
