"use client"
import NavBar from "~/components/NavBar";
import { useState } from "react";
import Image from "next/image";
import { useUserData } from "~/server/user";
import { PaperclipIcon } from "lucide-react";
import { FaceIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const { imageUrl } = useUserData();

  const fillerPosts = {
    forYou: [
      { id: 1, content: "Post 1 in For You", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
      { id: 2, content: "Post 2 in For You", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
      { id: 3, content: "Post 3 in For You", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
    ],
    following: [
      { id: 4, content: "Post 1 in Following", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
      { id: 5, content: "Post 2 in Following", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
      { id: 6, content: "Post 3 in Following", username: "test", user: "@testing", created:"1h", imageUrl: "/placeholder.webp" },
    ],
  };

  const displayedPosts = activeTab === "forYou" ? fillerPosts.forYou : fillerPosts.following;

  return (
    <div className="bg-neutral-800 min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 py-2">
        
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

        <div className="w-full max-w-2xl bg-neutral-900 p-4 border-t-0 border border-neutral-700 rounded-b-lg mt-4">
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
        
        <div className="w-full max-w-2xl bg-neutral-900 p-4 border border-neutral-700 space-y-4">
          {displayedPosts.map((post) => (
            <div key={post.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
              <p className="text-white">{post.content}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
