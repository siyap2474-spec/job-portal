import { useEffect } from "react";

import { useParams } from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchApplicantsThunk,
  updateStatusThunk
} from "../features/recruiter/recruiterSlice";

function RecruiterApplicants() {

  const dispatch = useDispatch();

  const { jobId } = useParams();

  const { applicants, loading } =
    useSelector((state) => state.recruiter);

  // FETCH APPLICANTS
  useEffect(() => {

    dispatch(
      fetchApplicantsThunk(jobId)
    );

  }, [dispatch, jobId]);

  // UPDATE STATUS
  const handleStatusUpdate = (
    applicationId,
    status
  ) => {

    dispatch(
      updateStatusThunk({
        applicationId,
        status
      })
    );

  };

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      {/* PAGE TITLE */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
        Recruiter Applicants
      </h1>

      {/* APPLICANTS */}
      <div className="space-y-5 md:space-y-6">

        {loading ? (

          <p className="text-lg">
            Loading...
          </p>

        ) : applicants.length === 0 ? (

          <p className="text-lg">
            No applicants found
          </p>

        ) : (

          applicants.map((app) => (

            <div
              key={app._id}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-xl transition"
            >

              {/* APPLICANT INFO */}
              <h2 className="text-xl sm:text-2xl font-bold break-words">
                {app.applicant.name}
              </h2>

              <p className="text-gray-600 mt-2 text-sm sm:text-base break-words">
                {app.applicant.email}
              </p>

              <p className="mt-4 text-sm sm:text-base">

                Status:

                <span className="font-semibold ml-2">

                  {app.status}

                </span>

              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      app._id,
                      "SHORTLISTED"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      app._id,
                      "ACCEPTED"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      app._id,
                      "REJECTED"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl w-full sm:w-auto"
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default RecruiterApplicants;