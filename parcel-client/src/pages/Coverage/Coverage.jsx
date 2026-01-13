import React, { useState } from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Case-insensitive + partial match
    const matchedCenter = serviceCenters.find(center =>
      center.district.toLowerCase().includes(value.toLowerCase())
    );

    setSelectedCenter(matchedCenter || null);
  };

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        We are available in districts of Bangladesh
      </h1>

      {/* Search Box */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search district (e.g. Dhaka)"
          className="input input-bordered w-full"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Map Section */}
      <CoverageMap
        serviceCenters={serviceCenters}
        selectedCenter={selectedCenter}
      />

    </div>
  );
};

export default Coverage;
