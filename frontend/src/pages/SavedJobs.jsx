import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSavedJobs,
  removeSavedJobThunk,
} from "../features/savedJobs/savedJobsSlice";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

    return (
      <h1 className="p-6 md:p-10 text-xl md:text-2xl">
        Loading...
      </h1>
    );

  }

  return (
<>
<div className="min-h-screen flex flex-col">

<Navbar/>
<div className="flex">

</div>
    <div className="p-4 sm:p-6 md:p-10">

      {/* HEADING */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
        Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        
        <p className="text-gray-500 text-base sm:text-lg">
          No saved jobs found
        </p>

) : (
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {savedJobs.map((item) => (
            
            <div
            key={item._id}
              className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-2xl p-4 sm:p-6 border border-gray-100"
              >

              {/* TITLE */}
              <h2 className="text-xl sm:text-2xl font-bold break-words">
                {item.job.title}
              </h2>

              {/* COMPANY */}
              <p className="text-gray-500 mt-2 text-sm sm:text-base break-words">
                {item.job.company}
              </p>

              {/* LOCATION + TYPE */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4 text-gray-600 text-sm sm:text-base">

                <p>{item.job.location}</p>

                <p>{item.job.jobType}</p>

              </div>

              {/* SALARY */}
              <p className="text-blue-600 font-semibold mt-4 text-base sm:text-lg">
                ₹ {item.job.salary}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">

                <Link
                  to={`/jobs/${item.job._id}`}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl text-center"
                  >
                  View Job
                </Link>

                <button
                  onClick={() => handleRemove(item.job._id)}
                  className="border border-red-500 text-red-500 hover:bg-red-50 transition px-5 py-2.5 rounded-xl"
                  >
                  Remove
                </button>

              </div>

            </div>

))}

        </div>

)}

    </div>
    <Footer/>
    </div>

</>

  );
}

export default SavedJobs;