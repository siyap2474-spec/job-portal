import { useEffect, useState } from "react";
import { getAllJobs } from "../features/jobs/jobsAPI";

import JobCard from "../components/JobCard";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    experience: "",
    sort: "newest"
  });

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await getAllJobs(filters);

        setJobs(response.data.jobs);

      } catch (error) {
        console.log(error);
      }

    };

    fetchJobs();

  }, [filters]);
  console.log(jobs);

  return (

    <div className="min-h-screen bg-[#f8f9fa] p-8">

      <h1 className="text-4xl font-bold mb-8">
        Find Your Dream Job
      </h1>

      <div className="flex gap-8">

        {/* LEFT FILTERS */}

        <div className="w-72 bg-white rounded-2xl shadow p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Filters
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Job title"
              value={filters.title}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  title: e.target.value
                })
              }
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  location: e.target.value
                })
              }
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Experience"
              value={filters.experience}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  experience: e.target.value
                })
              }
              className="w-full border p-3 rounded-xl"
            />

            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sort: e.target.value
                })
              }
              className="w-full border p-3 rounded-xl"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>

          </div>

        </div>

        {/* RIGHT JOBS */}

<div className="flex-1 grid grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        </div>

      </div>

    </div>

  );
}

export default Jobs;