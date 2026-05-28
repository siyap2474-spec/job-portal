const Job = require("../Models/Job");
const Application = require("../Models/Application");
const CandidateProfile = require("../Models/CandidateProfile");
const SavedJob = require("../Models/SavedJob");

// RECRUITER'S DASHBOARD
const recruiterDashboard = async (req,res) => {
    try{
        const jobsPosted = await Job.countDocuments({
            createdBy: req.user.id
        });
        
        const recruiterJobs = await Job.find({
            createdBy:req.user.id
        }).select("_id");

        const jobIds = recruiterJobs.map((job) => job._id);

        const totalApplicants = await Application.countDocuments({
            job: { $in : jobIds}
        });

        const shortlisted = await Application.countDocuments({
            job : { $in : jobIds},
            status: "SHORTLISTED"
        });
        const accepted = await Application.countDocuments({
            job : { $in : jobIds},
            status: "ACCEPTED"
        });

        const rejected = await Application.countDocuments({
            job : { $in : jobIds},
            status: "REJECTED"
        });
        const pending = await Application.countDocuments({
            job : { $in : jobIds},
            status: "PENDING"
        });
        
        res.status(200).json({
            success: true,
            jobsPosted,
            totalApplicants,
            statusBreakdown: {
            pending,
            shortlisted,
            accepted,
            rejected
      }
        })

    }
    catch(error){
        res.status(500).json({
  success: false,
  error: error.message
});
    }
};

//CANDIDATE'S DASHBOARD
const candidateDashboard = async (req,res) => {
    try{
      const appliedJobs = await Application.countDocuments({
  applicant: req.user.id
});

const savedJobs = await SavedJob.countDocuments({
  candidate: req.user.id
});

      const profile = await CandidateProfile.findOne({
        user: req.user.id
      });

      let profileCompleteness = 0;

      if(profile){
        let filledField = 0; 

        if(profile.headline) filledField++;
        if(profile.skills && profile.skills.length > 0) filledField++;
        if(profile.experience > 0) filledField++;
        if(profile.education && profile.education.length > 0) filledField++;
        if(profile.resume) filledField++;
        if(profile.location) filledField++;
        if(profile.github) filledField++;
        if(profile.linkdin) filledField++;

        profileCompleteness = (filledField / 8 ) * 100;
      }
 
       res.status(200).json({
        success: true,
        appliedJobs,
        savedJobs,
        profileCompleteness
       });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {recruiterDashboard, candidateDashboard};