// import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import Illustration from "../../../assets/Illustration1.png"
import Vector2 from "../../../assets/Vector2.png"
// ---------------------------
// Feature Data
// ---------------------------
export const BenefitData = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: Illustration,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image:Vector2,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image:Vector2,
  },
];

// ---------------------------
// Feature Card Component
// ---------------------------
export const FeatureCard = ({ feature }) => {
  return (
    <div className="flex flex-row items-center bg-base-100 p-16 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      {/* Left: Image */}
      <div className="flex-shrink-0 mr-6">
        <img
          src={feature.image}
          alt={feature.title}
          className="h-36 w-96 object-contain"
        />
      </div>
      <div className="divider divider-horizontal"></div>
      {/* Right: Title + Description */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-base-content mb-1">
          {feature.title}
        </h3>
        <p className="text-lg text-base-content/70">{feature.description}</p>
      </div>
    </div>
  );
};