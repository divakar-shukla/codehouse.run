import { body, param } from "express-validator";

const codeExecuteValidator = () => {
  return [
    body("source_code")
      .trim()
      .notEmpty()
      .withMessage("Source code is required"),
    body("language_id")
      .notEmpty()
      .withMessage("Language Id is required")
      .isNumeric()
      .withMessage("Language id must be number"),
    body("stdin")
      .notEmpty()
      .withMessage("Input array Id is required")
      .isArray({ min: 3 })
      .withMessage(
        "Input is must be atleast array and lenght must be minimum 3",
      ),
    body("expected_output")
      .notEmpty()
      .withMessage("Expected output array Id is required")
      .isArray({ min: 3 })
      .withMessage(
        "Expected output is must be atleast array and lenght must be minimum 3",
      ),
    body("problemId").trim().notEmpty().withMessage("problemId is required"),
  ];
};

export default codeExecuteValidator;
