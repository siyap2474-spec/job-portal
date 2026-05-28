const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const {createJob, getAllJobs, getSingleJob, updateJob, deleteJob, getRecruiterJobs} = require('../Controllers/jobController');

const {handleValidation, jobValidation} = require("../Middleware/validators");

//creat job api
router.post('/create-job',
    authMiddleware, 
    roleMiddleware("RECRUITER"),
    jobValidation,
    handleValidation,
    createJob
 );

 //getAllJobs api
router.get("/", getAllJobs);

//getRecruiterJob api
router.get(
  "/recruiter/my-jobs",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  getRecruiterJobs
);

//getSingleJob api
router.get("/:id",getSingleJob)

//UPDATE JOB api
router.put("/:id", 
    authMiddleware,
    roleMiddleware("RECRUITER"),
    jobValidation,
    handleValidation,
    updateJob);

//DELETE JOB api
router.delete("/:id",
    authMiddleware,
    roleMiddleware("RECRUITER"),
    deleteJob);
 

module.exports = router;