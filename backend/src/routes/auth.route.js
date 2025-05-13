import express from "express"
import {register} from "../controllers/auth-controller.js"
import { registerValidator } from "../validator/authValidator.js";
import validate from "../middleware/validator-middleware.js";

const authRoutes = express.Router();

authRoutes.route("/register", ).post(registerValidator(), validate, register)

export default authRoutes