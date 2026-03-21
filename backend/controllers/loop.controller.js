import uploadOnCloudinary from "../Config/cloudinary.js";
import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";

// ✅ Upload Loop
export const uploadLoop = async (req, res) => {
    try {
        const { caption } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Media file is required"
            });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const media = await uploadOnCloudinary(req.file.path);

        const loop = await Loop.create({
            caption,
            media,
            author: req.userId
        });

        user.loops.push(loop._id);
        await user.save();

        const populatedLoop = await Loop.findById(loop._id)
            .populate("author", "name userName profileImage");

        return res.status(201).json({
            success: true,
            message: "Loop uploaded successfully",
            populatedLoop
        });

    } catch (error) {
        console.error("Upload Loop Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading loop"
        });
    }
};

// ✅ Like / Unlike Loop
export const like = async (req, res) => {
    try {
        const { loopId } = req.params;

        const loop = await Loop.findById(loopId);
        if (!loop) {
            return res.status(404).json({
                success: false,
                message: "Loop not found"
            });
        }

        const alreadyLiked = loop.likes.some(
            id => id.toString() === req.userId.toString()
        );

        if (alreadyLiked) {
            loop.likes = loop.likes.filter(
                id => id.toString() !== req.userId.toString()
            );
        } else {
            loop.likes.push(req.userId);
        }

        await loop.save();
        await loop.populate("author", "name userName profileImage");

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Loop unliked" : "Loop liked",
            loop
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while liking loop"
        });
    }
};

// ✅ Comment on Loop
export const comment = async (req, res) => {
    try {
        const { message } = req.body;
        const { loopId } = req.params;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const loop = await Loop.findById(loopId); // ✅ FIXED
        if (!loop) {
            return res.status(404).json({
                success: false,
                message: "Loop not found"
            });
        }

        loop.comments.push({
            author: req.userId,
            message
        });

        await loop.save();

        await loop.populate("author", "name userName profileImage");
        await loop.populate("comments.author", "name userName profileImage");

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            loop
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while commenting on loop"
        });
    }
};

export const getAllLoops = async (req, res) => {
    try {
        const lopps = await Loop.find({})
            .populate("author", "name userName profileImage")
            .populate("comments.author")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            lopps
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching loops"
        });
    }
};