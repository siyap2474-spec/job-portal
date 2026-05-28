import api from "../../services/api";

// GET APPLICANTS FOR A JOB
export const getApplicantsForJob = (jobId) => {
  return api.get(`/applications/job/${jobId}/applicants`);
};

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = (
  applicationId,
  status
) => {
  return api.put(
    `/applications/status/${applicationId}`,
    { status }
  );
};