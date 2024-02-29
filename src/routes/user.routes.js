const { Router } = require("express");

const router = Router();
const upload = require("../middlewares/multer.middleware.js");
const compressImages = require("../middlewares/image-compress.middleware.js");
const {
  verifyJwt,
  authorizeRoles,
} = require("../middlewares/auth.middleware.js");
const { UserRoleValues } = require("../constant.js");
const {
  vallidateUser,
  handleValidationErrorsUser,
} = require("../validators/user.validator.js");

const {
  register,
  login,
  getAll,
  getSelf,
  getUserById,
  updateUser,
  sendOtp,
} = require("../controllers/user.controller.js");

router
  .route("/")
  .post(
    upload.single("avatar"),
    vallidateUser,
    handleValidationErrorsUser,
    compressImages,
    register
  );
router
  .route("/:userId")
  .get(verifyJwt, getUserById)
  .patch(verifyJwt, upload.single("avatar"), compressImages, updateUser);
router.route("/self").get(verifyJwt, getSelf);
router.route("/login").post(login);

router
  .route("/getAll")
  .get(verifyJwt, authorizeRoles(UserRoleValues.ADMIN), getAll);

router.route("/send-otp").post(sendOtp);
module.exports = router;
