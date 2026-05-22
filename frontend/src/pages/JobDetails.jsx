import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";

import { applyForJob } from "../features/applications/applicationAPI";

import { saveJobThunk } from "../features/savedJobs/savedJobsSlice";

import {
  applyForJobThunk,
} from "../features/applications/applicationSlice";

function JobDetails() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [job, setJob] = useState(null);

  // APPLY JOB
const handleApply = async () => {

  try {

    await dispatch(
      applyForJobThunk(job._id)
    ).unwrap();

    alert("Applied successfully");

  } catch (error) {

    alert(
      error?.message || "Application failed"
    );

  }

};

  // SAVE JOB
  const handleSaveJob = async () => {

    try {

      await dispatch(saveJobThunk(job._id)).unwrap();

      alert("Job saved successfully");

    } catch (error) {

      alert(error?.message || "Failed to save job");

    }

  };

  // FETCH JOB DETAILS
  useEffect(() => {

    const fetchJob = async () => {

      try {

        const response = await api.get(`/jobs/${id}`);

        setJob(response.data.job);

      } catch (error) {

        console.log(error);

      }

    };

    fetchJob();

  }, [id]);

  if (!job) {

    return <h1 className="p-10 text-2xl">Loading...</h1>;

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white rounded-3xl shadow p-10">

        <h1 className="text-4xl font-bold">
          {job.title}
        </h1>

        <p className="text-gray-500 text-xl mt-3">
          {job.company}
        </p>

        <div className="flex gap-6 mt-6 text-gray-600">

          <p>{job.location}</p>

          <p>{job.jobType}</p>

          <p>
            {typeof job.experience === "string"
              ? job.experience
              : `${job.experience?.min} - ${job.experience?.max} years`}
          </p>

        </div>

        <p className="text-2xl font-semibold text-blue-600 mt-6">
          ₹ {job.salary}
        </p>

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Skills Required
          </h2>

          <div className="flex flex-wrap gap-3">

            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Job Description
          </h2>

          <p className="text-gray-700 leading-8">
            {job.description}
          </p>

        </div>

        <div className="flex gap-5 mt-10">

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl"
          >
            Apply Now
          </button>

          <button
            onClick={handleSaveJob}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-2xl"
          >
            Save Job
          </button>

        </div>

      </div>

    </div>

  );
}

export default JobDetails;