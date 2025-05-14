import express from "express"
import {register, login, logOut, profile} from "../controllers/auth-controller.js"
import { registerValidator, loginValidator } from "../validator/authValidator.js";
import validate from "../middleware/validator-middleware.js";
import isLogin from "../middleware/login.middleware.js";

const authRoutes = express.Router();

authRoutes.route("/register", ).post(registerValidator(), validate, register)         
authRoutes.route("/login", ).post(loginValidator(), validate, login)         
authRoutes.route("/logout", ).get(isLogin, logOut)         
authRoutes.route("/profile", ).get(isLogin, profile)         

export default authRoutes