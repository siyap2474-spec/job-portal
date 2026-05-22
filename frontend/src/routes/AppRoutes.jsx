import { Routes, Route } from 'react-router-dom';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CandidateDashboard from "../pages/CandidateDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails.jsx";
import SavedJobs from "../pages/SavedJobs";
import MyApplications from "../pages/MyApplications";
import Profile from "../pages/Profile";


function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route
                path="/my-applications"
                element={<MyApplications />}
            />
            <Route path="/profile" element={<Profile />} />


            <Route path='/candidate/dashboard' element={
                <ProtectedRoute>
                    <RoleRoute allowedRole='CANDIDATE'>
                        <CandidateDashboard />
                    </RoleRoute>
                </ProtectedRoute>
            }
            />

            <Route path='/recruiter/dashboard' element={
                <ProtectedRoute>
                    <RoleRoute allowedRole='RECRUITER'>
                        <RecruiterDashboard />
                    </RoleRoute>
                </ProtectedRoute>
            }
            />
        </Routes>
    );
}

export default AppRoutes;
