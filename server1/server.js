import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
});

const port = 5000;

app.listen(port, () => {
  console.log(`api working on port ${port}`);
});
