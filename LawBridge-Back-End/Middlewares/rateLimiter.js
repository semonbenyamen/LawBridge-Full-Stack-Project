const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
// 1 minute (in milliseconds)
    windowMs: 1 * 60 * 1000,
// 3 attempts    
    max: 3,
    message: {
        status: 429,
        msg: "Too many login attempts, please try again after a minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter };