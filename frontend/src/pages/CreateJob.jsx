import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createJobThunk } from "../features/jobs/jobSlice";
import Navbar from "../components/Navbar";

function CreateJob() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    minExp: "",
    maxExp: "",
    skills: "",
    jobType: "FULL_TIME",
    description: "",
    vacancies: "",
    deadline: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const jobData = {
        ...formData,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
      };

      await dispatch(
        createJobThunk(jobData)
      ).unwrap();

      alert("Job created successfully");

      navigate("/recruiter/dashboard");

    } catch (error) {

      alert(error?.message || "Failed to create job");

    }

  };

  return (
<>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 sm:p-6 md:p-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-lg w-full max-w-4xl"
        >

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
          Create Job
        </h1>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          <input
            type="number"
            name="minExp"
            placeholder="Min Experience"
            value={formData.minExp}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          <input
            type="number"
            name="maxExp"
            placeholder="Max Experience"
            value={formData.maxExp}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          {/* SKILLS */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl md:col-span-2 w-full"
            />

          {/* JOB TYPE */}
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            >

            <option value="FULL_TIME">
              Full Time
            </option>

            <option value="PART_TIME">
              Part Time
            </option>

            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="REMOTE">
              Remote
            </option>

          </select>

          {/* VACANCIES */}
          <input
            type="number"
            name="vacancies"
            placeholder="Vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl w-full"
            />

          {/* DEADLINE */}
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border p-3 md:p-4 rounded-xl md:col-span-2 w-full"
            />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            className="border p-3 md:p-4 rounded-xl md:col-span-2 w-full resize-none"
            />

        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 md:py-4 rounded-2xl mt-6 md:mt-8 w-full text-base md:text-lg font-semibold"
          >
          Create Job
        </button>

      </form>

    </div>

          </>
  );
}

export default CreateJob;