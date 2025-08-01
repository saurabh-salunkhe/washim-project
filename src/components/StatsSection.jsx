// components/StatsSection.js
import React from 'react';
import {
  Briefcase,
  Building2,
  Users,
  TrendingUp
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      number: '2,500+',
      label: 'Active Jobs'
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      number: '500+',
      label: 'Companies'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      number: '10K+',
      label: 'Candidates'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      number: '92%',
      label: 'Success Rate'
    }
  ];

  return (
    <section className="bg-gray-50 pt-1 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
