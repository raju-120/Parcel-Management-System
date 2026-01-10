import Marquee from "react-fast-marquee";

// Import logos
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/star.png";
import logo7 from "../../../assets/brands/start_people.png";
import logo8 from "../../../assets/brands/google.png";

const ClientLogosSection = () => {
  const logos = [
    { id: 1, src: logo1, alt: "Amazon" },
    { id: 2, src: logo2, alt: "Amazon-Vector" },
    { id: 3, src: logo3, alt: "Casio" },
    { id: 4, src: logo4, alt: "Moonster" },
    { id: 5, src: logo5, alt: "Randstad" },
    { id: 6, src: logo6, alt: "Star" },
    { id: 7, src: logo7, alt: "Start_People" },
    { id: 8, src: logo8, alt: "Google" },
  ];

  return (
    <section className="py-16 bg-base-200 mt-2 rounded-2xl">
      <div className="container mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-10">
          Trusted by Our Clients
        </h2>

        {/* Marquee */}
        <Marquee
          speed={50}
          direction="left"
          pauseOnHover
          gradient={false}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="mx-[100px] flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="
                  h-16
                  object-contain
                  grayscale opacity-70
                  transition-all duration-300
                  hover:grayscale-0 hover:opacity-100
                "
              />
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
};

export default ClientLogosSection;
