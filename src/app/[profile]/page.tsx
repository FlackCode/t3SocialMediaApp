"use client";

import Image from "next/image";
import { useUserData } from "~/server/user";
import { ArrowLeftIcon, Pencil1Icon, FileTextIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import useFetchPosts from "~/hooks/useFetchPosts";
import Post from "~/components/Post";
import EditBioModal from "~/components/EditBioModal";
import { useState } from "react";
import { type Post as PostType } from "~/types";

export default function ProfilePage() {
    const { user, bio, updateBio, followersCount, followingCount, isLoading, error } = useUserData();
    const { posts: myPosts } = useFetchPosts('mine');
    const [showModal, setShowModal] = useState(false);

    if (isLoading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">{error}</div>;
    if (!user) return <div className="text-white">User not found</div>;

    return (
        <div className="flex flex-col items-center sm:px-8 md:px-16 lg:px-32 md:py-2">
            <div className="w-full max-w-2xl bg-neutral-900 p-4 md:rounded-t-lg border border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                    <Link href={'/'}>
                        <ArrowLeftIcon className="text-white w-8 h-8" />
                    </Link>
                    <div>
                        <p className="text-white font-bold text-2xl">{user?.userName}</p>
                        <p className="text-gray-400">{myPosts.length} posts</p>
                    </div>
                </div>
                <div className="flex items-center ml-4">
                    <Image
                        src={user?.image ?? "/placeholderpfp.webp"}
                        width={256}
                        height={256}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border border-neutral-800 mb-2"
                    />
                </div>
                <div className="ml-4 mb-2 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white">{user?.fullName}</h1>
                        <p className="text-gray-400">@{user?.userName ?? "username"}</p>
                    </div>
                    <button
                        className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600"
                        onClick={() => setShowModal(true)}
                    >
                        <Pencil1Icon className="text-gray-400 w-5 h-5" />
                    </button>
                </div>
                <div className="flex ml-4 space-x-4 text-gray-400">
                    <div>
                        <span className="font-bold text-white mr-1">{followingCount}</span>
                        Following
                    </div>
                    <div>
                        <span className="font-bold text-white mr-1">{followersCount}</span>
                        Followers
                    </div>
                </div>
            </div>
            <div className="w-full max-w-2xl bg-neutral-800 p-4 border border-neutral-700">
                <div className="flex justify-center items-center">
                    <p className="text-gray-400 text-center">{bio || "Add user bio!"}</p>
                </div>
            </div>
            <div className="w-full md:max-w-2xl bg-neutral-900 p-4 space-y-4 md:rounded-b-lg border border-neutral-700">
                <div className="flex items-center gap-2">
                    <FileTextIcon className="text-gray-400 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-white">Posts</h2>
                </div>
                {myPosts.length > 0 ? (
                    myPosts.map((post: PostType) => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">Currently empty...</p>
                )}
            </div>
            {showModal && (
                <EditBioModal
                    currentBio={bio}
                    setShowModal={setShowModal}
                    onSaveBio={updateBio}
                />
            )}
        </div>
    );
}
