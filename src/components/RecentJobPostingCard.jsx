// src/components/RecentJobPostingCard.js
import { Eye } from 'lucide-react';

export default function RecentJobPostingCard({ job }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.company}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-500">Salary: {job.salary}</span>
          <span className="text-sm text-gray-500">Type: {job.type}</span>
          <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {job.status}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-1">
          <Eye size={16} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}