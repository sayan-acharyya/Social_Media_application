import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in getCurrentUser ${error}`
        })
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } })
            .select("-password")

        return res.status(200).json({
            success: true,
            users
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in suggestedUsers ${error}`
        })
    }
}