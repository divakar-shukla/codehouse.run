import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import healthCheck from "./controllers/healthCheck.controller.js";
import errorHandler from "./utills/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import codeExecutonRoute from "./routes/codeExecution.route.js";
import submissionRoutes from "./routes/submission.route.js";
import playListRoute from "./routes/playList.route.js";
import fevProblemRoute from "./routes/favourite.route.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1/health", healthCheck);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use("/api/v1/execute-code", codeExecutonRoute);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playListRoute);
app.use("/api/v1/favourite", fevProblemRoute);
app.use(errorHandler);
export default app;
