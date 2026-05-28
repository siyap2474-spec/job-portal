const recruiterRoutes = require("./Routes/recruiterRoutes");
const passport = require("passport");

const session = require("express-session");

require("dotenv").config();
const express = require("express");
const cors = require("cors");


// IMPORT DB FUNCTION
const connectDB = require("./Config/db");
const app = express();


app.use(cors());
//UPLOAD RESUME
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// CONNECT DATABASE
connectDB();

//Import Passport Config
require("./Config/passport");
app.use(
  session({
    secret: "googleauthsecret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

//register api inserted
const authRoutes = require('./Routes/auth');
app.use('/api/auth', authRoutes)

//job api
const jobRoutes = require("./Routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

//Job Application api
const applicationRoutes = require('./Routes/applicationRoutes');
app.use("/api/applications", applicationRoutes);

//Candidate Profile Route
const candidateProfileRoutes = require("./Routes/candidateProfileRoutes");
app.use("/api/profile", candidateProfileRoutes);

//Saved job api
const savedJobRoutes = require("./Routes/savedJobRoutes");
app.use("/api/saved-jobs", savedJobRoutes);

//Dashboard api
const dashboardRoutes = require("./Routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

//Notification api
const notificationRoutes = require("./Routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

//recruiter can find candidate api
app.use("/api/recruiter", recruiterRoutes);

//basic server created
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => {
  console.log("Server started");
});

