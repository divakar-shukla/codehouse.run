import { Router } from "express";
import isAdmin from "../middleware/admin.middleware.js";
import isLogin from "../middleware/login.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  getProblemSolvedByUser,
  updateProblem,
} from "../controllers/problem.controller.js";
import {
  createProblemValidator,
  getDeleteProblemByIdValidator,
  updateProblemValidator,
} from "../validator/problem.Validator.js";
import validate from "../middleware/validator-middleware.js";

const problemRoutes = Router();
problemRoutes
  .route("/create-problem")
  .post(createProblemValidator(), validate, isLogin, isAdmin, createProblem);
problemRoutes.route("/get-all-problem").get(isLogin, getAllProblems);
problemRoutes
  .route("/get-problem/:id")
  .get(getDeleteProblemByIdValidator(), validate, isLogin, getProblemById);
problemRoutes
  .route("/upadate-problem/:id")
  .put(updateProblemValidator(), validate, isLogin, isAdmin, updateProblem);
problemRoutes
  .route("/delete-problem/:id")
  .delete(
    getDeleteProblemByIdValidator(),
    validate,
    isLogin,
    isAdmin,
    deleteProblem,
  );
problemRoutes
  .route("/get-solved-problemByUser")
  .get(isLogin, isAdmin, getProblemSolvedByUser);

export default problemRoutes;
