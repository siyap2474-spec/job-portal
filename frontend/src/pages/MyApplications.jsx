import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchApplications,
} from "../features/applications/applicationSlice";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyApplications() {

  const dispatch = useDispatch();

  const { applications, loading } = useSelector(
    (state) => state.applications
  );

  // FETCH APPLICATIONS
  useEffect(() => {

    dispatch(fetchApplications());

  }, [dispatch]);

  if (loading) {

    return (
      <h1 className="p-6 md:p-10 text-xl md:text-2xl">
        Loading...
      </h1>
    );

  }

  return (
<>
<Navbar/>
    <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-gray-100">

      {/* HEADING */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10">
        My Applications
      </h1>

      {applications.length === 0 ? (
        
        <p className="text-gray-500 text-base sm:text-lg">
          No applications found
        </p>

) : (
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">

          {applications
            .filter((app) => app.job)
            .map((app) => (
              
              <div
              key={app._id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
              >

                {/* JOB TITLE */}
                <h2 className="text-xl sm:text-2xl font-bold break-words">
                  {app.job.title}
                </h2>

                {/* COMPANY */}
                <p className="text-gray-500 mt-2 text-sm sm:text-base break-words">
                  {app.job.company}
                </p>

                {/* JOB INFO */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5 mt-4 text-gray-600 text-sm sm:text-base">

                  <p>{app.job.location}</p>

                  <p>{app.job.jobType}</p>

                </div>

                {/* SALARY */}
                <p className="text-blue-600 font-semibold mt-4 text-base sm:text-lg">
                  ₹ {app.job.salary}
                </p>

                {/* STATUS + BUTTON */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm sm:text-base w-fit">
                    {app.status}
                  </span>

                  <Link
                    to={`/jobs/${app.job._id}`}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl text-center"
                    >
                    View Job
                  </Link>

                </div>

              </div>

            ))}

        </div>

)}

    </div>

</>
  );
}

export default MyApplications;