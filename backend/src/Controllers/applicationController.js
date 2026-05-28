const Application = require("../Models/Application");
const Job = require("../Models/Job");
const Notification = require("../Models/Notification");

//APPLY FOR JOB
const applyJob = async (req,res) => {
    try{
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message : "Job not found"
            });
        }

        const alreadyApplied = await Application.findOne({
            job : jobId,
            applicant : req.user.id
        });
        
        if (alreadyApplied) {
        return res.status(400).json({
        message: "You already applied"
        });
        }

const application = await Application.create({
  job : jobId,
  applicant : req.user.id
});

await Notification.create({
  user: job.createdBy,
  message: "A candidate applied for your job",
  type: "APPLICATION"
});

        res.status(201).json({
          success: true,
          message: "Applied successfully",
          application
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

//GET ALL APPLICATIONS
const getMyApplications = async (req, res) => {
  try{
    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job");

    res.status(200).json({
      success: true,
      applications
    });
  }
  catch(error){
    res.status(500).json({
      error:error.message
    });
  }
}

//GET APPLICANTS FOR JOB (RECRUITER CAN SEE WHICH APPLICANTS APPLIED FOR THE JOB.)
const getApplicantsForJob = async (req,res) => {
  try{
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);

    if(!job){
      return res.status(404).json({
        message:"Job not found"
      });
    }
  
  //ownership check

  if (job.createdBy.toString() !== req.user.id){
    return res.status(403).json({
      message: "Access denied"
    });
  }
  const applications = await Application.find({
    job : jobId
  }).populate({
  path: "applicant",
  select: "-password"
});

const CandidateProfile = require("../Models/CandidateProfile");

const applicationsWithProfiles =
  await Promise.all(

    applications.map(async (app) => {

      const profile =
        await CandidateProfile.findOne({
          user: app.applicant._id
        });

      return {
        ...app.toObject(),
        profile
      };

    })

  );
  res.status(200).json({
    success: true,
      applications: applicationsWithProfiles

  });
}
  
    catch(error){
   res.status(500).json({
    error:error.message
   });
  }
};

//UPDATE APPLICATION STATUS
const updateApplicationStatus = async (req, res) => {
  try{
    const applicationId = req.params.applicationId;
    const {status} = req.body;
     
    const application = await Application.findById(applicationId).populate("job")

   if(!application){
    return res.status(404).json({
      message : "Application not found"
    });
   }

   if(application.job.createdBy.toString() !== req.user.id){
    return res.status(403).json({
      message: "Access denied"
    });
   }
   application.status = status;
   
   await application.save();

await Notification.create({
  user: application.applicant,
  message: `Your application status changed to ${status}`,
  type: "STATUS_UPDATE"
});

   res.status(200).json({
    success: true,
    message: "Application status updated",
    application
   });
  }
  catch(error){
    res.status(500
      
    ).json({
      error: error.message
    });
  }
}



module.exports = {applyJob, getMyApplications, getApplicantsForJob, updateApplicationStatus};
    
