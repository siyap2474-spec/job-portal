const { body, validationResult } = require("express-validator")

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors:errors.array()
        });
    }
    next();
};

//register
const registerValidation = [

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters"),

    body("role")
    .isIn(["CANDIDATE", "RECRUITER"])
    .withMessage("Invalid role")
];

// login

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

// create job
const jobValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("company")
    .notEmpty()
    .withMessage("Company is required"),

  body("location")
    .notEmpty()
    .withMessage("Location is required"),

  body("salary")
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("minExp")
    .isNumeric()
    .withMessage("Minimum experience must be a number"),

  body("maxExp")
    .isNumeric()
    .withMessage("Maximum experience must be a number"),

  body("jobType")
    .isIn(["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE"])
    .withMessage("Invalid job type"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
];

//application status validation
const applicationStatusValidation = [
  body("status")
    .isIn(["PENDING", "SHORTLISTED", "ACCEPTED", "REJECTED"])
    .withMessage("Invalid application status")
];

//CREATE PROFILE FOR CANDIDATE
const createProfileValidation = [
  body("headline")
    .notEmpty()
    .withMessage("Headline is required")
    .isString(),

  body("skills")
    .notEmpty()
    .withMessage("Skills are required")
    .isArray(),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isNumeric(),

  body("education")
    .optional()
    .isArray(),

  body("resume")
    .optional()
    .isString(),

  body("location")
    .optional()
    .isString(),

  body("github")
    .optional()
    .isURL(),

  body("linkdin")
    .optional()
    .isURL()
];
// UPDATE CANDIDATE PROFILE

const updateProfileValidation = [
  body("headline").optional().isString(),

  body("skills").optional().isArray(),

  body("experience").optional().isNumeric(),

  body("education").optional().isArray(),

  body("resume").optional().isString(),

  body("location").optional().isString(),

  body("github").optional().isURL(),

  body("linkdin").optional().isURL()
];

module.exports = {
  handleValidation,
  registerValidation,
  loginValidation,
  jobValidation,
  applicationStatusValidation,
  createProfileValidation,
  updateProfileValidation
};