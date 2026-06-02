const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
    try{
        let token;
        
        if (
            req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")
        ) {
        // Get token from header
            token = req.headers.authorization.split(" ")[1];

        // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user data without password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } else {
            return res.status(401).json({msg: "Not authorized, no token"});
        }
    } catch (error) {
        return res.status(401).json({msg: "Not authorized"});
    }
};

module.exports = { protect  };