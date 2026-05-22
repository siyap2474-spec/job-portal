import { useNavigate } from "react-router-dom";


function JobCard({ job }) {
const navigate = useNavigate();
    return (

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold">
                {job.title}
            </h2>

            <p className="mt-2 text-gray-500">
                {job.company}
            </p>

            <p className="mt-2">
                {job.location}
            </p>

            <p className="mt-2">
                {job.jobType}
            </p>

            <p className="mt-2">
                {typeof job.experience === "string"
                    ? job.experience
                    : `${job.experience?.min} - ${job.experience?.max} years`}
            </p>

            <button
  onClick={() => navigate(`/jobs/${job._id}`)}
  className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl"
>
  Apply
</button>

        </div>

    );
}

export default JobCard;