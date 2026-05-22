import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";

import { getCandidateDashboard } from '../features/dashboard/dashboardAPI';

function CandidateDashboard() {

  const [dashboard, setDashboard] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    profileCompleteness: 0
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

    <div className='min-h-screen flex bg-white'>

      {/* SIDEBAR */}
      <div className='w-64 bg-white shadow-lg p-6'>

        <h2 className='text-2xl font-bold text-blue-600 mb-10'>
          Skilled
        </h2>

        <ul className='space-y-6 text-lg'>

          <li>
            <Link
              to="/candidate/dashboard"
              className='text-blue-600 font-semibold'
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/jobs">
              Jobs
            </Link>
          </li>

          <li>
            <Link to="/saved-jobs">
              Saved Jobs
            </Link>
          </li>

          <li>
            <Link to="/my-applications">
              Applications
            </Link>
          </li>

          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/notifications">
              Notifications
            </Link>
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className='flex-1 p-10 bg-gray-50'>

        <h1 className='text-4xl font-bold mb-10 flex items-center gap-3'>
          Welcome Back
          <MdWavingHand className='text-yellow-500' />
        </h1>

        <div className='grid grid-cols-3 gap-6'>

          {/* APPLIED JOBS */}
          <div className='bg-white p-6 rounded-2xl shadow'>

            <h2 className='text-lg'>
              Applied Jobs
            </h2>

            <p className='text-4xl font-bold mt-4 text-blue-600'>
              {dashboard.appliedJobs}
            </p>

          </div>

          {/* SAVED JOBS */}
          <div className='bg-white p-6 rounded-2xl shadow'>

            <h2 className='text-lg'>
              Saved Jobs
            </h2>

            <p className='text-4xl font-bold mt-4 text-blue-600'>
              {dashboard.savedJobs}
            </p>

          </div>

          {/* PROFILE */}
          <div className='bg-white p-6 rounded-2xl shadow'>

            <h2 className='text-lg'>
              Profile Completion
            </h2>

            <p className='text-4xl font-bold mt-4 text-blue-600'>
              {dashboard.profileCompleteness}%
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default CandidateDashboard;