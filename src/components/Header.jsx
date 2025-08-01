// components/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SkillSync</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Jobs
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Companies
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Candidates
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
              Resources
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
              Sign Up
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
