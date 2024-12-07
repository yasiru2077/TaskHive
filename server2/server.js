import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


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

app.listen(port, () => {
  console.log(`API working in ${port}`);
});
