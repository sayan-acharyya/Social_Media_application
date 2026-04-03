import React, { useState, useMemo } from "react";
import dp from "../assets/dp.webp";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowButton from "./FollowButton";

const FollowersModal = ({ open, setOpen, data = [], title }) => {
    const { userData } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // ✅ ALWAYS RUN HOOKS FIRST
    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter((user) =>
            user.userName?.toLowerCase().includes(search.toLowerCase()) ||
            user.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data]);

    // ✅ AFTER hooks
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-end md:items-center">

            <div className="w-full md:w-[420px] h-[75vh] bg-[#0b0b0b] rounded-t-3xl md:rounded-2xl flex flex-col shadow-2xl border border-white/10">

                {/* HEADER */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                    <h2 className="text-white font-semibold text-lg capitalize">
                        {title}
                    </h2>

                    <IoMdClose
                        onClick={() => {
                            setOpen(false);
                            setSearch("");
                        }}
                        className="text-gray-400 hover:text-white text-2xl cursor-pointer"
                    />
                </div>

                {/* SEARCH */}
                <div className="px-4 py-3 border-b border-white/10">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={`Search ${title}...`}
                        className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-xl outline-none text-sm"
                    />
                </div>

                {/* LIST */}
                <div className="flex-1 overflow-y-auto no-scrollbar  px-3 py-3 space-y-2">

                    {filteredData.length === 0 && (
                        <p className="text-gray-500 text-center mt-10 text-sm">
                            No results found
                        </p>
                    )}

                    {filteredData.map((user, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition"
                        >
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => {
                                    navigate(`/profile/${user.userName}`);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                <img
                                    src={user.profileImage || dp}
                                    className="w-11 h-11 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-white text-sm font-semibold">
                                        {user.userName}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {user.name}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    navigate(`/profile/${user.userName}`);
                                    setOpen(false);
                                    setSearch("");
                                }}

                                className="bg-gradient-to-tr from-yellow-400 to-pink-500 transition active:scale-95 text-black font-semibold cursor-pointer px-3    rounded-full">View</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowersModal;