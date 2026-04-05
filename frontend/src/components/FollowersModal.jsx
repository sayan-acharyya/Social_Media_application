import React, { useState, useMemo } from "react";
import dp from "../assets/dp.webp";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

const FollowersModal = ({ open, setOpen, data = [], title }) => {
    const { userData } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // 🔥 filter logic
    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter((user) =>
            user.userName?.toLowerCase().includes(search.toLowerCase()) ||
            user.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-end md:items-center">

            {/* 🔥 MODAL */}
            <div className="w-full md:w-[420px] h-[78vh] bg-[#0f0f0f]/95 backdrop-blur-xl 
                rounded-t-3xl md:rounded-2xl flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.6)] 
                border border-white/10 animate-[fadeIn_.25s_ease]">

                {/* 🔥 HEADER */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                    <h2 className="text-white font-semibold text-lg tracking-wide capitalize">
                        {title}
                    </h2>

                    <IoMdClose
                        onClick={() => {
                            setOpen(false);
                            setSearch("");
                        }}
                        className="text-gray-400 hover:text-white text-2xl cursor-pointer transition"
                    />
                </div>

                {/* 🔥 SEARCH */}
                <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center bg-[#1c1c1c] rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-pink-500 transition">

                        <FiSearch className="text-gray-400 text-sm mr-2" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Search ${title}...`}
                            className="w-full bg-transparent text-white outline-none text-sm placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* 🔥 LIST */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-2">

                    {filteredData.length === 0 && (
                        <p className="text-gray-500 text-center mt-10 text-sm">
                            No results found
                        </p>
                    )}

                    {filteredData.map((user, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-3 py-2 rounded-xl 
                            hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
                        >
                            {/* 🔥 USER INFO */}
                            <div
                                className="flex items-center gap-3 cursor-pointer flex-1"
                                onClick={() => {
                                    navigate(`/profile/${user.userName}`);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                {/* avatar */}
                                <div className="relative">
                                    <img
                                        src={user.profileImage || dp}
                                        className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10"
                                    />
                                </div>

                                {/* name */}
                                <div className="flex flex-col leading-tight">
                                    <p className="text-white text-sm font-semibold">
                                        {user.userName}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {user.name}
                                    </p>
                                </div>
                            </div>

                            {/* 🔥 ACTION BUTTON */}
                            <button
                                onClick={() => {
                                    navigate(`/profile/${user.userName}`);
                                    setOpen(false);
                                    setSearch("");
                                }}
                                className="text-xs font-semibold px-4 py-1.5 rounded-full 
                                bg-gradient-to-tr from-pink-500 to-yellow-400 
                                text-black hover:opacity-90 active:scale-95 transition"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FollowersModal;