import { body } from "express-validator";


const customAvatarValidator = (value, {req})=>{
  const filename = req.file.orignalname
  const extention = filename.split(".").pop().toLowecase();
  const allowedFile = ["jpg", "png", "jpeg"]
  return allowedFile.includes(extention)
   
}
const registerValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
      
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),

    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),

    body("avatar")
      .optional()
      .custom(customAvatarValidator)
      .withMessage("Only jpg and png file allowed")
  ];
};

const loginValidator = ()=>{
  return[
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
  ]
}
export { registerValidator, loginValidator};
