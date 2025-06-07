import { body } from "express-validator";
import { UserRole } from "../generated/prisma/index.js";

const customAvatarValidator = (value, { req }) => {
  const filename = req.file.orignalname;
  const extention = filename.split(".").pop().toLowecase();
  const allowedFile = ["jpg", "png", "jpeg"];
  return allowedFile.includes(extention);
};
const registerValidator = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be atleast 3 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),

    body("role")
      .optional()
      .isIn(Object.values(UserRole))
      .withMessage("Invalid user role"),

    body("avatar")
      .optional()
      .custom(customAvatarValidator)
      .withMessage("Only jpg and png file allowed"),
  ];
};

const loginValidator = () => {
  return [
    body("email")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Email is required"),

    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};
export { registerValidator, loginValidator };
