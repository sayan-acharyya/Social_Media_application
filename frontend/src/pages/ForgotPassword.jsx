import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiLoader } from "react-icons/fi";
import { ClipLoader } from 'react-spinners';
import axios from "axios"
import { serverUrl } from '../App';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [step, setStep] = useState(1);
    const [emailClick, setEmailClick] = useState(false);
    const [otpClick, setOtpClick] = useState(false);
    const [newPasswordClick, setNewPasswordClick] = useState(false);
    const [confirmPasswordClick, setConfirmPasswordClick] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    const handleStep1 = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/auth/sendOtp`, { email }, { withCredentials: true });
            setStep(2);
            toast.success(result.data.message || "OTP sended to your email.");
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }

    const handleStep2 = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/auth/verifyOtp`, { email, otp }, { withCredentials: true });
            setStep(3);
            toast.success(result.data.message || "OTP verified successfully.");
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    const handleStep3 = async () => {
        setLoading(true);

        try {

            if (newPassword.length < 6) {
                toast.error("Password must be at least 6 characters");
                setLoading(false);
                return;
            }


            if (newPassword !== confirmPassword) {
                toast.error("Password and Confirm Password do not match");
                setLoading(false);
                return; // stop execution here
            }

            const result = await axios.post(
                `${serverUrl}/auth/resetPassword`,
                { email, newPassword },
                { withCredentials: true }
            );

            toast.success(result.data.message || "Password reset successfully.");
            navigate("/signin");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='w-full h-screen bg-gradient-to-b 
    from-black to-gray-900 flex flex-col justify-center items-center'>

            {step === 1 && (
                <div className='w-[90%] max-w-[500px] h-[300px] bg-white
        rounded-2xl flex justify-center items-center flex-col border-2 border-[#1a1f23] gap-6 p-6'>

                    <h2 className='text-[28px] font-semibold'>
                        Forgot Password
                    </h2>

                    {/* Email Input */}
                    <div
                        onClick={() => setEmailClick(true)}
                        className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
                    >
                        <label
                            htmlFor="email"
                            className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
              ${emailClick ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
                        >
                            Enter Your Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => setEmailClick(e.target.value !== "")}
                            className="w-full h-full px-4 outline-none rounded-xl"
                        />
                    </div>
                    <div className="w-[90%] flex justify-end -mt-3 cursor-pointer">
                        <Link
                            to="/signin"
                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                        >
                            Remember Password?
                        </Link>
                    </div>
                    {/* Button */}
                    <button
                        onClick={handleStep1}
                        className="w-[90%] h-[45px] bg-gradient-to-r from-yellow-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90"
                    >
                        {loading ? <div className="w-full flex justify-center items-center">
                            <FiLoader className="w-6 h-6 animate-spin mr-3" /> Sending....
                        </div> : "Send OTP"}
                    </button>

                </div>
            )}

            {step === 2 && (
                <div className='w-[90%] max-w-[500px] h-[300px] bg-white
        rounded-2xl flex justify-center items-center flex-col border-2 border-[#1a1f23] gap-6 p-6'>

                    <h2 className='text-[28px] font-semibold'>
                        Verify OTP
                    </h2>

                    {/* otp Input */}
                    <div
                        onClick={() => setOtpClick(true)}
                        className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
                    >
                        <label
                            htmlFor="otp"
                            className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
              ${otpClick ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
                        >
                            Enter Your Otp
                        </label>

                        <input
                            id="otp"
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            onBlur={(e) => setOtpClick(e.target.value !== "")}
                            className="w-full h-full px-4 outline-none rounded-xl"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleStep2}
                        className="w-[90%] h-[45px] bg-gradient-to-r from-yellow-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90"
                    >
                        {loading ? <div className="w-full flex justify-center items-center">
                            <FiLoader className="w-6 h-6 animate-spin mr-3" /> Verify OTP....
                        </div> : "Submit OTP"}
                    </button>

                </div>
            )}

            {step === 3 && (
                <div className='w-[90%] max-w-[500px] h-[360px] bg-white
  rounded-2xl flex justify-center items-center flex-col border-2 border-[#1a1f23] gap-6 p-6'>

                    <h2 className='text-[28px] font-semibold'>
                        Reset Password
                    </h2>

                    {/* New Password */}
                    <div
                        onClick={() => setNewPasswordClick(true)}
                        className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
                    >
                        <label
                            htmlFor="newPassword"
                            className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
        ${newPasswordClick ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
                        >
                            Enter New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={(e) => setNewPasswordClick(e.target.value !== "")}
                            className="w-full h-full px-4 outline-none rounded-xl"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div
                        onClick={() => setConfirmPasswordClick(true)}
                        className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
                    >
                        <label
                            htmlFor="confirmPassword"
                            className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
        ${confirmPasswordClick ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={(e) => setConfirmPasswordClick(e.target.value !== "")}
                            className="w-full h-full px-4 outline-none rounded-xl"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleStep3}
                        className="w-[90%] h-[45px] bg-gradient-to-r from-yellow-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90"
                    >
                        {loading ? (
                            <div className="w-full flex justify-center items-center">
                                <FiLoader className="w-6 h-6 animate-spin mr-3" />
                                Resetting Password...
                            </div>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                </div>
            )}

        </div>
    )
}

export default ForgotPassword