const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
const validators = require("../Middleware/validators");


const {handleValidation, applicationStatusValidation} = require("../Middleware/validators");
const {applyJob, getMyApplications, getApplicantsForJob, updateApplicationStatus} = require("../Controllers/applicationController");



//APPLY JOB api
router.post("/apply/:jobId",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    applyJob
);

//GET MY APPLICATIONS
router.get("/my-applications", 
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    getMyApplications
);

//GET APPLICANTS FOR JOB
router.get("/job/:jobId/applicants",
    authMiddleware,
    roleMiddleware("RECRUITER"),
    getApplicantsForJob
);

//UPDATE THE STATUS OF JOB
router.put("/status/:applicationId",
    authMiddleware,
    roleMiddleware("RECRUITER"),
    applicationStatusValidation,
    handleValidation,
    updateApplicationStatus
);


module.exports = router;
