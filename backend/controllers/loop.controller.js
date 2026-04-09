import uploadOnCloudinary from "../Config/cloudinary.js";
import Loop from "../models/loop.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { io } from "../socket.js";
import { getSocketId } from "../socket.js";

 
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

        const userId = req.userId.toString();

        const alreadyLiked = loop.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {
            // 🔴 Unlike
            loop.likes = loop.likes.filter(
                id => id.toString() !== userId
            );
        } else {
            // 🟢 Like
            loop.likes.push(userId);

            // ✅ FIXED (no _id issue)
            if (loop.author.toString() !== userId) {
                const notification = await Notification.create({
                    sender: userId,
                    receiver: loop.author,
                    type: "like",
                    loop: loop._id,
                    message: "Liked your Loop"
                });

                const populatedNotification = await Notification.findById(notification._id)
                    .populate("sender receiver loop");

                const receiverSocketId = getSocketId(loop.author.toString());

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newNotification", populatedNotification);
                }
            }
        }

        await loop.save();

        await loop.populate("author", "name userName profileImage");
        await loop.populate("comments.author", "name userName profileImage");

        // 🔥 Real-time update
        io.emit("likedLoop", {
            loopId: loop._id,
            likes: loop.likes
        });

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Loop unliked" : "Loop liked",
            loop
        });

    } catch (error) {
        console.error("LIKE LOOP ERROR:", error); // ✅ IMPORTANT
        return res.status(500).json({
            success: false,
            message: "Something went wrong while liking loop"
        });
    }
};

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

        const loop = await Loop.findById(loopId);
        if (!loop) {
            return res.status(404).json({
                success: false,
                message: "Loop not found"
            });
        }

        const userId = req.userId.toString();

        // 🟢 Add comment
        loop.comments.push({
            author: userId,
            message
        });

        // ✅ FIXED (no _id issue)
        if (loop.author.toString() !== userId) {
            const notification = await Notification.create({
                sender: userId,
                receiver: loop.author,
                type: "comment",
                loop: loop._id,
                message: "Commented on your Loop"
            });

            const populatedNotification = await Notification.findById(notification._id)
                .populate("sender receiver loop");

            const receiverSocketId = getSocketId(loop.author.toString());

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newNotification", populatedNotification);
            }
        }

        await loop.save();

        await loop.populate("author", "name userName profileImage");
        await loop.populate("comments.author", "name userName profileImage");

        // 🔥 Real-time update
        io.emit("commentedLoop", {
            loopId: loop._id,
            comments: loop.comments
        });

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            loop
        });

    } catch (error) {
        console.error("COMMENT LOOP ERROR:", error); // ✅ IMPORTANT
        return res.status(500).json({
            success: false,
            message: "Something went wrong while commenting on loop"
        });
    }
};

export const getAllLoops = async (req, res) => {
    try {
        const loops = await Loop.find({})
            .populate("author", "name userName profileImage")
            .populate("comments.author")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            loops
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching loops"
        });
    }
};