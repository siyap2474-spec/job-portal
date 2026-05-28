import api from "../../services/api";

export const getCandidateDashboard = () =>
  api.get("/dashboard/candidate");

export const getRecruiterDashboard = () => {
  return api.get("/dashboard/recruiter");
};