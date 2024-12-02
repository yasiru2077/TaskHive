import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const port = 5000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use(cookieParser());


app.listen(port, () => {
  console.log(`api working on port ${port}`);
});
