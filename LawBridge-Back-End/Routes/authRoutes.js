const express = require ("express");
const router = express.Router();
const upload = require("../Middlewares/uploadMiddleware");
const { registerUser, loginUser } = require("../Controllers/authController");
const { validateRegister, validateLogin } = require("../Middlewares/validators/authValidator");


// Call Rate Limit guard
const { loginLimiter } = require("../Middlewares/rateLimiter");

// Register
router.post("/register", upload.single("lawyerCardImage"), validateRegister  , registerUser);
// Login
router.post("/login", loginLimiter, validateLogin, loginUser);




module.exports = router;

