 import { useRef, useState } from "react";
import { FiLoader, FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/slices/postSlice";
import { setLoopData } from "../redux/slices/loopSlice";
import { setStoryData } from "../redux/slices/storySlice";

const Upload = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Post");
    const [frontendMedia, setFrontendMedia] = useState(null);
    const [backendMedia, setBackendMedia] = useState(null);
    const [mediaType, setMediaType] = useState("");
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { postData } = useSelector(state => state.post);
    const { loopData } = useSelector(state => state.loop);
    const { storyData } = useSelector(state => state.story);

    const mediaInput = useRef();

    const tabs = ["Post", "Story", "Loop"];

    const showCaption = activeTab !== "Story";

    // 📁 Handle media (Loop = video only)
    const handleMedia = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isImage = file.type.includes("image");
        const isVideo = file.type.includes("video");

        // 🚨 Loop restriction
        if (activeTab === "Loop" && !isVideo) {
            return toast.error("Loop only supports video");
        }

        if (!isImage && !isVideo) {
            return toast.error("Only image or video allowed");
        }

        setMediaType(isImage ? "image" : "video");
        setBackendMedia(file);
        setFrontendMedia(URL.createObjectURL(file));
    };

    // 📤 Upload Post
    const uploadPost = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);

            const res = await axios.post(`${serverUrl}/post/upload`, formData, {
                withCredentials: true
            });

            toast.success(res.data.message || "Post Uploaded");
            dispatch(setPostData([res.data.populatedPost, ...postData]));

        } catch (error) {
            toast.error(error.response?.data?.message || "Post error");
        }
        setLoading(false);
    };

    // 📤 Upload Story (no caption)
    const uploadStory = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);

            const res = await axios.post(`${serverUrl}/story/upload`, formData, {
                withCredentials: true
            });

            toast.success(res.data.message || "Story Uploaded");
            dispatch(setStoryData([res.data.populatedStory, ...storyData]));

        } catch (error) {
            toast.error(error.response?.data?.message || "Story error");
        }
        setLoading(false);
    };

    // 📤 Upload Loop (video only)
    const uploadLoop = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("media", backendMedia);

            const res = await axios.post(`${serverUrl}/loop/upload`, formData, {
                withCredentials: true
            });

            toast.success(res.data.message || "Loop Uploaded");
            dispatch(setLoopData([res.data.populatedLoop, ...loopData]));

        } catch (error) {
            toast.error(error.response?.data?.message || "Loop error");
        }
        setLoading(false);
    };

    // 🚀 Handle Upload
    const handleUpload = async () => {
        if (!backendMedia) {
            return toast.error("Please select a file first");
        }

        // 🚨 Safety check
        if (activeTab === "Loop" && mediaType !== "video") {
            return toast.error("Loop must be a video");
        }

        try {
            if (activeTab === "Post") await uploadPost();
            else if (activeTab === "Story") await uploadStory();
            else if (activeTab === "Loop") await uploadLoop();

            // Reset
            setFrontendMedia(null);
            setBackendMedia(null);
            setCaption("");
            setMediaType("");

            navigate("/");

        } catch {
            toast.error("Upload failed");
        }
    };

    return (
        <div className="w-full h-screen bg-black flex flex-col items-center">

            {/* Header */}
            <div className="w-full flex items-center gap-4 px-4 py-3 mt-2">
                <MdOutlineKeyboardBackspace
                    className="text-white cursor-pointer w-6 h-6 hover:scale-110"
                    onClick={() => navigate("/")}
                />
                <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Upload Media
                </h1>
            </div>

            {/* Tabs */}
            <div className="w-[80%] max-w-[600px] h-[70px] mt-8 p-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-pink-500">
                <div className="w-full h-full bg-black rounded-full flex justify-around items-center">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-[30%] h-[80%] flex justify-center items-center text-[17px] font-semibold rounded-full cursor-pointer transition-all
                            ${activeTab === tab
                                    ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-black"
                                    : "text-white hover:bg-white/10"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload Box */}
            {!frontendMedia && (
                <div
                    className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
                    border-gray-800 border-2 flex flex-col items-center justify-center
                    mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
                    onClick={() => mediaInput.current.click()}
                >
                    <input
                        type="file"
                        accept={activeTab === "Loop" ? "video/*" : "image/*,video/*"}
                        hidden
                        ref={mediaInput}
                        onChange={handleMedia}
                    />
                    <FiPlus className="text-white w-[25px] h-[25px]" />
                    <div className="text-white font-semibold text-[19px]">
                        {activeTab === "Loop" ? "Upload Video Loop" : `Upload ${activeTab}`}
                    </div>
                </div>
            )}

            {/* Preview */}
            {frontendMedia && (
                <div className="w-[80%] max-w-[500px] flex flex-col items-center mt-[10vh]">

                    {mediaType === "image" && (
                        <img src={frontendMedia} className="w-full max-h-[300px] rounded-2xl" />
                    )}

                    {mediaType === "video" && (
                        <VideoPlayer media={frontendMedia} />
                    )}

                    {showCaption && (
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full border-b-2 border-gray-600 outline-none
                            px-2 py-2 text-white bg-transparent mt-4"
                            placeholder="Write a caption..."
                        />
                    )}
                </div>
            )}

            {/* Upload Button */}
            {frontendMedia && (
                <button
                    onClick={handleUpload}
                    className="w-[60%] max-w-[400px] h-[50px]
                    bg-gradient-to-r from-yellow-400 to-pink-500
                    text-black font-semibold mt-[50px] rounded-2xl hover:scale-105"
                >
                    {loading
                        ? <FiLoader className="animate-spin mx-auto" />
                        : `Upload ${activeTab}`}
                </button>
            )}
        </div>
    );
};

export default Upload;