const multer = require("multer");
const path = require("path");

//storage config
const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null, "uploads/");
  },
   
  filename: function(req,file,cb){
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName)
  }
});

//allow only pdf

const fileFilter = (req,file,cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if(ext !== ".pdf") {
    return cb(new Error("Only PDF files allowed"), false);
  }

  cb(null, true);
};

const upload = multer({storage, fileFilter});

module.exports = upload;