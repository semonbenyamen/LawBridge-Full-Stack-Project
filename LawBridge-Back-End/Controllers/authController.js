const User = require("../Models/User");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");


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
            role === "client" ? false : true
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

module.exports = { registerUser, loginUser };