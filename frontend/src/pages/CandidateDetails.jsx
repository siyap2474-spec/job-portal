import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import api from "../services/api";

function CandidateDetails() {

    const { id } = useParams();

    const [candidate, setCandidate] = useState(null);

    useEffect(() => {

        fetchCandidate();

    }, []);

    const fetchCandidate = async () => {

        try {

            const res = await api.get(
                `/recruiter/candidates/${id}`
            );

            setCandidate(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!candidate) {

        return (
            <div className="p-10 text-xl">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT PROFILE CARD */}
                <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">

                    <div className="flex flex-col items-center">

                        <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                            {candidate.user?.name?.charAt(0)}
                        </div>

                        <h1 className="text-3xl font-bold mt-5">
                            {candidate.user?.name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {candidate.user?.email}
                        </p>

                        <p className="text-center mt-4 text-gray-700">
                            {candidate.headline}
                        </p>

                    </div>

                    <div className="border-t mt-6 pt-6 space-y-4">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Experience
                            </p>

                            <p className="font-semibold">
                                {candidate.experience} Years
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Location
                            </p>

                            <p className="font-semibold">
                                {candidate.location}
                            </p>
                        </div>

                    </div>

                   <div className="mt-8 flex flex-col gap-3">

    {
        candidate.github && (

            <a
                href={candidate.github}
                target="_blank"
                rel="noreferrer"
                className="border border-gray-300 text-gray-700 text-center py-2.5 rounded-lg text-sm hover:bg-gray-100 transition"
            >
                GitHub
            </a>

        )
    }

    {
        candidate.linkdin && (

            <a
                href={candidate.linkdin}
                target="_blank"
                rel="noreferrer"
                className="border border-blue-200 text-blue-600 text-center py-2.5 rounded-lg text-sm hover:bg-blue-50 transition"
            >
                LinkedIn
            </a>

        )
    }

    <Link
        to="/find-candidates"
        className="border border-gray-300 text-center py-2.5 rounded-lg text-sm hover:bg-gray-100 transition"
    >
        Back
    </Link>

</div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* SKILLS */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Skills
                        </h2>

                        <div className="flex gap-3 flex-wrap">

                            {candidate.skills?.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CandidateDetails;