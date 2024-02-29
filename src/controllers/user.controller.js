const { ApiError } = require("../utils/apiError.js");
const { ApiResponse } = require("../utils/apiResponse.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const {
  uploadOnCloudinary,
  deleteAssetonCloudinary,
} = require("../utils/cloudinary.js");
const { User } = require("../models/user.model.js");
const { sendMail } = require("../utils/mail.js");

function generateOtp() {
  const otp = {};
  otp.otp = Math.floor(100000 + Math.random() * 900000);
  otp.expiryDate = new Date(Date.now() + Number(process.env.USER_OTP_EXPIRY));
  return otp;
}

const register = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    email,
    avatar: avatar.url || "",
  });
  if (!user) {
    throw new ApiError(500, "Something went Wrong While registring");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "User Registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email && !otp) {
    throw new ApiError(400, "Email & OTP is required");
  }

  const user = await User.findOne({
    email,
  }).select("+isEmailVerified +emailVerificationOTP +emailVerificationExpiry");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let isValidOTP = user.emailVerificationOTP === otp;
  let isExpired = user.emailVerificationExpiry < Date.now();

  user.emailVerificationExpiry = null;
  user.emailVerificationOTP = null;

  if (!isExpired) {
    if (isValidOTP) {
      if (email && !existedUser.isEmailVerified) {
        user.isEmailVerified = true;
      }

      const accessToken = user.generateAccessToken();

      res.cookie("accessToken", accessToken, httpOnly, {
        true: true,
        secure: true,
      });
    } else {
      throw new ApiError(400, "OTP is incorrect. double-check and try again.");
    }
  } else {
    await user.save();
    throw new ApiError(401, "OTP is expired.");
  }

  await existedUser.save();

  const userToSend = await User.findById(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, userToSend, "User logged in Successfully"));
});

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    throw new ApiError("Something went wrong while accessign the users");
  }
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users successfully fetched"));
});

const getSelf = asyncHandler(async (req, res) => {
  const user = req.user;

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, " userId is not provided");
  }

  const admin = req.user.role === UserRoleValues.ADMIN;

  if (!(req.user._id == userId || admin)) {
    throw new ApiError(400, "you are not allowed to access this resource");
  }

  const user = await User.findById(userId).select(" +email +fullName +role");

  if (!user) {
    throw new ApiError("User Id is Invalied");
  }

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { email, fullName } = req.body;

  if (!(email || fullName || req.file)) {
    throw new ApiError(
      400,
      "Please provide at least one field (title, description, or file) for the request. "
    );
  }

  let updateFields = {};
  if (title) {
    updateFields.title = title;
  }
  if (description) {
    updateFields.description = description;
  }

  //get updated thumbnail file url
  if (req.file) {
    try {
      const updatedAvatar = await uploadOnCloudinary(req?.file.path);
      updateFields.avatar = updatedAvatar;

      const user = await User.findById(userId);

      deletedthumbnailStatus = await deleteAssetonCloudinary(
        user.avatar.public_id
      );
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong While updating a video on clodinary"
      );
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: updateFields,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(400, "User Id is not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Video updated successfully"));
});

const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "email  is required");
    }

    const existedUser = await User.findOne({ email: email });

    if (!existedUser) {
      throw new ApiError(404, "user not found");
    }

    const { otp, expiryDate } = generateOtp();
    console.log("opt ", otp);
    if (email) {
      existedUser.emailVerificationOTP = otp;
      existedUser.emailVerificationExpiry = expiryDate;

      sendMail({
        email: existedUser.email,
        subject: "Do not share to anyone",
        content: `OTP: ${otp}`,
      });
    }

    await existedUser.save();
    res.status(200).json(new ApiResponse(200, null, "OTP sent successfully."));
  } catch (error) {
    throw new ApiError(
      400,
      error.message || "Somthing went wrong generating a otp"
    );
  }
});

module.exports = {
  login,
  register,
  getAll,
  getSelf,
  getUserById,
  updateUser,
  sendOtp,
};
