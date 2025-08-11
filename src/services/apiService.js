// src/services/apiService.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


class ApiService {
  async createJobPost(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create job post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating job post:', error);
      throw error;
    }
  }

 async getAllJobPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs/get-all-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();  // read as plain text
    console.log('Raw response:', text);

    try {
      return JSON.parse(text);  // attempt to parse it
    } catch (jsonErr) {
      console.error('Not valid JSON, got HTML or error page instead.');
      throw jsonErr;
    }

  } catch (error) {
    console.error('Error fetching job posts:', error);
    throw error;
  }
}


  async getJobPostById(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/job-post/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch job post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching job post:', error);
      throw error;
    }
  }

  async updateJobPost(jobId, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/job-post/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update job post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating job post:', error);
      throw error;
    }
  }
}

export default new ApiService();