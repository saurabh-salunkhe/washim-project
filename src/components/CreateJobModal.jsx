
'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateJobModal({ isOpen, onClose, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: '',
    experience_level: '',
    description: '',
    requirements: '',
    status: 'active'
  });

  const [skillInput, setSkillInput] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const currentRequirements = formData.requirements || '';
      const skillsArray = currentRequirements ? currentRequirements.split(', ') : [];
      
      if (!skillsArray.includes(skillInput.trim())) {
        const updatedSkills = [...skillsArray, skillInput.trim()];
        setFormData(prev => ({
          ...prev,
          requirements: updatedSkills.join(', ')
        }));
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const skillsArray = formData.requirements ? formData.requirements.split(', ') : [];
    const updatedSkills = skillsArray.filter(skill => skill !== skillToRemove);
    setFormData(prev => ({
      ...prev,
      requirements: updatedSkills.join(', ')
    }));
  };

  const getSkillsArray = () => {
    return formData.requirements ? formData.requirements.split(', ').filter(skill => skill.trim()) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for backend
    const jobData = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
      salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
      job_type: formData.job_type,
      experience_level: formData.experience_level || null,
      description: formData.description,
      status: formData.status,
      ...(formData.requirements.trim() && { requirements: formData.requirements })
    };
    
    onSubmit(jobData);
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      salary_min: '',
      salary_max: '',
      job_type: '',
      experience_level: '',
      description: '',
      requirements: '',
      status: 'active',
    });
    setSkillInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Create New Job Posting</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Tech Innovators Ltd."
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                placeholder="e.g., Remote / Bengaluru, India"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                value={formData.job_type}
                onChange={(e) => handleInputChange('job_type', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Job Type</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={formData.experience_level}
                onChange={(e) => handleInputChange('experience_level', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Experience Level</option>
                <option value="Entry">Entry Level (0-2 years)</option>
                <option value="Mid">Mid Level (3-5 years)</option>
                <option value="Senior">Senior Level (6+ years)</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Minimum salary"
                    value={formData.salary_min}
                    onChange={(e) => handleInputChange('salary_min', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Maximum salary"
                    value={formData.salary_max}
                    onChange={(e) => handleInputChange('salary_max', e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter amounts in your local currency (e.g., 1000000 for ₹10,00,000 or 80000 for $80k)</p>
            </div>

            {/* Requirements/Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements & Skills
              </label>
              <input
                type="text"
                placeholder="Type a requirement/skill and press Enter (e.g., React, Node.js, etc.)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getSkillsArray().length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSkillsArray().map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">This will be stored as a comma-separated string</p>
            </div>

            {/* Job Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                placeholder="Describe the job responsibilities, requirements, and company culture..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <span>Post Job</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}