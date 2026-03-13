import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genToken from "../Config/token.js";

export const signUp = async (req, res) => {
    try {

        const { name, userName, email, password } = req.body;

        if (!name || !userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const findByEmail = await User.findOne({ email });

        if (findByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const findByuserName = await User.findOne({ userName });

        if (findByuserName) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            userName,
            email,
            password: hashPassword
        });

        const token = genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

      return res.status(201).json({
            success: true,
            message:"User signup successfully",
            user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }
};
