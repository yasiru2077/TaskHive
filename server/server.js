import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import tasksRoutes from "./routes/tasks.js";
import cors from "cors";
// import multer from "multer";
import cookieParser from "cookie-parser";

const port = 6000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${port}`,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(6000, () => {
  console.log(`API working on ${port}`);
});
