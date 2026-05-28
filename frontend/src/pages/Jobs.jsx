import { useEffect, useState } from "react";

import { getAllJobs } from "../features/jobs/jobAPI";

import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex ">
          <div className="bg-[#f8f9fa] p-4 md:p-6 lg:p-8">

            <h1 className="text-xl md:text-3xl font-bold mb-8">
              Find Your Dream Job
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">

              {/* FILTERS */}

              <div className="w-full lg:w-72 bg-white rounded-2xl shadow p-6 h-fit">

                <h2 className="text-xl md:text-2xl font-bold mb-6">
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
                    <option value="newest">
                      Newest
                    </option>

                    <option value="oldest">
                      Oldest
                    </option>

                  </select>

                </div>

              </div>

              {/* JOBS */}

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {jobs.map((job) => (

                  <JobCard
                    key={job._id}
                    job={job}
                  />

                ))}

              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>

  );
}

export default Jobs;