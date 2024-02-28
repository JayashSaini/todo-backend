const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const dotIndex = originalname.lastIndexOf(".");

    const fileName = originalname.substring(0, dotIndex).trim();
    const fileFormat = originalname.substring(dotIndex);

    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * Number(process.env.MULTER_FILE_NAME_RANGE));
    cb(null, fileName + "-" + uniqueSuffix + fileFormat);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
