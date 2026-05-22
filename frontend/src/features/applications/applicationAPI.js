import api from "../../services/api";

// APPLY FOR JOB
export const applyForJob = (jobId) => {
  return api.post(`/applications/apply/${jobId}`);
};

// GET MY APPLICATIONS
export const getMyApplications = () => {
  return api.get("/applications/my-applications");
};