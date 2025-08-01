// components/Footer.js
import React from 'react';

const BrowseOrPost = () => {
  return (
    <section className="bg-blue-600 text-white  pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream careers through SkillSync
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Browse Jobs
            </button>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Post a Jobs
            </button>
          </div>
        </div>
        
        {/* <div className="border-t border-blue-500 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold">SkillSync</span>
          </div>
          <p className="text-blue-100">
            © 2024 SkillSync. All rights reserved.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default BrowseOrPost;