const express = require("express");

const {
  getAllCandidates,
  getCandidateById,
} = require("../Controllers/recruiterController");

const authMiddleware = require("../Middleware/authMiddleware");

const roleMiddleware = require("../Middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/candidates",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  getAllCandidates
);

router.get(
  "/candidates/:id",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  getCandidateById
);

module.exports = router;