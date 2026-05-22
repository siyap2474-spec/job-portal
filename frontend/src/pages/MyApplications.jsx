import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchApplications,
} from "../features/applications/applicationSlice";

import { Link } from "react-router-dom";

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

    return <h1 className="p-10 text-2xl">Loading...</h1>;

  }

  return (

    <div className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-10">
        My Applications
      </h1>

      {applications.length === 0 ? (

        <p>No applications found</p>

      ) : (

        <div className="grid gap-6">

          {applications.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <h2 className="text-2xl font-bold">
                {item.job.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.job.company}
              </p>

              <div className="flex gap-5 mt-4 text-gray-600">

                <p>{item.job.location}</p>

                <p>{item.job.jobType}</p>

              </div>

              <p className="text-blue-600 font-semibold mt-4">
                ₹ {item.job.salary}
              </p>

              <div className="flex justify-between items-center mt-6">

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                  {item.status}
                </span>

                <Link
                  to={`/jobs/${item.job._id}`}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  View Job
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default MyApplications;