import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

// initialize app
const app = express();

// default application middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// externel application middlewares
app.use(cors());
app.use(morgan("dev"));

// router
app.use("/api/v1", userRouter);
app.use("/api/v1/auth", authRouter);

// routing
app.get("/", (req, res) => {
  res.status(200).send("Wellcome to my server.");
});

// client error handler
app.use((req, res, next) => {
  res.status(404).send("route not found");
  next();
});

// server site error handler all server error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
