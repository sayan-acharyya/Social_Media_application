import uploadOnCloudinary from "../Config/cloudinary.js";
import Post from "../models/post.model.js";


export const uploadPost = async (req, res) => {

    try {
        const { caption, mediaType } = req.body;
        let media;
        if (req.file) {
            media = await uploadOnCloudinary(req.file.path);
        } else {
            return res.status(400).json({
                message: "media is required"
            })
        }

        const post = await Post.create({
            caption,
            media,
            mediaType,
            author: req.userId
        })

        const populatedPost  = await Post.findById(post._id).populate("author","name userName profileImage")
    } catch (error) {

    }
}