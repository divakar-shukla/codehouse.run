import express from "express";
import isLogin from "../middleware/login.middleware.js";
import {
  getAllSubmission,
  getAllSubmissionsForProblem,
  getSubmissionForProblem,
} from "../controllers/submission.controller.js";

const submissionRoutes = express.Router();

submissionRoutes.route("/get-all-submisssions").get(isLogin, getAllSubmission);
submissionRoutes
  .route("/get-submisssion/:problemId")
  .get(isLogin, getSubmissionForProblem);
submissionRoutes
  .route("/get-submissions-count/:problemId")
  .get(isLogin, getAllSubmissionsForProblem);

export default submissionRoutes;
