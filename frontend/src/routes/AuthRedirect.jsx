import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRedirect() {

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  //  Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Recruiter login
  if (user?.role === "RECRUITER") {
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  //  Candidate login
  if (user?.role === "CANDIDATE") {
    return <Navigate to="/candidate/dashboard" replace />;
  }

  // fallback
  return <Navigate to="/login" replace />;
}

export default AuthRedirect;