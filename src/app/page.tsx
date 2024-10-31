"use client"
import NavBar from "~/components/NavBar";
import { useState } from "react";
import { useUserData } from "~/server/user";
import Post from "~/components/Post";
import useFetchPosts from "~/hooks/useFetchPosts";
import HomePostForm from "~/components/HomePostForm";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const [visiblePosts, setVisiblePosts] = useState(3)
  const { imageUrl, user, clerkId } = useUserData();
  const { posts: allPosts } = useFetchPosts('all');

  const displayedPosts = allPosts;

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  return (
    <div className="bg-neutral-800 min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center  sm:px-8 md:px-16 lg:px-32 py-4">
        
        <div className="w-full max-w-2xl bg-neutral-900 rounded-t-lg border border-neutral-700">
          <div className="flex justify-around">
            <div
              className={`w-full h-full text-center border-r border-neutral-700 cursor-pointer hover:bg-neutral-700/20 rounded-tl-lg ${
                activeTab === "forYou" ? "bg-neutral-700/20" : ""}`}
              onClick={() => setActiveTab("forYou")}>
              <h1 className="text-lg text-white font-bold select-none py-2">For You</h1>
            </div>
            <div
              className={`w-full h-full text-center border-l border-neutral-700 cursor-pointer hover:bg-neutral-700/20 rounded-tr-lg ${
                activeTab === "following" ? "bg-neutral-700/20" : ""}`}
              onClick={() => setActiveTab("following")}>
              <h1 className="text-lg text-white font-bold select-none py-2">Following</h1>
            </div>
          </div>
        </div>

        <HomePostForm userId={clerkId} imageUrl={imageUrl} />
        
          <div className="w-full md:max-w-2xl bg-neutral-900 p-4 border border-neutral-700 space-y-4">
            {displayedPosts.slice(0, visiblePosts).map((post) => (
              <Post key={post.id} post={post} />
            ))}
            {visiblePosts < displayedPosts.length && (
              <button 
                onClick={handleLoadMore} 
                className="w-full py-2 mt-2 text-center bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200"
              >
                Load More
              </button>
            )}
          </div>
        
      </div>
    </div>
  );
}
