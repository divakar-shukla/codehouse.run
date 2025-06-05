import express from "express";
import isLogin from "../middleware/login.middleware.js";
import { executeCode } from "../controllers/codeExecution.controller.js";

const codeExecutonRoute = express.Router();

codeExecutonRoute.post("/", isLogin, executeCode);

export default codeExecutonRoute;
