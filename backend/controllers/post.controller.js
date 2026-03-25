import uploadOnCloudinary from "../Config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// ✅ Upload Post
export const uploadPost = async (req, res) => {
    try {
        const { caption, mediaType } = req.body;

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

        const post = await Post.create({
            caption,
            media,
            mediaType,
            author: req.userId
        });

        user.posts.push(post._id);
        await user.save();

        const populatedPost = await Post.findById(post._id)
            .populate("author", "name userName profileImage");

        return res.status(201).json({
            success: true,
            message: "Post uploaded successfully",
            populatedPost
        });

    } catch (error) {
        console.error("Upload Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading post"
        });
    }
};

// ✅ Get All Posts (Feed)
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate("author", "name userName profileImage")
            .populate("comments.author", "name userName profileImage") // ✅ ADD THIS
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching posts"
        });
    }
};

// ✅ Like / Unlike Post
export const like = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.some(
            id => id.toString() === req.userId.toString()
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                id => id.toString() !== req.userId.toString()
            );
        } else {
            post.likes.push(req.userId);
        }

        await post.save();
        await post.populate("author", "name userName profileImage");
        await post.populate("comments.author", "name userName profileImage");

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Post unliked" : "Post liked",
            post
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while liking post"
        });
    }
};

// ✅ Comment on Post
export const comment = async (req, res) => {
    try {
        const { message } = req.body;
        const { postId } = req.params;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty"
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        post.comments.push({
            author: req.userId,
            message
        });

        await post.save();

        await post.populate("author", "name userName profileImage");
        await post.populate("comments.author", "name userName profileImage");

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while commenting"
        });
    }
};

// ✅ Save / Unsave Post
export const saved = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        const user = await User.findById(req.userId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const alreadySaved = user.saved.some(
            id => id.toString() === postId.toString()
        );

        if (alreadySaved) {
            user.saved = user.saved.filter(
                id => id.toString() !== postId.toString()
            );
        } else {
            user.saved.push(postId);
        }

        await user.save();
        await user.populate("saved");

        return res.status(200).json({
            success: true,
            message: alreadySaved ? "Post removed from saved" : "Post saved",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while saving post"
        });
    }
};