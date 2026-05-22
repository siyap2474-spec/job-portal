const express = require("express");
const router = express.Router();
const passport = require("passport");

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");


const {registerUser,loginUser} = require("../Controllers/authController");

const {handleValidation, registerValidation, loginValidation} = require("../Middleware/validators");


// GOOGLE LOGIN
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/google/failure"
  }),
  (req, res) => {
    res.json({
      success: true,
      user: req.user.user,
      token: req.user.token
    });
  }
);
router.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google login failed"
  });
});

// REGISTER
router.post("/register",
  registerValidation,
  handleValidation,
  registerUser);

// LOGIN
router.post("/login", 
  loginValidation,
  handleValidation,
  loginUser);

// PROFILE
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    res.json({
      message: "Protected profile route",
      user: req.user
    });

  }
);

// COMPANY ONLY
router.get(
  "/company-only",
  authMiddleware,
  roleMiddleware("RECRUITER"),
  (req, res) => {

    res.json({
      message: "Welcome Company"
    });

  }
);


module.exports = router;