import React from 'react';
import location from '../../../assets/location-merchant.png';
import bgImage from '../../../assets/be-a-merchant-bg.png';
const BeMarchant = () => {
  return (
     <div 
      className="hero bg-[#03373D] dark:bg-[#03373D] p-6 sm:p-10 md:p-16 lg:p-20 mt-3 rounded-2xl sm:rounded-3xl lg:rounded-4xl relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay to maintain readability - adjusts for light/dark mode */}
      <div className="absolute inset-0 bg-[#03373D] dark:bg-[#03373D] opacity-80 dark:opacity-90"></div>
      
      <div className="hero-content flex-col lg:flex-row-reverse relative z-10 gap-6 lg:gap-8">
        <img
          src={location}
          className="w-full max-w-[400px] h-[180px] sm:max-w-[400px] sm:h-[240px] lg:max-w-[500px] lg:h-[300px] object-cover rounded-lg shadow-2xl"
          alt="Merchant Location"
        />
        <div className="lg:-mr-20 w-full lg:w-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-4 sm:py-6 text-sm sm:text-base text-gray-700 dark:text-gray-200">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-6 py-3 sm:px-8 sm:py-4 btn btn-primary bg-[#CAEB66] hover:bg-[#B8D65C] dark:bg-[#CAEB66] dark:hover:bg-[#B8D65C] rounded-full text-black dark:text-black text-lg sm:text-xl lg:text-2xl transition-colors"
            >
              Become a Merchant
            </button>
            <button className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl lg:text-2xl btn btn-primary btn-outline rounded-full text-[#CAEB66] dark:text-[#CAEB66] border-[#CAEB66] dark:border-[#CAEB66] hover:bg-[#829920] dark:hover:bg-[#829920] hover:text-white dark:hover:text-white transition-colors">
              <span>
                Earn with Parcel Courier
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchant;