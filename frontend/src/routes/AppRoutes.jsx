import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CandidateDashboard from "../pages/CandidateDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";

import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails.jsx";
import SavedJobs from "../pages/SavedJobs";
import MyApplications from "../pages/MyApplications";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

import CreateJob from "../pages/CreateJob";
import RecruiterApplicants from "../pages/RecruiterApplicants";
import RecruiterJobs from "../pages/RecruiterJobs";
import EditJob from "../pages/EditJob";
import FindCandidates from "../pages/FindCandidates";
import CandidateDetails from "../pages/CandidateDetails";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AuthRedirect from "./AuthRedirect";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= DEFAULT ROUTE ================= */}
      <Route path="/" element={<AuthRedirect />} />

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= COMMON PROTECTED ROUTE ================= */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* ================= CANDIDATE ROUTES ================= */}

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <Jobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <SavedJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <MyApplications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <Profile />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <Notifications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="CANDIDATE">
              <CandidateDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= RECRUITER ROUTES ================= */}

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <RecruiterDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <CreateJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <RecruiterJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/applicants/:jobId"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <RecruiterApplicants />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/edit-job/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <EditJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/find-candidates"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <FindCandidates />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/candidate/:id"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="RECRUITER">
              <CandidateDetails />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;