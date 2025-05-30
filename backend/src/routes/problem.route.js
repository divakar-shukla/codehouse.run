import { Router } from "express";
import isAdmin from "../middleware/admin.middleware.js";
import isLogin from "../middleware/login.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getProblem, getProblemSolvedByUser, updateProblem } from "../controllers/problem.controller.js";


const problemRoutes = Router();

problemRoutes.route("/create-problem").post(isLogin, isAdmin, createProblem);   
problemRoutes.route("/get-all-problem").get(isLogin, getAllProblems);   
problemRoutes.route("/get-problem:id").get(isLogin, getProblem);   
problemRoutes.route("/upadate-problem:id").put(isLogin, isAdmin, updateProblem);   
problemRoutes.route("/upadate-problem:id").delete(isLogin, isAdmin, deleteProblem);    
problemRoutes.route("/get-solved-problem").get(isLogin, isAdmin, getProblemSolvedByUser);    

export default problemRoutes;