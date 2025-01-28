import { asyncError } from "../middlewares/errorMiddleware.js";

export const test = asyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This Is Testtt",
  });
});
