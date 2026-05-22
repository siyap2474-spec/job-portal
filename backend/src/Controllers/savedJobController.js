const SavedJob = require("../Models/SavedJob");
const Job = require("../Models/Job")


//SAVE JOB (BOOKMARK JOB)
const saveJob = async (req,res) => {
    try{
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        
const alreadySaved = await SavedJob.findOne({
  candidate: req.user.id,
  job: jobId
});

if (alreadySaved) {
  return res.status(400).json({
    success: false,
    message: "Job already saved"
  });
}

        const saved = await SavedJob.create({
            candidate: req.user.id,
            job: jobId
        });

        res.status(201).json({
            success: true,
            message: "Job saved successfully",
            saved
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//GET SAVEJOB
const getSavedJobs = async (req,res) => {
    try{
        const savedJobs = await SavedJob.find({
            candidate: req.user.id
        }).populate("job");

        res.status(200).json({
            success: true,
            count: savedJobs.length,
            savedJobs
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//REMOVE SAVED JOB
const removeSavedJob = async (req,res) => {
    try{
        const jobId = req.params.jobId;

        const savedJob = await SavedJob.findOneAndDelete({
            candidate: req.user.id,
            job: jobId
        });

        if(!savedJob){
            return res.status(404).json({
                success: false,
                message: "Saved job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Saved job removed successfully"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


module.exports = {saveJob, getSavedJobs, removeSavedJob}