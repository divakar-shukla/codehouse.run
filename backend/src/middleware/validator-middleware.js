import { validationResult } from "express-validator";
import ApiError from "../utills/api-error.js";

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    next();
  }

  const extractError = [];

  error.array().map((err) => {
    const errorpath = err.path;
    extractError.push({ errorMessage: err.msg, path: errorpath });
  });

  return res
    .status(401)
    .json(new ApiError(401, "Givent data is not valid", extractError));
};
