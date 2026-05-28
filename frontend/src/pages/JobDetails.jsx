// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import api from "../services/api";

// import { applyForJob } from "../features/applications/applicationAPI";

// import { saveJobThunk } from "../features/savedJobs/savedJobsSlice";

// import {
//   applyForJobThunk,
// } from "../features/applications/applicationSlice";

// function JobDetails() {

//   const dispatch = useDispatch();

//   const { id } = useParams();

//   const [job, setJob] = useState(null);

//   // APPLY JOB
// const handleApply = async () => {

//   try {

//     await dispatch(
//       applyForJobThunk(job._id)
//     ).unwrap();

//     alert("Applied successfully");

//   } catch (error) {

//     alert(
//       error?.message || "Application failed"
//     );

//   }

// };

//   // SAVE JOB
//   const handleSaveJob = async () => {

//     try {

//       await dispatch(saveJobThunk(job._id)).unwrap();

//       alert("Job saved successfully");

//     } catch (error) {

//       alert(error?.message || "Failed to save job");

//     }

//   };

//   // FETCH JOB DETAILS
//   useEffect(() => {

//     const fetchJob = async () => {

//       try {

//         const response = await api.get(`/jobs/${id}`);

//         setJob(response.data.job);

//       } catch (error) {

//         console.log(error);

//       }

//     };

//     fetchJob();

//   }, [id]);

//   if (!job) {

//     return <h1 className="p-10 text-2xl">Loading...</h1>;

//   }

//   return (

//     <div className="min-h-screen bg-gray-100 p-10">

//       <div className="bg-white rounded-3xl shadow p-10">

//         <h1 className="text-4xl font-bold">
//           {job.title}
//         </h1>

//         <p className="text-gray-500 text-xl mt-3">
//           {job.company}
//         </p>

//         <div className="flex gap-6 mt-6 text-gray-600">

//           <p>{job.location}</p>

//           <p>{job.jobType}</p>

//           <p>
//             {typeof job.experience === "string"
//               ? job.experience
//               : `${job.experience?.min} - ${job.experience?.max} years`}
//           </p>

//         </div>

//         <p className="text-2xl font-semibold text-blue-600 mt-6">
//           ₹ {job.salary}
//         </p>

//         <div className="mt-8">

//           <h2 className="text-2xl font-bold mb-4">
//             Skills Required
//           </h2>

//           <div className="flex flex-wrap gap-3">

//             {job.skills?.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
//               >
//                 {skill}
//               </span>
//             ))}

//           </div>

//         </div>

//         <div className="mt-10">

//           <h2 className="text-2xl font-bold mb-4">
//             Job Description
//           </h2>

//           <p className="text-gray-700 leading-8">
//             {job.description}
//           </p>

//         </div>

//         <div className="flex gap-5 mt-10">

//           <button
//             onClick={handleApply}
//             className="bg-blue-600 text-white px-8 py-3 rounded-2xl"
//           >
//             Apply Now
//           </button>

//           <button
//             onClick={handleSaveJob}
//             className="border border-blue-600 text-blue-600 px-8 py-3 rounded-2xl"
//           >
//             Save Job
//           </button>

//         </div>

//       </div>

//     </div>

//   );
// }

// export default JobDetails;







import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";

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

    return (
      <h1 className="p-6 md:p-10 text-xl md:text-2xl">
        Loading...
      </h1>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-5 sm:p-7 md:p-10">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
          {job.title}
        </h1>

        {/* COMPANY */}
        <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-3 break-words">
          {job.company}
        </p>

        {/* JOB INFO */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mt-6 text-gray-600 text-sm sm:text-base">

          <p>{job.location}</p>

          <p>{job.jobType}</p>

          <p>
            {typeof job.experience === "string"
              ? job.experience
              : `${job.experience?.min} - ${job.experience?.max} years`}
          </p>

        </div>

        {/* SALARY */}
        <p className="text-xl sm:text-2xl font-semibold text-blue-600 mt-6">
          ₹ {job.salary}
        </p>

        {/* SKILLS */}
        <div className="mt-8">

          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Skills Required
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-3">

            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-10">

          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Job Description
          </h2>

          <p className="text-gray-700 leading-7 sm:leading-8 text-sm sm:text-base whitespace-pre-line">
            {job.description}
          </p>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">

          <button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 sm:px-8 py-3 rounded-2xl w-full sm:w-auto"
          >
            Apply Now
          </button>

          <button
            onClick={handleSaveJob}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-6 sm:px-8 py-3 rounded-2xl w-full sm:w-auto"
          >
            Save Job
          </button>

        </div>

      </div>

    </div>

  );
}

export default JobDetails;