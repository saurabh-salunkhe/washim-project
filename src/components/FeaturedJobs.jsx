import React from 'react';
import { MapPin, Building, DollarSign, Clock, ArrowRight } from 'lucide-react';

const JobCards = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      featured: true,
      tags: ['React', 'TypeScript', 'Node.js'],
      timeAgo: '2 days ago'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateLab',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$100k - $130k',
      featured: true,
      tags: ['Product Strategy', 'Analytics', 'Agile'],
      timeAgo: '1 day ago'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $100k',
      featured: false,
      tags: ['Figma', 'User Research', 'Prototyping'],
      timeAgo: '3 days ago'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'DataTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110k - $140k',
      featured: false,
      tags: ['Python', 'Machine Learning', 'SQL'],
      timeAgo: '1 day ago'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Discover hand-picked jobs from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg  hover:shadow-xl transition-shadow duration-200">
              {/* Header with Featured Badge and Job Type */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {job.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </span>
                  )}
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  
                </div>
              </div>

              {/* Job Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>

              {/* Company */}
              <div className="flex items-center text-gray-600 mb-3">
                <Building className="w-4 h-4 mr-2" />
                <span className="font-medium">{job.company}</span>
              </div>

              {/* Location and Salary */}
              <div className="flex items-center justify-between text-gray-600 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-semibold">{job.salary}</span>
                </div>
              </div>

              {/* Skills/Tags and Time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-xs text-gray-500 ml-4">
                  <Clock className="w-3 h-3 mr-1" />
                  {job.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </div>

       <div className="text-center">
  <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium border border-blue-600 hover:border-blue-700 px-6 py-2 rounded-md transition-colors bg-purple-100/40 hover:bg-purple-200/60 cursor-pointer">
    View All Jobs
    <ArrowRight size={20} />
  </button>
</div>


      </div>
    </section>
  );
};

export default JobCards;