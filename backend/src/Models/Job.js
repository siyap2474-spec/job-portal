const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      required: true
    },

    experience: {
  min: {
    type: Number,
    required: true,
    default: 0
  },
  max: {
    type: Number,
    required: true,
    default: 0
  }
},
    skills: [
      {
        type: String
      }
    ],

    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    vacancies: {
      type: Number,
      default: 1
    },

    deadline: {
      type: Date
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model("Job", jobSchema);