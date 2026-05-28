import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // FETCH JOB DATA
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`); // FIXED

        setJobData({
          title: res.data.job.title || "",
          company: res.data.job.company || "",
          location: res.data.job.location || "",
          description: res.data.job.description || "",
        });

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE JOB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/jobs/${id}`, {
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        description: jobData.description,

        // REQUIRED BY BACKEND VALIDATION
        salary: 0,
        jobType: "FULL_TIME",
        skills: [],
        vacancies: 1,
        deadline: null,
        minExp: 0,
        maxExp: 0
      });
      alert(res.data.message || "Job updated successfully");
      navigate("/recruiter/jobs");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">

      <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;