import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

function FindCandidates() {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        fetchCandidates();

    }, []);

    const fetchCandidates = async () => {

        try {

            const res = await api.get(
                "/recruiter/candidates"
            );

            setCandidates(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
<>
    <Navbar/>
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">

            {/* PAGE TITLE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                Candidates
            </h1>

            {/* CANDIDATE LIST */}
            <div className="space-y-5 md:space-y-6">

                {candidates.map((candidate) => (
                    
                    <div
                    key={candidate._id}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 sm:p-6 hover:shadow-xl transition duration-300"
                    >

                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

                            {/* LEFT SIDE */}
                            <div className="flex-1 min-w-0">

                                <h2 className="text-2xl sm:text-3xl font-bold break-words">
                                    {candidate.user?.name}
                                </h2>

                                <p className="text-gray-500 mt-1 text-sm sm:text-base break-words">
                                    {candidate.user?.email}
                                </p>

                                <p className="mt-4 text-base sm:text-lg text-gray-700 break-words">
                                    {candidate.headline}
                                </p>

                                {/* INFO */}
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mt-4 text-gray-600 text-sm sm:text-base">

                                    <p>
                                        Location : {candidate.location}
                                    </p>

                                    <p>
                                        Experience : {candidate.experience} years
                                    </p>

                                </div>

                                {/* SKILLS */}
                                <div className="flex gap-2 flex-wrap mt-5">

                                    {candidate.skills?.map((skill, index) => (
                                        
                                        <span
                                        key={index}
                                        className="bg-yellow-100 text-yellow-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium"
                                        >
                                            {skill}
                                        </span>

))}

                                </div>

                            </div>

                            {/* RIGHT SIDE BUTTON */}
                            <div className="w-full lg:w-auto">

                                <Link
                                    to={`/recruiter/candidate/${candidate._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition block text-center w-full lg:w-auto"
                                    >
                                    View Profile
                                </Link>

                            </div>

                        </div>

                    </div>

))}

            </div>

        </div>
</>
    );
}

export default FindCandidates;