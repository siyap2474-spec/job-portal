import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import savedJobsReducer from "../features/savedJobs/savedJobsSlice";
import applicationReducer from "../features/applications/applicationSlice";
import profileReducer from "../features/profile/profileSlice";
import notificationReducer from "../features/notifications/notificationSlice";

import jobsReducer from "../features/jobs/jobSlice";
import recruiterReducer
from "../features/recruiter/recruiterSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        savedJobs: savedJobsReducer,
        applications: applicationReducer,
        profile: profileReducer,
        notifications: notificationReducer,
        jobs: jobsReducer,
        recruiter: recruiterReducer
    }
});