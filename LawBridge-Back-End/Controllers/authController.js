const User = require("../Models/User");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
// Forgot Password
const crypto = require("crypto");


////  Register a new user  ////
const registerUser = async (req ,res, next ) => {
    try {
        const { firstName, lastName, email, phone, password, role } = req.body;

    // Lawyer must upload a photo of his ID card
        if (role === "lawyer" && !req.file) {
            return res.status(400).json({
                msg: "Lawyer card image is required"
            });
        }

    // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

    // Hash password    
        const hashedPassword  = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            firstName,
            lastName,
            email, 
            phone,
            password: hashedPassword,
            role,

            lawyerCardImage: 
            role === "lawyer" ? req.file.filename : null,

        // If Client automatically approved
            isApproved:
            role === "client" ? true : false
         });

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};


////  User login   //// 
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

    // Find user
        const user = await User.findOne({ email });
        if(!user) {
             return res.status(400).json({ msg: "Invalid Credentials" });
        }

    // Password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        
        if (user.role === "lawyer" && !user.isApproved) {
            return res.status(403).json({
                msg: "Your account is waiting for admin approval"
            });
        }
        
        // Token creation
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },

                process.env.JWT_SECRET,
            // for 1 day    
                { expiresIn: "1d" }
            );

            res.status(200).json({
                msg: "Login successful",
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            });
            
        } catch (error) {
            next(error);
        }
};


// Forgot Password
const forgotPassword = async (req, res, next) => {
    try{
        const user = await User.findOne({
            email:req.body.email
        });

        if(!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

        const resetToken = crypto
          .randomBytes(32)
          .toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire  = Date.now() + 15 * 60 * 100;

        await user.save();

        res.status(200).json({
            msg: "Reset link generated",
            resetToken
        });

    } catch(error) {
        next(error);
    }
};


// Reset Password
const resetPassword = async (req, res, next) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if(!user) {
            return res.status(400).json({
                msg: "Invalid or expired token"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        res.status(200).json({
            msg: "Password updated successfully"
        });

    } catch(error) {
        next(error);
    }
};



module.exports = { registerUser, loginUser, forgotPassword, resetPassword };