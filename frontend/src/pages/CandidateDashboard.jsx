import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";



import { getCandidateDashboard } from "../features/dashboard/dashboardAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CandidateDashboard() {
  const [dashboard, setDashboard] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    profileCompleteness: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getCandidateDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
  <>
 <div className="min-h-screen flex flex-col">
  <Navbar />

  <div className="flex-1 flex bg-gray-50 overflow-x-hidden">

      {/* SIDEBAR (DESKTOP ONLY) */}
      <div className="hidden md:block w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-10">
          Skilled
        </h2>

        <ul className="space-y-6 text-lg">
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/saved-jobs">Saved Jobs</Link></li>
          <li><Link to="/my-applications">Applications</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-10">

        {/* HEADER */}
        <h1 className="text-2xl md:text-4xl font-bold mb-8 flex items-center gap-3">
          Welcome Back
          <MdWavingHand className="text-yellow-500" />
        </h1>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg">Applied Jobs</h2>
            <p className="text-3xl md:text-4xl font-bold mt-4 text-blue-600">
              {dashboard.appliedJobs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg">Saved Jobs</h2>
            <p className="text-3xl md:text-4xl font-bold mt-4 text-blue-600">
              {dashboard.savedJobs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg">Profile Completion</h2>
            <p className="text-3xl md:text-4xl font-bold mt-4 text-blue-600">
              {dashboard.profileCompleteness}%
            </p>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </div>
    </>
  );
}

export default CandidateDashboard;