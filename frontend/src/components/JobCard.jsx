import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 w-full">

      {/* TITLE */}
      <h2 className="text-xl sm:text-2xl font-bold break-words">
        {job.title}
      </h2>

      {/* COMPANY */}
      <p className="mt-2 text-gray-500 text-sm sm:text-base break-words">
        {job.company}
      </p>

      {/* LOCATION */}
      <p className="mt-2 text-sm sm:text-base text-gray-700">
        {job.location}
      </p>

      {/* JOB TYPE */}
      <p className="mt-2 text-sm sm:text-base text-gray-700">
        {job.jobType}
      </p>

      {/* EXPERIENCE */}
      <p className="mt-2 text-sm sm:text-base text-gray-700">
        {typeof job.experience === "string"
          ? job.experience
          : `${job.experience?.min} - ${job.experience?.max} years`}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/jobs/${job._id}`)}
        className="mt-5 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition duration-300"
      >
        Apply
      </button>
    </div>
  );
}

export default JobCard;