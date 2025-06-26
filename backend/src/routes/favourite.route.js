import {Router} from "express"
import isLogin from "../middleware/login.middleware.js"
import { addFevProblems, getFevProblems, removeFevProblems } from "../controllers/fevProblem.controller.js"
import {addFevProblemValidtor, removeFevProblemValidtor} from "../validator/fevouriteList.Validator.js"
import validate from "../middleware/validator-middleware.js"

const fevProblemRoute =  Router()

fevProblemRoute.route("/").get(isLogin, getFevProblems)
fevProblemRoute.route("/add-fevourite-problem").post(addFevProblemValidtor(), validate, isLogin, addFevProblems)
fevProblemRoute.route("/remove-fevourite-problem").delete(removeFevProblemValidtor(), validate, isLogin, removeFevProblems)

export default fevProblemRoute


