import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedVehicles from '../components/FeaturedVehicles';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedVehicles />
      <Services />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;