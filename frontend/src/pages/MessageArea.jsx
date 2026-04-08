import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp"
import { FiSend } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import { setMessages, setSelectedUser } from '../redux/slices/messageSlice';
import SenderMessage from '../components/SenderMessage';
import ReciverMessage from '../components/ReciverMessage';
import { LuLoaderCircle } from "react-icons/lu";
import axios from 'axios';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';

const MessageArea = () => {
    const { userData } = useSelector(state => state.user);
    const { socket } = useSelector(state => state.socket);
    const { selectedUser, messages } = useSelector(state => state.message);
    const [input, setInput] = useState("");
    const imageInput = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    console.log(selectedUser);


    const [sending, setSending] = useState(false); // ✅ NEW

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFrontendImage(imageUrl);
            setBackendImage(file);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (sending) return;

        // ✅ prevent empty send
        if (!input && !backendImage) return;

        // ✅ safety check
        if (!selectedUser?._id) return;

        try {
            setSending(true);

            const formData = new FormData();
            formData.append("message", input);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            const result = await axios.post(
                `${serverUrl}/message/send/${selectedUser._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("message sent");

            // ✅ safer update
            dispatch(setMessages(prev => [...prev, result.data.newMessage]));

            setInput("");
            setFrontendImage(null);
            setBackendImage(null);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Send failed");
        } finally {
            setSending(false);
        }
    };

    const getAllMessages = async () => {
        try {
            const result = await axios.get(`${serverUrl}/message/getAll/${selectedUser._id}`,
                { withCredentials: true }
            )
            dispatch(setMessages(result.data.messages));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (selectedUser?._id) {
            const storedMessages = JSON.parse(
                localStorage.getItem(`messages_${selectedUser._id}`)
            );

            if (storedMessages) {
                dispatch(setMessages(storedMessages));
            }
        }
    }, [selectedUser]);

    useEffect(() => {
        getAllMessages();
    }, []);

    useEffect(() => {
        socket?.on("newMessage", (mess) => {
            dispatch(setMessages([...messages, mess]))
        })
        return () => socket?.off("newMessage")
    }, [messages, setMessages])

    return (
        <div className='w-full h-[100vh] bg-black flex flex-col'>

            {/* 🔥 HEADER */}
            <div className='fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10'>
                <div className='max-w-[800px] mx-auto flex items-center gap-3 px-3 py-2'>

                    <div
                        onClick={() => navigate("/")}
                        className='p-2 rounded-full hover:bg-white/10 cursor-pointer'
                    >
                        <MdOutlineKeyboardBackspace className='text-white text-[22px]' />
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='w-[38px] h-[38px] rounded-full overflow-hidden border border-white/10'>
                            <img
                                className='w-full h-full object-cover'
                                src={selectedUser?.profileImage || dp}
                                alt=""
                            />
                        </div>

                        <div className='flex flex-col leading-tight'>
                            <span className='text-white text-sm font-semibold'>
                                {selectedUser?.name || "User"}
                            </span>
                            <span className='text-gray-400 text-xs'>
                                @{selectedUser?.userName}
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* 🔥 CHAT AREA */}
            <div className='flex-1 pt-[70px] pb-[90px] overflow-y-auto no-scrollbar px-3 
    max-w-[800px] mx-auto w-full flex flex-col gap-3
    scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent'>

                {messages?.map((mess, index) => {
                    const isSender = mess?.sender === userData?._id;

                    return isSender ? (
                        <SenderMessage key={mess._id || index} message={mess} />
                    ) : (
                        <ReciverMessage key={mess._id || index} message={mess} />
                    );
                })}

            </div>

            {/* 🔥 INPUT BAR */}
            <div className='fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-2'>
                <div className='mx-auto max-w-[800px] px-3 relative'>

                    {/* 🔥 IMAGE PREVIEW */}
                    {frontendImage && (
                        <div className='absolute bottom-[70px] right-3 w-[110px] h-[110px] rounded-2xl overflow-hidden border border-white/10 shadow-lg'>
                            <img
                                src={frontendImage}
                                alt=""
                                className='w-full h-full object-cover'
                            />
                            <div
                                onClick={() => {
                                    setFrontendImage(null);
                                    setBackendImage(null);
                                }}
                                className='absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-[2px] rounded-full cursor-pointer'
                            >
                                ✕
                            </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSendMessage}
                        className='w-full h-[45px] rounded-full 
                        bg-[#131616] flex items-center gap-3 px-4 
                        focus-within:ring-1 focus-within:ring-pink-500'>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Message...'
                            className='flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-500'
                        />

                        <input
                            type='file'
                            accept='image/*'
                            ref={imageInput}
                            hidden
                            onChange={handleImage}
                        />

                        <button
                            type="button"
                            onClick={() => imageInput.current.click()}
                            className='p-2 text-white'>
                            <FaRegImage className='text-[18px] cursor-pointer' />
                        </button>

                        {(input || frontendImage) && (
                            <button
                                type="submit"
                                disabled={sending}
                                className='px-3 py-2 rounded-full bg-gradient-to-tr from-pink-600 to-yellow-400 text-black flex items-center justify-center'
                            >
                                {sending ? (
                                    <LuLoaderCircle className='text-[18px] animate-spin' />
                                ) : (
                                    <FiSend className='text-[18px]' />
                                )}
                            </button>
                        )}

                    </form>

                </div>
            </div>

        </div>
    )
}

export default MessageArea;