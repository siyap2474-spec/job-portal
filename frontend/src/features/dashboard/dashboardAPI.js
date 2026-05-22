import api from "../../services/api";

export const getCandidateDashboard = () =>
  api.get("/dashboard/candidate");