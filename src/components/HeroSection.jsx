// components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Find Your Perfect{' '}
          <br /><span className="text-blue-600">Career Match</span>
        </h1>
        <p className="text-xl text-gray-600 mb-1 max-w-2xl mx-auto">
          Connect with top companies and discover opportunities that align with your skills and aspirations.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;