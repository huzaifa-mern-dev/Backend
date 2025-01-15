import DataURIParser from "datauri/parser.js";
import path from "path";
import { createTransport } from "nodemailer";

export const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export const sendToken = async (user, res, message, statusCode) => {
  const token = await user.generateToken();

  console.log("This is Token, " + token);

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
      token,
    });
};

export const cookieOptions = {
  secure: process.env.NODE_ENV === "Development" ? true : false,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};

export const sendEmail = async (subject, to, text) => {
  const transporter = createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
