import uploadOnCloudinary from "../Config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        let image = null;

        if (req.file) {
            try {
                image = await uploadOnCloudinary(req.file.path);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed"
                });
            }
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message,
            image
        });

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [newMessage._id]
            });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        return res.status(200).json({
            success: true,
            newMessage
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in sendMessage ${error.message}`
        });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages",
            options: { sort: { createdAt: 1 } }
        });

        if (!conversation) {
            return res.status(200).json({
                success: true,
                messages: []
            });
        }

        return res.status(200).json({
            success: true,
            messages: conversation.messages
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in getAllMessages ${error.message}`
        });
    }
};


export const getPrevUserChats = async (req, res) => {
    try {
        const currentUserId = req.userId;

        const conversations = await Conversation.find({
            participants: currentUserId
        })
            .populate("participants", "userName profileImage")
            .sort({ updatedAt: -1 });

        const userMap = {};

        conversations.forEach(conv => {
            conv.participants.forEach(user => {
                if (user._id.toString() !== currentUserId.toString()) {
                    userMap[user._id] = user;
                }
            });
        });

        const previousUsers = Object.values(userMap);

        return res.status(200).json({
            success: true,
            previousUsers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in getPrevUserChats ${error.message}`
        });
    }
};


//4:25:00            