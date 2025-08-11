// src/components/DashboardHeader.js
import { Search, Bell, Upload, User, Briefcase } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white text-blue-600 p-2 rounded">
            <Briefcase size={24} />
          </div>
          <span className="text-xl font-bold">JobSeeker</span>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Upload size={16} />
            <span>Upload Resume</span>
          </button>
          <Bell size={20} className="cursor-pointer hover:text-blue-200" />
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer">
            <User size={16} />
          </div>
          <span className="text-sm">Alex Morgan</span>
        </div>
      </div>
    </header>
  );
}