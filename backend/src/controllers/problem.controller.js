import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import ApiError from "../utills/api-error.js";
import ApiResponse from "../utills/api-response.js";
import {
  getJudgeLanguageId,
  pollBatchResult,
  submitBatch,
} from "../lib/judge0.lib.js";

const createProblem = asyncHandler(async (req, res) => {
  // get all body data
  // validate user role
  // loop throw refference solutions for defference language

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role != "ADMIN") {
    throw new ApiError(403, "You are not authorized to create problem");
  }

  for (const [language, solutionsCode] of Object.entries(referenceSolutions)) {
    const languageId = getJudgeLanguageId(language);
    if (!languageId) {
      throw new ApiError(400, `${language} language is not supported`);
    }

    const submissions = testcases.map(({ input, output }) => ({
      language_id: languageId,
      source_code: solutionsCode,
      stdin: input,
      expected_output: output,
    }));

    const tokens = await submitBatch(submissions);

    const batchResults = await pollBatchResult(tokens);
    console.log(".......start here ", batchResults, "........end here");
    for (let i = 0; i < batchResults.length; i++) {
      const batchResult = batchResults[i];

      if (batchResult.status.id !== 3) {
        throw new ApiError(
          400,
          `Tastecase ${i + 1} failed for ${language} language`,
        );
      }
    }
  }
  try {
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newProblem, "Problem created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while creating problem", error);
  }
});
const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany();
  if (!problems.length) {
    throw new ApiError(404, "Problems not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, problems, "Problems fetched successfully"));
});
const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem fetched successfully"));
});
const updateProblem = asyncHandler(async (req, res) => {
  if (req.user.role != "ADMIN") {
    throw new ApiError(403, "You are not authorized to create problem");
  }
  const { id } = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  const isProblem = await db.problem.findUnique({ where: { id } });
  if (!isProblem) {
    throw new ApiError(404, "Problem not found");
  }

  for (const [language, solutions] of Object.entries(referenceSolutions)) {
    const languageId = getJudgeLanguageId(language);

    if (!languageId) {
      throw new ApiError(400, `${language} language is not supported`);
    }
    const submissions = testcases.map(({ input, output }) => ({
      language_id: languageId,
      source_code: solutions,
      stdin: input,
      expected_output: output,
    }));

    const tokens = await submitBatch(submissions);

    const batchResults = await pollBatchResult(tokens);

    for (let i = 0; i < batchResults.length; i++) {
      const batchResult = batchResults[i];

      if (batchResult.status.id !== 3) {
        throw new ApiError(
          400,
          `Tastecase ${i + 1} failed for ${language} language`,
        );
      }
    }
  }
  try {
    const upadateProblem = await db.problem.update({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
      where: { id },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Problem updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while updating problem", error);
  }
});
const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const problem = await db.problem.findUnique({
    where: {
      id,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  await db.problem.delete({ where: { id } });
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Problem deleted successfully"));
});
const getProblemSolvedByUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const solvedProblem = await db.problem.findMany({
    where: {
      solvedBy: {
        some: {
          userId,
        },
      },
    },
    include: {
      solvedBy: {
        where: {
          userId,
        },
      },
    },
  });
  if (!solvedProblem.length) {
    throw new ApiError(404, "Problem not found, which is solved by user");
  }
  res
    .status(200)
    .json(new ApiResponse(200, solvedProblem, "Problem fetched successfully"));
});

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getProblemSolvedByUser,
};
