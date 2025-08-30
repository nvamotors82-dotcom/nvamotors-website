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
import SpecialOffers from '../components/SpecialOffers';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <FeaturedVehicles />
      <ImpressiveStats />
      <Services />
      <FinanceCalculator />
      <TestDriveScheduler />
      <SpecialOffers />
      <CustomSearchForm />
      <EnhancedTestimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;