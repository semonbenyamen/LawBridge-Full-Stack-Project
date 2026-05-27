require("dotenv").config();
const express = require ("express");
const mongoose = require ("mongoose");
const authRoutes = require ("./Routes/authRoutes"); 
const errorMiddleware = require("./Middlewares/errorMiddleware");
const path = require ("path");
const adminRoutes = require("./Routes/adminRoutes");
const lawyerProfileRoutes = require("./Routes/lawyerProfileRoutes");
const app = express();

// Middleware to read the data
app.use(express.json());


// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("DB Connection Failed", err);
        process.exit(1);
    }
};
connectDB();



app.use( "/api/auth", authRoutes );

app.get("/", (req, res) => {
    res.send("LawBridge Server is Running Successfully");
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// for Admin
app.use("/api/admin", adminRoutes);

app.use("/api/profile", lawyerProfileRoutes);

// Error Middleware
// to catch any error from all routes above to stop the server from crash
app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});