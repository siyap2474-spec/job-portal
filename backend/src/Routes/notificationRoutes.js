const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const {getMyNotifications, markAsRead} = require("../Controllers/notificationController");



router.get("/my",
    authMiddleware,
    getMyNotifications
);

router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);


module.exports = router;