const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

    // 
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

// Allowed extensions
const fileFilter = (req, file, cb) => {
// Allowed extensions    
    const allowedExtensions = /jpeg|jpg|png/;

// Check extension   
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );

// Check mimetype
    const mimetype = allowedExtensions.test(
        file.mimetype
    );

    if (mimetype && extname) {
    // file is safe pass it on    
        return cb(null, true);
    } else {
    // Reject the file and send a message  
        cb(new Error("Security Error: Only images (.jpg, .jpeg, .png) are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
    // Megabytes limit    
        fileSize: 2 * 1024 * 1024 
    }
});

module.exports = upload;