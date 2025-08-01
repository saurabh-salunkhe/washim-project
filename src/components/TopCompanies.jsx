// components/TopCompanies.js
import React from 'react';

const TopCompanies = () => {
  const companies = [
    {
      name: 'TechCorp',
      openPositions: 12,
      logo: '💻', // Tech emoji for a software company
    },
    {
      name: 'InnovateLab',
      openPositions: 8,
      logo: '🧪', // Lab/experiment emoji for innovation
    },
    {
      name: 'DesignStudio',
      openPositions: 6,
      logo: '🎨', // Art palette for design
    },
    {
      name: 'DataTech',
      openPositions: 15,
      logo: '📊', // Chart emoji for data analysis
    }
  ];

  return (
    <section className="bg-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Companies Hiring
          </h2>
          <p className="text-xl text-gray-600">
            Join industry leaders and innovative startups
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg px-4 py-6 text-center hover:shadow-md transition-shadow w-52 max-w-xs mx-auto"
            >
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-white font-bold text-4xl">{company.logo}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {company.openPositions} open positions
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;