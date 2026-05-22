const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  // Which candidate applied
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Application status
  status: {
    type: String,
    enum: ["PENDING", "SHORTLISTED", "ACCEPTED", "REJECTED"] ,
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);