import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSavedJobs,
  removeSavedJobThunk,
} from "../features/savedJobs/savedJobsSlice";

import { Link } from "react-router-dom";

function SavedJobs() {

  const dispatch = useDispatch();

  const { savedJobs, loading } = useSelector(
    (state) => state.savedJobs
  );

  // FETCH SAVED JOBS
  useEffect(() => {

    dispatch(fetchSavedJobs());

  }, [dispatch]);

  // REMOVE JOB
  const handleRemove = async (jobId) => {

    try {

      await dispatch(removeSavedJobThunk(jobId)).unwrap();

      alert("Saved job removed");

    } catch (error) {

      alert(error?.message || "Failed");

    }

  };

  if (loading) {

    return <h1 className="p-10 text-2xl">Loading...</h1>;

  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (

        <p>No saved jobs found</p>

      ) : (

        <div className="grid gap-5">

          {savedJobs.map((item) => (

            <div
              key={item._id}
              className="bg-white shadow rounded-2xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {item.job.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.job.company}
              </p>

              <div className="flex gap-4 mt-4 text-gray-600">

                <p>{item.job.location}</p>

                <p>{item.job.jobType}</p>

              </div>

              <p className="text-blue-600 font-semibold mt-4">
                ₹ {item.job.salary}
              </p>

              <div className="flex gap-4 mt-6">

                <Link
                  to={`/jobs/${item.job._id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  View Job
                </Link>

                <button
                  onClick={() => handleRemove(item.job._id)}
                  className="border border-red-500 text-red-500 px-5 py-2 rounded-xl"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default SavedJobs;