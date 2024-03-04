import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { passwordStrength } from "check-password-strength";


// REGISTER
export const register = async (req, res, next) => {
  let pw = req.body.password.trim()
  let uName = req.body.username.trim()
  
  try {
    //check if the username exists
    const existingUser = await User.findOne({ username: uName });
    const existingEmail = await User.findOne({ username: req.body.email });
    if (existingUser) {
      return next(createError(400, "Username already exists"));
    }
    //check if the email already exists [additional form validation]
    if (existingEmail) {
      return next(createError(400, "User with the same email already exists"));
    }
    //check if the username is less than 2 characters
    if (uName.length < 2) {
      return next(createError(400, "Username can't be less than 2 characters"));
    }
    
    
    console.log('11111111111111111')
    console.log(pw)
    console.log(uName)
    console.log('11111111111111111')
    
    //check if any of the fields are empty and return the proper error message
    if(!pw ) {
      return next(createError(400, "Password field can't be empty"))

    }
    if( !uName ) {
      return next(createError(400, "Username field can't be empty"))

    }
    if(!req.body.email) {
      return next(createError(400, "Email field can't be empty"))
      
    }
    if(!req.body.occupation ) {
      return next(createError(400, "Occupation field can't be empty"))
      
    }
    if(!req.body.address) {
      return next(createError(400, "Address field can't be empty"))
      
    }
    
    // check if email address has the correct format
    if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/)) {
      return next(createError(400, "Email address is not in the correct format"))
    }
    if(passwordStrength(pw) === "Weak"){
      return next(createError(400, "Your password's strength is too weak!"))
    }

      // const isPasswordValid = (password) => {
      const isLongEnough = pw.length >= 8;
      const containsCapitalLetter = pw.match(/[A-Z]/);
      const containsSpecialCharacter = pw.match(/[\W_]/);
      const isDifferentFromUsername = uName.includes(pw) || pw.includes(uName)
      
      if (!isLongEnough) {
      return next(createError(400, "Password must longer than 8 characters"))
      }
      if (!containsCapitalLetter) {
      return next(createError(400, "Password must contain at least one capital letter"))
      }
      if (!containsSpecialCharacter) {
      return next(createError(400, "Password must contain at least one special character"))
      }
      if (isDifferentFromUsername) {
      console.log(pw);
      return next(createError(400, "You can not include your username in the password!"))
      }

    const hash = bcrypt.hashSync(pw, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};


// LOGIN
export const login = async (req, res, next) => {
  try {
  let pw = req.body.password.trim()
  let uName = req.body.username.trim()
    // check if email address exists
    const user = await User.findOne({ username: uName });

    if (!user) return next(createError(404, "User not found!"));

    // check if password is correct
    const isCorrect = bcrypt.compareSync(pw, user.password);
    if (!isCorrect)
      return next(createError(400, "Incorrect Password!"));

    const token = jwt.sign(
      {
        id: user._id,
        isissueOwner: user.isissueOwner,
      },
      process.env.JWT_KEY
    );

    
    const { password,  ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};


// LOGOUT
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};