const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const {saveJob, getSavedJobs, removeSavedJob} = require("../Controllers/savedJobController");

//save a job
router.post("/:jobId",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    saveJob
);

//get all saved jobs
router.get("/",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    getSavedJobs
);

//remove saved job
router.delete("/:jobId",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    removeSavedJob
);

module.exports = router;