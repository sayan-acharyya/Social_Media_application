import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genToken from "../Config/token.js";
import sendMail from "../Config/Mail.js";

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
            message: "User signup successfully",
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

export const signIn = async (req, res) => {
    try {

        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Username or Password"
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Username or Password"
            });
        }

        const token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User signIn successfully",
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

export const signOut = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        });

        return res.status(200).json({
            success: true,
            message: "Sign Out successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }
};

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate 4 digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Save OTP in DB
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        user.isOtpVerified = false;

        await user.save();

        // Send OTP email
        await sendMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (error) {
        console.log("Send OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // OTP mismatch
        if (user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // OTP expired
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        // Mark OTP verified
        user.isOtpVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log("Verify OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to verify OTP"
        });
    }
};

export const resetPassword = async (req, res) => {
    try {

        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check OTP verification
        if (!user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                message: "OTP verification required"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        // Clear OTP data
        user.resetOtp = null;
        user.otpExpires = null;
        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {

        console.log("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to reset password"
        });

    }
};