//get notification
const Notification = require("../Models/Notification");
const getMyNotifications = async (req,res) => {
    try{
        const notifications = await Notification.find({
            user: req.user.id
        }).sort({createdAt: -1});

        res.status(200).json({
            success: true,
            notifications
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        user: req.user.id
      },
      {
        read: true
      },
      {
        new: true
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {getMyNotifications, markAsRead};