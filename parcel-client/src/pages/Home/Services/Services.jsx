import React from 'react';
import { servicesData } from './ServicesData';
import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <div>
      <section className="py-16 bg-base-200 mt-3 rounded-2xl">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Services"
            subtitle="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;