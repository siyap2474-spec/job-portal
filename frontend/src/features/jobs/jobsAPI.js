import api from '../../services/api';
export const getAllJobs = (params) => 
    api.get("/jobs", { params } );