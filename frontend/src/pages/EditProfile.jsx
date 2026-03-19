import React, { useRef, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import dp from "../assets/dp.webp";
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

const EditProfile = () => {

    const navigate = useNavigate();
    const { profileData, userData } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        name: profileData?.name || "",
        userName: profileData?.userName || "",
        bio: profileData?.bio || "",
        profession: profileData?.profession || "",
        gender: profileData?.gender || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const fileRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(userData?.profileImage || dp);
    const [backendImage, setBackendImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setBackendImage(file);
        }
    };

    const dispatch = useDispatch();

    const fields = [
        { name: "name", placeholder: "Enter Your Name" },
        { name: "userName", placeholder: "Enter Your Username" },
        { name: "bio", placeholder: "Bio" },
        { name: "profession", placeholder: "Profession" },
        { name: "gender", placeholder: "Gender" },
    ];

    const [loading, setLoading] = useState(false);

    const handleEditProfile = async () => {
        setLoading(true);
        try {
            const formdata = new FormData();

            formdata.append("name", formData.name);
            formdata.append("userName", formData.userName);
            formdata.append("bio", formData.bio);
            formdata.append("profession", formData.profession);
            formdata.append("gender", formData.gender);

            if (backendImage) {
                formdata.append("profileImage", backendImage);
            }

            const result = await axios.put(
                `${serverUrl}/user/editProfile`,
                formdata,
                { withCredentials: true }
            );

            dispatch(setProfileData(result.data.user));
            dispatch(setUserData(result.data.user));

            toast.success(result.data.message || "Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>

            {/* HEADER */}
            <div className='w-full max-w-[800px] flex items-center gap-4 py-4 px-4 text-white'>
                <MdOutlineKeyboardBackspace
                    onClick={() => navigate(-1)}
                    className='text-[28px] cursor-pointer hover:scale-110 transition'
                />
                <h1 className='text-[20px] font-semibold'>Edit Profile</h1>
            </div>

            {/* PROFILE IMAGE */}
            {/* PROFILE IMAGE */}
            <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] 
    rounded-full overflow-hidden p-[2px] 
    bg-gradient-to-tr from-pink-500 to-yellow-500">

                <img
                    className="w-full h-full object-cover rounded-full"
                    src={imagePreview}
                    alt="profile"
                />
            </div>

            {/* CLICK TEXT */}
            <div
                onClick={() => fileRef.current.click()}
                className='text-blue-500 text-center text-[18px] font-semibold cursor-pointer hover:underline'
            >
                Change Your Profile Picture
            </div>

            {/* HIDDEN INPUT */}
            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleImageChange}
                className="hidden "
            />
            {/* INPUTS */}
            {
                fields.map((field, index) => (
                    <input
                        key={index}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white
                        border-2 border-gray-700 rounded-2xl px-[20px]
                        outline-none placeholder:text-gray-400 font-semibold
                        focus:border-pink-500 transition'
                        type="text"
                        placeholder={field.placeholder}
                    />
                ))
            }

            {/* BUTTON */}
            <button className='w-[60%] max-w-[400px] h-[50px] 
               bg-blue-600
                text-white font-semibold rounded-2xl mb-5 
                hover:opacity-90 transition'
                onClick={handleEditProfile}
            >
                {loading ? <div className="w-full flex justify-center items-center">
                    <FiLoader className="w-6 h-6 animate-spin mr-3" /> Updating....
                </div> : "Save Profile"}
            </button>

        </div>
    )
}

export default EditProfile;