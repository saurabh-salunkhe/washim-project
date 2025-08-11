// src/app/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import RecentJobPostingCard from '@/components/RecentJobPostingCard';
import CandidateFilters from '@/components/CandidateFilters';
import CreateJobModal from '@/components/CreateJobModal';
import ApiService from '@/services/apiService';

const recentJobPostings = [
  {
    id: 1,
    title: 'Senior Product Manager',
    company: 'Zoom Video Communications',
    salary: '$120,000 - $180,000',
    status: 'Active',
    type: 'Full-time',
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'Tech Corp',
    salary: '$80,000 - $120,000',
    status: 'Active',
    type: 'Full-time',
    postedDate: '5 days ago'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Inc',
    salary: '$110,000 - $160,000',
    status: 'Active',
    type: 'Full-time',
    postedDate: '1 week ago'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    salary: '$100,000 - $150,000',
    status: 'Draft',
    type: 'Remote',
    postedDate: '3 days ago'
  }
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);

  // Fetch job posts on component mount
  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      setLoading(true);
      const posts = await ApiService.getAllJobPosts();
      
      // Transform backend data to frontend format
      const transformedPosts = posts.map(post => ({
        id: post.id,
        title: post.title,
        company: post.company,
        salary: post.salary_min && post.salary_max 
          ? `₹${post.salary_min.toLocaleString()} - ₹${post.salary_max.toLocaleString()}`
          : 'Salary not specified',
        status: post.status.charAt(0).toUpperCase() + post.status.slice(1),
        type: post.job_type,
        postedDate: formatPostedDate(post.posted_date),
        location: post.location,
        description: post.description,
        requirements: post.requirements,
        experience_level: post.experience_level
      }));
      
      setJobPostings(transformedPosts);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch job posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPostedDate = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleCreateJob = async (jobData) => {
    try {
      setCreateLoading(true);
      
      // Add recruiter_id - you should get this from user context/auth
      const jobWithRecruiter = {
        ...jobData,
        recruiter_id: localStorage.getItem("user_id") 
      };
      
      const newJobPost = await ApiService.createJobPost(jobWithRecruiter);
      
      // Transform the new post to frontend format and add to list
      const transformedPost = {
        id: newJobPost.id,
        title: newJobPost.title,
        company: newJobPost.company,
        salary: newJobPost.salary_min && newJobPost.salary_max 
          ? `₹${newJobPost.salary_min.toLocaleString()} - ₹${newJobPost.salary_max.toLocaleString()}`
          : 'Salary not specified',
        status: newJobPost.status.charAt(0).toUpperCase() + newJobPost.status.slice(1),
        type: newJobPost.job_type,
        postedDate: 'Just now',
        location: newJobPost.location,
        description: newJobPost.description,
        requirements: newJobPost.requirements,
        experience_level: newJobPost.experience_level
      };
      
      setJobPostings(prev => [transformedPost, ...prev]);
      
      // Show success message (you can add a toast notification here)
      console.log('Job post created successfully:', newJobPost);
      
    } catch (err) {
      console.error('Error creating job post:', err);
      setError(err.message);
      // You can add error toast notification here
    } finally {
      setCreateLoading(false);
    }
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={createLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
        >
          {createLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </>
          ) : (
            <span>Create New Job Posting</span>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Job Postings"
          description="Currently open job listings"
          value={jobPostings.filter(job => job.status.toLowerCase() === 'active').length.toString()}
          color="blue"
        />
        <StatCard
          title="Total Job Posts"
          description="All job posts created"
          value={jobPostings.length.toString()}
          color="green"
        />
        <StatCard
          title="Draft Posts"
          description="Posts in draft status"
          value={jobPostings.filter(job => job.status.toLowerCase() === 'draft').length.toString()}
          color="purple"
        />
      </div>

      {/* Recent Job Postings and Candidate Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Job Postings - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Recent Job Postings</h2>
              <button 
                onClick={fetchJobPosts}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Refresh
              </button>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2 text-gray-600">Loading job posts...</span>
                </div>
              ) : jobPostings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No job posts found. Create your first job posting!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobPostings.map((job) => (
                    <RecentJobPostingCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Candidate Filters - Takes 1/3 of the width */}
        <div className="lg:col-span-1">
          <CandidateFilters />
        </div>
      </div>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
        loading={createLoading}
      />
    </div>
  );
}