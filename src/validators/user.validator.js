const { body, validationResult } = require("express-validator");
const { User } = require("../models/user.model.js");
const vallidateUser = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const existingEmail = await User.findOne({ email: value });
      if (existingEmail) {
        throw new Error("Email is already exists");
      }

      return true;
    }),

  body("fullName")
    .notEmpty()
    .withMessage("fullName is required")
    .isString()
    .withMessage("fullName must be a string"),

  body("avatar").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Avatar is required");
    }
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("Avatar must be an image (jpg, jpeg, png, gif)");
    }
    return true;
  }),
];

const handleValidationErrorsUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(1) });
  }
  next();
};
module.exports = { vallidateUser, handleValidationErrorsUser };
