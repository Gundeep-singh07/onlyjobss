import axios from "axios";

// Create API instance
const API_URL = "http://localhost:3004/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if you're using cookies for authentication
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  registerJobSeeker: (userData) =>
    api.post("/auth/register/job-seeker", userData),
  registerJobProvider: (userData) =>
    api.post("/auth/register/job-provider", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getCurrentUser: () => api.get("/auth/me"),
};

// Job Seeker API endpoints
export const jobSeekerAPI = {
  getProfile: () => api.get("/job-seekers/profile"),
  updateProfile: (userData) => api.put("/job-seekers/profile", userData),
  getAllJobs: () => api.get("/job-seekers/jobs"),
  applyForJob: (jobId) => api.post(`/job-seekers/jobs/${jobId}/apply`),
  getApplications: () => api.get("/job-seekers/applications"),
};

// Job Provider API endpoints
export const jobProviderAPI = {
  getProfile: () => api.get("/job-providers/profile"),
  updateProfile: (userData) => api.put("/job-providers/profile", userData),
  createJobPosting: (jobData) => api.post("/job-providers/jobs", jobData),
  getJobPostings: () => api.get("/job-providers/jobs"),
  updateJobPosting: (jobId, jobData) =>
    api.put(`/job-providers/jobs/${jobId}`, jobData),
  deleteJobPosting: (jobId) => api.delete(`/job-providers/jobs/${jobId}`),
  getJobApplicants: (jobId) =>
    api.get(`/job-providers/jobs/${jobId}/applicants`),
  updateApplicantStatus: (jobId, applicantId, status) =>
    api.put(`/job-providers/jobs/${jobId}/applicants/${applicantId}`, {
      status,
    }),
};

export default api;
