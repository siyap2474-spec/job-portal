import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import candidateLogin from "../assets/candidateLogin.png";

import {
  fetchProfile,
  createProfileThunk,
  updateProfileThunk,
  uploadResumeThunk,
} from "../features/profile/profileSlice";
import Navbar from "../components/Navbar";

function Profile() {

  const dispatch = useDispatch();

  const { profile } = useSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({
    headline: "",
    skills: "",
    experience: "",
    location: "",
    github: "",
    linkdin: "",
  });

  const [resume, setResume] = useState(null);

  // FETCH PROFILE
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // SET EXISTING PROFILE DATA
  useEffect(() => {

    if (profile) {

      setFormData({
        headline: profile.headline || "",
        skills: profile.skills?.join(", ") || "",
        experience: profile.experience || "",
        location: profile.location || "",
        github: profile.github || "",
        linkdin: profile.linkdin || "",
      });

    }

  }, [profile]);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const profileData = {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim()),
    };

    try {

      if (profile) {

        await dispatch(
          updateProfileThunk(profileData)
        ).unwrap();

        alert("Profile updated successfully");

      } else {

        await dispatch(
          createProfileThunk(profileData)
        ).unwrap();

        alert("Profile created successfully");
      }

    } catch (error) {

      alert(error?.message || "Something went wrong");

    }
  };

  // HANDLE RESUME UPLOAD
  const handleResumeUpload = async () => {

    if (!resume) {
      return alert("Please select resume");
    }

    const data = new FormData();

    data.append("resume", resume);

    try {

      await dispatch(
        uploadResumeThunk(data)
      ).unwrap();

      alert("Resume uploaded successfully");

    } catch (error) {

      alert(error?.message || "Upload failed");

    }
  };

  return (
    <>
    <Navbar/>

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-10">

      <div className="bg-white w-full max-w-6xl rounded-2xl md:rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-6 lg:p-8">

          <img
            src={candidateLogin}
            alt="Profile Illustration"
            className="w-full max-w-md object-contain"
            />

        </div>

        {/* RIGHT SIDE */}
        <div className="p-5 sm:p-7 md:p-10">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
            Candidate Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            >

            {/* HEADLINE */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Headline
              </label>

              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* SKILLS */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* EXPERIENCE */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Experience
              </label>

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="2"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* LOCATION */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Vadodara"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* GITHUB */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Github
              </label>

              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* LINKEDIN */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                LinkedIn
              </label>

              <input
                type="text"
                name="linkdin"
                value={formData.linkdin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border rounded-xl p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* RESUME */}
            <div>

              <label className="block mb-2 font-medium text-sm sm:text-base">
                Upload Resume
              </label>

              <input
                type="file"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
                className="w-full text-sm sm:text-base"
                />

              <button
                type="button"
                onClick={handleResumeUpload}
                className="mt-3 w-full sm:w-auto bg-gray-800 hover:bg-gray-900 transition text-white px-5 py-2.5 rounded-xl"
                >
                Upload Resume
              </button>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-base sm:text-lg font-semibold"
              >
              {profile ? "Update Profile" : "Create Profile"}
            </button>

          </form>

        </div>

      </div>

    </div>
              </>
  );
}

export default Profile;