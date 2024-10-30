"use client"
import NavBar from "~/components/NavBar";
import { useState } from "react";
import Image from "next/image";
import { useUserData } from "~/server/user";
import { PaperclipIcon } from "lucide-react";
import { FaceIcon } from "@radix-ui/react-icons";
import Post from "~/components/Post";
import useFetchPosts from "~/hooks/useFetchPosts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const [visiblePosts, setVisiblePosts] = useState(3)
  const { imageUrl } = useUserData();
  const { posts, loading, error } = useFetchPosts();

  const displayedPosts = posts;

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

        <div className="w-full md:max-w-2xl bg-neutral-900 p-4 border-t-0 border border-neutral-700 ">
          <div className="flex items-start gap-4">
              <Image
                src={imageUrl ? imageUrl : "/placeholderpfp.webp"}
                width={96}
                height={96}
                alt="User Profile Picture"
                className="w-12 h-12 rounded-full bg-neutral-600"
              />
              <div className="flex flex-col w-full">
                <textarea
                  placeholder="Tell the world about your day!"
                  className="w-full h-20 p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white resize-none outline-none placeholder-gray-400"
                ></textarea>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-neutral-700/30 transition-colors duration-200"
                      aria-label="Upload Image">
                      <PaperclipIcon className="text-white w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-neutral-700/30 transition-colors duration-200"
                      aria-label="Add Emoji">
                      <FaceIcon className="text-white w-5 h-5" />
                    </button>
                  </div>
                  <button className="px-4 py-1 bg-neutral-900 border border-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors duration-200">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        
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
