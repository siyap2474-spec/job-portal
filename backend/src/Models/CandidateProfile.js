const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    headline:{
        type: String
    },

    skills: [
        {
            type: String
        }
    ],

    experience:{
        type: Number,
        default: 0
    },

    education: [
        {
            degree: String,
            college: String,
            year: Number
        }
    ],

    resume: {
        type: String
    },

    location: {
        type: String
    },

    github: String,
    linkdin: String
},
  {timestamps: true}
);

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);