const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createVerify } = require("crypto");
const uploadPath = require("../config/config").imagesUploadLocation;

module.exports = multer.diskStorage({
  destination: async (req, file, cb) => {
    let upPath = path.join(__dirname, uploadPath);

    try {
      await fs.promises.access(upPath);
    //   console.log(file);
      cb(null, upPath);
    } catch (err) {
      if (err.syscall == "access" && err.code == "ENOENT") {
        try {
          await fs.promises.mkdir(upPath);
          cb(null, upPath);
        } catch (err) {
          cb(err, null);
        }
      } else cb(err, null);
    }
  },
  filename: (req, file, cb) => {
      co
    cb(null, file.originalname);
  },
});
