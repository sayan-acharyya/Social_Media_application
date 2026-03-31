import React from "react";
import { FiHeart } from "react-icons/fi";
import logo from "../assets/image4.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";


const Feed = () => {
    const { postData } = useSelector(state => state.post);
    const { userData } = useSelector(state => state.user);

    const { storyList } = useSelector(state => state.story);


    return (
        <div className="lg:w-[50%] w-full bg-black h-screen relative overflow-y-auto no-scrollbar">

            {/* logo and heart icon for small devices */}
            <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
                <img
                    className="w-[100px]"
                    src={logo}
                    alt="logo"
                />

                <FiHeart className="text-pink-500 w-[25px] h-[25px]" />
            </div>

            {/* story section */}
            <div className="flex w-full overflow-x-auto gap-[20px] items-center p-[20px] no-scrollbar">
                <StoryDp
                    userName={"Your Story"}
                    profileImage={userData?.profileImage}
                    story={userData?.story}
                />
                {storyList.map((story, i) => (
                    <StoryDp
                        key={i}
                        userName={story.author.userName}
                        profileImage={story.author.profileImage}
                        story={story}
                    />
                ))}
            </div>

            {/* feed area */}
            <div className="w-full min-h-[100vh] flex flex-col items-center 
      gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] 
      pb-[120px]">
                <Nav />
                {
                    postData && postData.map((post, index) => (
                        <Post post={post} key={index} />
                    ))
                }

            </div>

        </div>
    );
};

export default Feed;