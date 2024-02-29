const { mongoose, Schema } = require("mongoose");
const { AvailableUserRoles, UserRoleValues } = require("../constant.js");
const userSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoleValues.USER,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOTP: {
      type: Number,
      select: false,
    },
    emailVerificationExpiry: {
      type: Date,
      select: false,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.FullName,
      // role : this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

module.exports = { User };
