import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchRecruiterJobs,
  deleteJobThunk,
} from "../features/jobs/jobSlice";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function RecruiterJobs() {

  const [deleteJobId, setDeleteJobId] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { jobs, loading } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {

    dispatch(fetchRecruiterJobs());

  }, [dispatch]);

  const confirmDelete = () => {

    dispatch(deleteJobThunk(deleteJobId));

    setDeleteJobId(null);

  };

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      {/* PAGE TITLE */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10">
        My Jobs
      </h1>

      {/* JOB LIST */}
      <div className="grid gap-5 md:gap-6">

        {jobs.map((job) => (
          
          <div
          key={job._id}
          className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition"
          >

            {/* JOB INFO */}
            <h2 className="text-xl sm:text-2xl font-bold break-words">
              {job.title}
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base break-words">
              {job.company}
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-700">
              {job.location}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">

              <button
                onClick={() =>
                  navigate(`/recruiter/edit-job/${job._id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                Edit
              </button>

              <button
                onClick={() => setDeleteJobId(job._id)}
                className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                Delete
              </button>

              <button
                onClick={() =>
                  navigate(`/recruiter/applicants/${job._id}`)
                }
                className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                Applicants
              </button>

            </div>

          </div>

))}

      </div>

      {/* DELETE MODAL */}
      {deleteJobId && (
        
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Delete Job
            </h2>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Are you sure you want to delete this job?
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">

              <button
                onClick={() => setDeleteJobId(null)}
                className="px-5 py-3 rounded-xl border w-full sm:w-auto"
                >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                Delete
              </button>

            </div>

          </div>

        </div>

)}

    </div>

</>
  );

}

export default RecruiterJobs;