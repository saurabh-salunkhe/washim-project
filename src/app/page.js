// pages/index.js or app/page.js
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturedJobs from '../components/FeaturedJobs';
import TopCompanies from '../components/TopCompanies';
import BrowseOrPost from '../components/BrowseOrPost';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className='pt-16'>
        <HeroSection />
        <StatsSection />
        <FeaturedJobs />
        <TopCompanies />
        <BrowseOrPost/>
        <Footer />
      </main>
    </div>
  );
}