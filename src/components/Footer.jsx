import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-14">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center mr-3">
                <span className="font-bold text-sm">SS</span>
              </div>
              <h3 className="text-white text-xl font-semibold">SkillSync</h3>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Connecting talent with opportunity, one perfect match at a time.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Career Advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Resume Builder</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Salary Guide</a></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Post Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Find Candidates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Enterprise</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-base">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-base">
            © 2024 SkillSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;