import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Works from '../Works/Works';
import ClientLogosSection from '../ClientLogosSection/ClientLogosSection';
import Benefit from '../BenifitSection/Benefit';
import BeMarchant from '../BeMarchnat/BeMarchant';

const Home = () => {
  return (
    <div>
      <Banner />
      <Works />
      <Services />
      <ClientLogosSection />
      <Benefit />
      <BeMarchant />
    </div>
  );
};

export default Home;