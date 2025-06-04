import express from "express";
import cookieParser from "cookie-parser";
import healthCheck from "./controllers/healthCheck.controller.js";
import errorHandler from "./utills/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1/health", healthCheck);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/problem", problemRoutes);
app.use(errorHandler);
export default app;
