import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/slices/userSlice';
import dp from "../assets/dp.webp";

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const { searchData } = useSelector(state => state.user);

    // 🔍 API CALL
    const handleSearch = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/user/search?keyword=${query}`,
                { withCredentials: true }
            );

            dispatch(setSearchData(result.data.users));
        } catch (error) {
            console.log(error);
        }
    };

    // ⚡ DEBOUNCE SEARCH
    useEffect(() => {
        if (query.trim() === "") {
            dispatch(setSearchData([]));
            return;
        }

        const delay = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className='w-full min-h-screen bg-black flex flex-col items-center gap-6 text-white'>

            {/* Header */}
            <div className='w-full max-w-[800px] flex items-center gap-4 py-4 px-4'>
                <MdOutlineKeyboardBackspace
                    onClick={() => navigate(-1)}
                    className='text-[28px] cursor-pointer hover:scale-110 transition'
                />
                <h1 className='text-lg font-semibold'>Search</h1>
            </div>

            {/* Search Bar */}
            <div className='w-full flex justify-center px-4'>
                <div className='w-full max-w-[800px] h-[50px] bg-[#121212] border border-gray-800 rounded-full flex items-center px-4 gap-3 focus-within:border-gray-600 transition'>

                    <IoSearch className='text-gray-400 text-[20px]' />

                    <input
                        type="text"
                        placeholder='Search users...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='bg-transparent outline-none w-full text-sm placeholder-gray-500'
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className='text-gray-400 text-sm hover:text-white'
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className='w-full max-w-[800px] px-4 flex flex-col gap-3'>

                {query === "" ? (
                    <p className='text-gray-500 text-sm text-center mt-10'>
                        Try searching for people
                    </p>
                ) : searchData?.length === 0 ? (
                    <p className='text-gray-500 text-sm text-center mt-10'>
                        No users found
                    </p>
                ) : (
                    searchData?.map((user) => (
                        <div
                            onClick={() => navigate(`/profile/${user?.userName}`)}
                            key={user._id}
                            className='flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a] cursor-pointer transition'
                        >
                            <img
                                src={user?.profileImage || dp}
                                alt="user"
                                className='w-10 h-10 rounded-full object-cover'
                            />

                            <div className='flex flex-col'>
                                <span className='text-sm font-medium'>{user?.userName}</span>
                                <span className='text-xs text-gray-400'>{user?.bio}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Search;