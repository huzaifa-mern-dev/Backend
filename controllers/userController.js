import { asyncError } from "../middlewares/errorMiddleware.js";
import { UserCollection } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import {
  sendToken,
  cookieOptions,
  getDataUri,
  sendEmail,
} from "../utils/features.js";
import cloudinary from "cloudinary";

export const test = asyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This Is Testtt",
  });
});

export const register = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await UserCollection.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 400));

  let avatar = undefined;

  user = await UserCollection.create({
    avatar,
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  sendToken(user, res, "Register Successfully", 201);
});

