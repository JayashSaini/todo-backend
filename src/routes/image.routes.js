const { Router } = require("express");
const router = Router();
const upload = require("../middlewares/multer.middleware.js");
const {image} = require("../controllers/image.controller.js");
const compressImages = require("../middlewares/image-compress.middleware.js");

router.route("/upload").post(upload.single("image"), compressImages, image);

module.exports = router;
