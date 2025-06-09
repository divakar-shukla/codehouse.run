import { body, param } from "express-validator";

const getSubmissionAndCountValidator = () => {
  return [
    param("problemId").trim().notEmpty().withMessage("Problem id is required"),
  ];
};

export default getSubmissionAndCountValidator;
