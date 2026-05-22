const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

const {recruiterDashboard, candidateDashboard} = require("../Controllers/dashboardController");

//recruiter dashboard
router.get("/recruiter",
    authMiddleware,
    roleMiddleware("RECRUITER"),
    recruiterDashboard
);

//candidate dashboard
router.get("/candidate",
    authMiddleware,
    roleMiddleware("CANDIDATE"),
    candidateDashboard
);

module.exports  = router;
