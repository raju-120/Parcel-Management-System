import React from 'react';
import CoverageMap from './CoverageMap';

const Coverage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        We are available in districts of Bangladesh
      </h1>

      {/* Map Section */}
      <CoverageMap />

    </div>
  );
};

export default Coverage;
