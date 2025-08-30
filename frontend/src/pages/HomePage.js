import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedVehicles from '../components/FeaturedVehicles';
import Services from '../components/Services';
import TrustBadges from '../components/TrustBadges';
import ImpressiveStats from '../components/ImpressiveStats';
import FinanceCalculator from '../components/FinanceCalculator';
import TestDriveScheduler from '../components/TestDriveScheduler';
import CustomSearchForm from '../components/CustomSearchForm';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedVehicles />
      <Services />
      <FinanceCalculator />
      <TestDriveScheduler />
      <CustomSearchForm />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;