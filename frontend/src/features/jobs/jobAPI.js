import api from '../../services/api';

//get all jobs
export const getAllJobs = (params) => 
    api.get("/jobs", { params } );

//create job
export const createJob = (jobData) => {
    return api.post("/jobs/create-job", jobData);
};

// GET RECRUITER JOBS
export const getRecruiterJobs = () => {
  return api.get("/jobs/recruiter/my-jobs");
};

// DELETE JOB
export const deleteJob = (jobId) => {
  return api.delete(`/jobs/${jobId}`);
};