const CandidateProfile = require("../Models/CandidateProfile");

//CANDIDATE PROFILE
const createProfile = async (req, res) => {
    try{
        const existing = await CandidateProfile.findOne({ user: req.user.id});

        if(existing){
            return res.status(400).json({
                success: false,
                message: "Profile already exists"
            });
        }

const {
      headline,
      skills,
      experience,
      education,
      resume,
      location,
      github,
      linkdin
    } = req.body;


 const profile = await CandidateProfile.create({
      user: req.user.id,
      headline,
      skills,
      experience,
      education,
      resume,
      location,
      github,
      linkdin
        });

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//GET MY PROFILE
const getMyProfile = async (req,res) => {
    try{
        const profile = await CandidateProfile.findOne({
            user: req.user.id
        }).populate("user", "name email role");

        if(!profile){
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            profile
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    };
}

//UPDATE PROFILE
const updateProfile = async (req,res) => {
    try{
        const {headline, skills, experience, education, resume, location, github, linkdin } = req.body;
        const updateData = {};
         
    if (headline !== undefined) updateData.headline = headline;
    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (education !== undefined) updateData.education = education;
    if (resume !== undefined) updateData.resume = resume;
    if (location !== undefined) updateData.location = location;
    if (github !== undefined) updateData.github = github;
    if (linkdin !== undefined) updateData.linkdin = linkdin;
    
    const profile = await CandidateProfile.findOneAndUpdate({
        user: req.user.id
    },
         updateData,
         {
            new: true,
            runValidators: true
         }
);
    if(!profile){
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        });
    }
    
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile
    });
    }
    catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message
        });
    }
};

//UPLOAD RESUME
const uploadResume = async(req, res) => {
    try{
       if(!req.file){
        return res.status(400).json({
            success: false,
            message: "NO file uploaded"
        });
       }

       const profile = await CandidateProfile.findOneAndUpdate(
        {
            user: req.user.id
        },
        {
            resume: req.file.path
        },
        {
            new: true,
            runValidators: true
        }
       );

       if(!profile){
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        });
       }
       res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        profile
       });
    }
    catch(error){
        res.status(500).json({
            succesee: false,
            error: error.message
        });
    }
};







module.exports = {createProfile, getMyProfile, updateProfile, uploadResume};

