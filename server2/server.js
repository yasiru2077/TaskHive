import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import authRoutes from "./routes/auth.js";
import artWorkRoutes from "./routes/portfolio.js";

const port = 8000;

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
app.use("/api/artworks", artWorkRoutes);

app.listen(port, () => {
  console.log(`API working in ${port}`);
});
