const CandidateProfile = require("../Models/CandidateProfile");

const getAllCandidates = async (req, res) => {

  try {

    const candidates = await CandidateProfile.find()
      .populate("user", "name email");

    res.status(200).json(candidates);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getCandidateById = async (req, res) => {

  try {

    const candidate = await CandidateProfile.findById(
      req.params.id
    ).populate("user", "name email");

    if (!candidate) {

      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json(candidate);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
};