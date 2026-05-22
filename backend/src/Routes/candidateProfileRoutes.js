const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const {createProfile, getMyProfile, updateProfile, uploadResume} = require("../Controllers/candidateProfileController");
const upload = require("../Middleware/upload");


//CREATE PROFILE
router.post("/",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    createProfile
);

//GET MY PROFILE
router.get("/me",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    getMyProfile
);

//UPDATE PROFILE
router.put("/", 
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    updateProfile
);

//UPLOAD RESUME
router.post("/upload-resume",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    upload.single("resume"),
    uploadResume
    
);


module.exports = router;
