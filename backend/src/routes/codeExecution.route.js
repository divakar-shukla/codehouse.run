import express from "express";
import isLogin from "../middleware/login.middleware.js";
import { executeCode } from "../controllers/codeExecution.controller.js";
import codeExecuteValidator from "../validator/codeExecute.Validator.js";
import validate from "../middleware/validator-middleware.js";

const codeExecutonRoute = express.Router();

codeExecutonRoute.post(
  "/",
  codeExecuteValidator(),
  validate,
  isLogin,
  executeCode,
);

export default codeExecutonRoute;
