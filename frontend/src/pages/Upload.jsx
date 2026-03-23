import { useRef } from "react";
import { useState } from "react";
import { FiLoader, FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios"
import { serverUrl } from "../App";
import toast from "react-hot-toast";

//9:20:36
const Upload = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Post");
    const [frontendMedia, setFrontendMedia] = useState(null);
    const [backendMedia, setBackendMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const mediaInput = useRef()

    const tabs = ["Post", "Story", "Loop"];

    const handleMedia = (e) => {
        const file = e.target.files[0];
        if (file.type.includes("image")) {
            setMediaType("image");
        } else {
            setMediaType("video");
        }

        setBackendMedia(file);
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);

            const result = await axios.post(`${serverUrl}/post/upload`, formData, {
                withCredentials: true
            })

            toast.success(result.data.message || "Post Uploaded Successfully");
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "error in Post");
            setLoading(false);
        }
    }

    const uploadStory = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);

            const result = await axios.post(`${serverUrl}/story/upload`, formData, {
                withCredentials: true
            })

            toast.success(result.data.message || "Story Uploaded Successfully");
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "error in story");
            setLoading(false);
        }
    }

    const uploadLoop = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
             
            formData.append("media", backendMedia);   

            const result = await axios.post(`${serverUrl}/loop/upload`, formData, {
                withCredentials: true
            })

            toast.success(result.data.message || "Loop Uploaded Successfully");
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "error in Loop");
            setLoading(false);
        }
    }

    const handleUpload = async () => {
        // Validation
        if (!backendMedia) {
            return toast.error("Please select a file first");
        }



        try {
            if (activeTab === "Post") {
                await uploadPost();
            }
            else if (activeTab === "Story") {
                await uploadStory();
            }
            else if (activeTab === "Loop") {
                if (mediaType !== "video") {
                    return toast.error("Loop must be a video");
                }
                await uploadLoop();
            }

            // Reset after upload
            setFrontendMedia(null);
            setBackendMedia(null);
            setCaption("");
            setMediaType("");

        } catch (error) {
            toast.error("Upload failed");
        }
    };

    return (
        <div className="w-full h-screen bg-black flex flex-col items-center">

            {/* Header */}
            <div className="w-full flex items-center gap-4 px-4 py-3 mt-2">
                <MdOutlineKeyboardBackspace
                    className="text-white cursor-pointer w-6 h-6 hover:scale-110 transition"
                    onClick={() => navigate("/")}
                />

                {/* Gradient Text */}
                <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Upload Media
                </h1>
            </div>

            {/* Tabs */}
            <div className="w-[80%] max-w-[600px] h-[70px] mt-8 p-[2px] 
                rounded-full bg-gradient-to-r from-yellow-400 to-pink-500">

                <div className="w-full h-full bg-black rounded-full flex justify-around items-center">

                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-[30%] h-[80%] flex justify-center items-center text-[17px] font-semibold rounded-full cursor-pointer transition-all duration-300
                            
                            ${activeTab === tab
                                    ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black shadow-md"
                                    : "text-white hover:bg-white/10"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}

                </div>


            </div>

            {/* Upload section */}

            {
                !frontendMedia && <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
            border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px]
            mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
                    onClick={() => mediaInput.current.click()}
                >
                    <input
                        onChange={handleMedia}
                        type="file" hidden ref={mediaInput} />
                    <FiPlus
                        className="text-white cursor-pointer w-[25px] h-[25px]"
                    />
                    <div
                        className="text-white font-semibold text-[19px]"
                    >
                        Upload {activeTab}
                    </div>
                </div>
            }

            {
                frontendMedia &&
                <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]">

                    {mediaType === 'image' && activeTab !== "Loop" &&
                        <div className="w-[80%] max-w-[500px] h-[250px]
                        flex flex-col items-center justify-center mt-[5vh]">
                            <img
                                className="h-[60%] rounded-2xl"
                                src={frontendMedia}
                                alt=""
                            />
                            {
                                activeTab !== "Story" && <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full border-b-2 border-gray-600 outline-none
            px-2 py-2 text-white bg-transparent mt-3
            placeholder:text-gray-400 focus:border-pink-500 transition"
                                    placeholder="Write a caption..."
                                />
                            }

                        </div>
                    }

                    {mediaType === 'video' && activeTab !== "Story" && activeTab !== "Post" &&
                        <div className="w-[80%] max-w-[500px] h-[250px]
                        flex flex-col items-center justify-center mt-[5vh]">
                            <VideoPlayer media={frontendMedia} />
                            {
                                activeTab !== "Story" && <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full border-b-2 border-gray-600 outline-none
            px-2 py-2 text-white bg-transparent mt-3
            placeholder:text-gray-400 focus:border-pink-500 transition"
                                    placeholder="Write a caption..."
                                />
                            }

                        </div>
                    }

                </div>
            }

            {
                frontendMedia && <button className=" px-[10px] w-[60%] max-w-[400px] py-[5px]
                h-[50px] bg-gradient-to-r from-yellow-400 to-pink-500 
            text-black font-semibold
            hover:scale-105 transition mt-[50px] cursor-pointer rounded-2xl"


                    onClick={handleUpload}



                >
                    {loading ? <FiLoader className="animate-spin w-6 h-6 mx-auto" /> : `upload ${mediaType}`}
                </button>
            }
        </div>
    );
};

export default Upload;