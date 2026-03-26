import uploadOnCloudinary from "../Config/cloudinary.js";
import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate("posts loops");

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

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body;

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check username only if changed
        if (userName && userName !== user.userName) {
            const sameUserWithUserName = await User.findOne({ userName });

            if (sameUserWithUserName) {
                return res.status(400).json({
                    success: false,
                    message: "UserName already exists"
                });
            }
        }

        let profileImage;

        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path);
        }

        user.name = name || user.name;
        user.userName = userName || user.userName;
        user.bio = bio || user.bio;
        user.profession = profession || user.profession;
        user.gender = gender || user.gender;

        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully 🎉",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in editProfile ${error}`
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName;

        const user = await User.findOne({ userName }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in getProfile ${error}`
        });
    }
};

export const follow = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const targetUserid = req.params.targetUserid;

        if (!targetUserid) {
            return res.status(400).json({
                success: false,
                message: "target user not found"
            })
        }

        if (targetUserid === currentUserId) {
            return res.status(400).json({
                success: false,
                message: "you can't follow to yourself"
            })
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserid);

        const isFollowing = currentUser.following.includes(targetUserid);

        if (isFollowing) {
            currentUser.following = currentUser.following.filter(id => id.toString() != targetUserid.toString());
            targetUser.followers = targetUser.followers.filter(id => id.toString() != currentUserId.toString());

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                following: false,
                message: "Unfollowed successfully",
                user: currentUser,
                profileUser: targetUser
            })
        } else {
            currentUser.following.push(targetUserid);
            targetUser.followers.push(currentUserId);

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                following: true,
                message: "followed successfully",
                user: currentUser,
                profileUser: targetUser
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `error in follow ${error}`
        });
    }
}

