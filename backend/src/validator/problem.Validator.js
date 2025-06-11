import { body, param } from "express-validator";
import { Difficulty } from "../generated/prisma/index.js";
const createProblemValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("difficulty")
      .notEmpty()
      .withMessage("Difficulty is required")
      .isIn(Object.values(Difficulty))
      .withMessage("Invalid entry for for difficulty"),

    body("tags")
      .notEmpty()
      .withMessage("Tags is required")
      .isArray({ min: 1 })
      .withMessage("Invalid tags format"),

    body("examples")
      .notEmpty()
      .withMessage("Examples is required")
      .custom((value) => {
        if (typeof value !== "object" || value === null) {
          throw new Error("examples must be a valid object");
        }
        console.log(Object.entries(value));
        // Validate each language entry
        for (const [key, entry] of Object.entries(value)) {
          if (typeof entry !== "object" || entry === null) {
            throw new Error(`examples.${key} must be an object`);
          }

          if (typeof entry.input !== "string" || entry.input.trim() == "") {
            throw new Error(`examples.${key}.input must be a string`);
          }

          if (typeof entry.output !== "string" || entry.output.trim() == "") {
            throw new Error(`examples.${key}.output must be a string`);
          }

        }

        return true;
      }),

    body("constraints")
      .trim()
      .notEmpty()
      .withMessage("Constraints is required"),

    body("hints").optional().trim(),

    body("editorial").optional().trim(),

    body("testcases")
      .isArray({ max: 5 })
      .withMessage("min 3 and max 5 testcase are allowed"),

    body("referenceSolutions")
      .notEmpty()
      .withMessage("Reference Solutions is required")
      .custom((value) => {
        if (typeof value !== "object" || value == null) {
          throw new Error("Reference Solutions must be an valid object");
        }
        if (Object.entries(value).length < 3) {
          throw new Error(
            "Atleast three languages of reference solutions are required",
          );
        }
        for (const [key, entry] of Object.entries(value)) {
          if (typeof entry !== "string" || entry.trim() == "") {
            throw new Error(`referenceSolutions.${key} must be an string`);
          }
        }
        return true;
      }),

    body("codeSnippets")
      .notEmpty()
      .withMessage("CodeSnippets is required")
      .custom((value) => {
        if (typeof value !== "object") {
          throw new Error("CodeSnippets must be object");
        }
        if (Object.entries(value).length < 3) {
          throw new Error(
            "Atleast three languages of code snippets are required",
          );
        }
        for (const [key, entries] of Object.entries(value)) {
          if (typeof entries !== "string" || entries.trim() == "") {
            throw new Error(`Codesnippets.${key} must be string`);
          }
        }

        return true;
      }),
  ];
};

const getDeleteProblemByIdValidator = () => {
  return [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Problem Id is required")
      .isLength({ min: 10 })
      .withMessage("Id must be atleast 10 characters long"),
  ];
};

const updateProblemValidator = () => {
  return [
    param("id")
      .trim()
      .notEmpty()
      .withMessage("Problem Id is required")
      .isLength({ min: 10 })
      .withMessage("Id must be atleast 10 characters long"),

    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("difficulty")
      .notEmpty()
      .withMessage("Difficulty is required")
      .isIn(Object.values(Difficulty))
      .withMessage("Invalid entry for for difficulty"),

    body("tags")
      .notEmpty()
      .withMessage("Tags is required")
      .isArray({ min: 1 })
      .withMessage("Invalid tags format"),

    body("examples")
      .notEmpty()
      .withMessage("Examples is required")
      .custom((value) => {
        if (typeof value !== "object" || value === null) {
          throw new Error("examples must be a valid object");
        }
        console.log(Object.entries(value));
        // Validate each language entry
        for (const [key, entry] of Object.entries(value)) {
          if (typeof entry !== "object" || entry === null) {
            throw new Error(`examples.${key} must be an object`);
          }

          if (typeof entry.input !== "string" || entry.input.trim() == "") {
            throw new Error(`examples.${key}.input must be a string`);
          }

          if (typeof entry.output !== "string" || entry.output.trim() == "") {
            throw new Error(`examples.${key}.output must be a string`);
          }
        }

        return true;
      }),

    body("constraints")
      .trim()
      .notEmpty()
      .withMessage("Constraints is required"),

    body("hints").optional().trim(),

    body("editorial").optional().trim(),

    body("testcases")
      .isArray({ max: 5 })
      .withMessage("min 3 and max 5 testcase are allowed"),

    body("referenceSolutions")
      .notEmpty()
      .withMessage("Reference Solutions is required")
      .custom((value) => {
        if (typeof value !== "object" || value == null) {
          throw new Error("Reference Solutions must be an valid object");
        }
        if (Object.entries(value).length < 3) {
          throw new Error(
            "Atleast three languages of reference solutions are required",
          );
        }
        for (const [key, entry] of Object.entries(value)) {
          if (typeof entry !== "string" || entry.trim() == "") {
            throw new Error(`referenceSolutions.${key} must be an string`);
          }
        }
        return true;
      }),

    body("codeSnippets")
      .notEmpty()
      .withMessage("CodeSnippets is required")
      .custom((value) => {
        if (typeof value !== "object") {
          throw new Error("CodeSnippets must be object");
        }
        if (Object.entries(value).length < 3) {
          throw new Error(
            "Atleast three languages of code snippets are required",
          );
        }
        for (const [key, entries] of Object.entries(value)) {
          if (typeof entries !== "string" || entries.trim() == "") {
            throw new Error(`Codesnippets.${key} must be string`);
          }
        }

        return true;
      }),
  ];
};
export {
  createProblemValidator,
  getDeleteProblemByIdValidator,
  updateProblemValidator,
};
