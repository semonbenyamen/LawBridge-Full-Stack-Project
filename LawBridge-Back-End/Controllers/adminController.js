const User = require("../Models/User");

const approveLawyer = async (req, res, next) => {
    try {
        const lawyer = await User.findById(req.params.id);

        if (!lawyer) {
            return res.status(404).json({
                msg: "Lawyer not found"
            });
        }
        
        lawyer.isApproved = true;
        await lawyer.save();
        res.status(200).json({
            msg: "Lawyer approved successfully"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { approveLawyer };