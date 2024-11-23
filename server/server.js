const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const multer = require("multer");
const cookieParser = require("cookie-parser");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true  // Add this to allow credentials
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Changed from /server/auth to /api/auth for consistency
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("API working!");
});