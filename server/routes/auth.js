const express = require("express");
const { login, register, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

// Export just the router, not an object containing the router
module.exports = router;