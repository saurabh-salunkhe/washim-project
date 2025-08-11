// src/components/CandidateFilters.js
'use client';
import { useState } from 'react';

export default function CandidateFilters() {
  const [filters, setFilters] = useState({
    skills: '',
    location: '',
    experience: ''
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    // Add your filter logic here
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Candidate Filters</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              placeholder="Add required skills..."
              value={filters.skills}
              onChange={(e) => handleFilterChange('skills', e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Location</option>
              <option value="remote">Remote</option>
              <option value="new-york">New York, NY</option>
              <option value="san-francisco">San Francisco, CA</option>
              <option value="austin">Austin, TX</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select 
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6+ years)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={handleApplyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}