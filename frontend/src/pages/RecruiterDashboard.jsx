import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRecruiterDashboard } from "../features/dashboard/dashboardAPI";
import Navbar from "../components/Navbar";

function RecruiterDashboard() {

  const [dashboard, setDashboard] = useState({
    jobsPosted: 0,
    totalApplicants: 0,
    statusBreakdown: {
      pending: 0,
      shortlisted: 0,
      accepted: 0,
      rejected: 0,
    },
  });

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await getRecruiterDashboard();

        setDashboard(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  return (
<>
<Navbar/>
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block md:w-64 bg-white shadow-lg p-6">

        <h1 className="text-3xl font-bold text-blue-600 mb-10">
          Skilled
        </h1>

        <ul className="space-y-6 text-lg">

          <li className="text-blue-600 font-semibold">
            Dashboard
          </li>

          <li>
            <Link
              to="/recruiter/jobs"
              className="hover:text-blue-600 transition"
              >
              My Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/find-candidates"
              className="hover:text-blue-600 transition"
              >
              Candidates
            </Link>
          </li>

          <li>
            <Link
              to="/create-job"
              className="hover:text-blue-600 transition"
              >
              Create Job
            </Link>
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 sm:p-6 md:p-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Recruiter Dashboard
          </h1>

          <Link
            to="/create-job"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl text-center w-full sm:w-auto"
            >
            Create Job
          </Link>

        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg text-gray-600">
              Jobs Posted
            </h2>

            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mt-4">
              {dashboard.jobsPosted}
            </p>

          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg text-gray-600">
              Total Applicants
            </h2>

            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mt-4">
              {dashboard.totalApplicants}
            </p>

          </div>

        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg">
              Pending
            </h2>

            <p className="text-3xl md:text-4xl font-bold mt-4 text-yellow-500">
              {dashboard.statusBreakdown.pending}
            </p>

          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg">
              Shortlisted
            </h2>

            <p className="text-3xl md:text-4xl font-bold mt-4 text-blue-500">
              {dashboard.statusBreakdown.shortlisted}
            </p>

          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg">
              Accepted
            </h2>

            <p className="text-3xl md:text-4xl font-bold mt-4 text-green-500">
              {dashboard.statusBreakdown.accepted}
            </p>

          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition">

            <h2 className="text-lg">
              Rejected
            </h2>

            <p className="text-3xl md:text-4xl font-bold mt-4 text-red-500">
              {dashboard.statusBreakdown.rejected}
            </p>

          </div>

        </div>

      </div>

    </div>
            </>

  );
}

export default RecruiterDashboard;