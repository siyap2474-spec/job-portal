const Job = require("../Models/Job");


// CREATE JOB
const createJob = async (req, res) => {

  try {

    const {
      title,
      company,
      location,
      salary,
      minExp,
      maxExp,
      skills,
      jobType,
      description,
      vacancies,
      deadline
    } = req.body;


    const job = await Job.create({

      title,
      company,
      location,
      salary,
  experience: {
    min: minExp,
    max: maxExp
  },
      skills,
      jobType,
      description,
      vacancies,
      deadline,

      // recruiter id from JWT
      createdBy: req.user.id

    });


    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

// GET ALL JOB 
const getAllJobs = async (req,res) => {
   try{

   const {title, location, jobType, experience, minExp, maxExp, sort, page = 1, limit = 5} = req.query;

   let filter = {};

   if(title){
    filter.title = { $regex: title, $options: "i"};
   }

   if(location){
    filter.location = {$regex: location, $options: "i"};
   }

   if(jobType){
    filter.jobType = {$regex: jobType, $options: "i"};
   }

   if(experience){
  const exp = Number(experience);

  filter["experience.min"] = { $lte: exp };
  filter["experience.max"] = { $gte: exp };
}
 
   if(minExp !== undefined && maxExp !== undefined){
    filter["experience.min"] = { $lte: Number(maxExp) };
    filter["experience.max"] = { $gte: Number(minExp) };
   }
   
 //  SORTING
    let sortBy = { createdAt: -1 }; // default newest first

    if (sort === "oldest") {
      sortBy = { createdAt: 1 };
    }

    if (sort === "newest") {
      sortBy = { createdAt: -1 };
    }


      //  PAGINATION
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // TOTAL COUNT
    const totalJobs = await Job.countDocuments(filter);

    // FETCH DATA
    const jobs = await Job.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limitNum),
      currentPage: pageNum,
      count: jobs.length,
      jobs
    });
  }
   catch(error){
       res.status(500).json({
        error : error.message
       });
   }
};

//GET A SINGLE JOB
const getSingleJob = async(req,res) => {
  try{
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if(!job){
      return res.status(404).json({
      message : "Job not found"
      });
    }
    res.status(200).json({
      success : true,
      job
    });
  }
  catch(error){
    res.status(500).json({
    error : error.message
  });
}
};

//UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    //  OWNERSHIP CHECK
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this job"
      });
    }

    const updateData = {};

    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.company !== undefined) updateData.company = req.body.company;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.salary !== undefined) updateData.salary = req.body.salary;
    if (req.body.skills !== undefined) updateData.skills = req.body.skills;
    if (req.body.jobType !== undefined) updateData.jobType = req.body.jobType;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.vacancies !== undefined) updateData.vacancies = req.body.vacancies;
    if (req.body.deadline !== undefined) updateData.deadline = req.body.deadline;

    

 if (req.body.minExp !== undefined || req.body.maxExp !== undefined) {
  updateData.experience = {
    min: req.body.minExp,
    max: req.body.maxExp
  };
}
  
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      updatedJob
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

//DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // 🔒 OWNERSHIP CHECK
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this job"
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// GET RECRUITER JOBS
const getRecruiterJobs = async (req, res) => {

  try {

    const jobs = await Job.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

};

module.exports = {createJob, getAllJobs, getSingleJob, updateJob, deleteJob, getRecruiterJobs};