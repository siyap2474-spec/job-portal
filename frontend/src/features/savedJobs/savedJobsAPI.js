import api from "../../services/api";

// Save job
export const saveJob = (jobId) => {
  return api.post(`/saved-jobs/${jobId}`);
};

// Get saved jobs
export const getSavedJobs = () => {
  return api.get(`/saved-jobs`);
};

// Remove saved job
export const removeSavedJob = (jobId) => {
  return api.delete(`/saved-jobs/${jobId}`);
};