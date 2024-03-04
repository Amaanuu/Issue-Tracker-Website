// const mongoose = require("mongoose");
import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isIssueOwner: {
      type: Boolean,
      default: false,
    },
    occupation: {
      type: String,
      max: 50,
    },
    address: {
      type: String,
      max: 50,
    },
   
    token_value: {
      type: String,
      default: "",
    }

  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", UserSchema);
export default mongoose.model("User", userSchema)