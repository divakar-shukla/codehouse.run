import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import ApiError from "../utills/api-error.js";
import ApiResponse from "../utills/api-response.js";

const getAllSubmission = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const submissions = await db.submission.findMany({
    where: {
      userId,
    },
  });

  if (submissions.lenght) {
    throw new ApiError(404, "submission not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, submissions, "Submission fetched successfully"));
});

const getSubmissionForProblem = asyncHandler(async (req, res) => {
  
  const userId = req.user.id;
  const problemId = req.params.problemId;

  const submissions = await db.submission.findMany({
    where: {
      userId,
      problemId,
    },
  });

  if (submissions.lenght) {
    throw new ApiError(404, "submission not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, submissions, "Submission fetched successfully"));
});

const getAllSubmissionsForProblem = asyncHandler(async (req, res) => {
  const problemId = req.params.problemId;

  const submissionsCount = await db.submission.count({
    where: {
      problemId,
    },
  });

  if (!submissionsCount) {
    throw new ApiError(404, "submission not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, submissionsCount, "Submission fetched successfully"),
    );
});

export {
  getAllSubmission,
  getSubmissionForProblem,
  getAllSubmissionsForProblem,
};
