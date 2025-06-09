import express from "express";
import isLogin from "../middleware/login.middleware.js";
import {
  getAllSubmission,
  getAllSubmissionsForProblem,
  getSubmissionForProblem,
} from "../controllers/submission.controller.js";
import getSubmissionAndCountValidator from "../validator/submission.validator.js";
import validate from "../middleware/validator-middleware.js";

const submissionRoutes = express.Router();

submissionRoutes.route("/get-all-submisssions").get(isLogin, getAllSubmission);
submissionRoutes
  .route("/get-submisssion/:problemId")
  .get(
    getSubmissionAndCountValidator(),
    validate,
    isLogin,
    getSubmissionForProblem,
  );
submissionRoutes
  .route("/get-submissions-count/:problemId")
  .get(
    getSubmissionAndCountValidator(),
    validate,
    isLogin,
    getAllSubmissionsForProblem,
  );

export default submissionRoutes;
