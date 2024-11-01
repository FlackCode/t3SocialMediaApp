"use client";

import Image from "next/image";
import { ArrowLeftIcon, FileTextIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from "react";
import Post from "~/components/Post";
import { type FollowStatusResponse, type ToggleFollowResponse, type Post as PostType, type User } from "~/types";
import { useParams, useRouter } from "next/navigation";

export default function UserProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;

    const handleFollowToggle = async () => {
        if (!user) return;
    
        try {
            const response = await fetch(`/api/user/toggleFollow/${username}`, {
                method: 'POST',
            });
    
            if (!response.ok) {
                throw new Error("Failed to toggle follow status");
            }
    
            const data = (await response.json()) as ToggleFollowResponse;
            setIsFollowing(data.followed);
            setFollowersCount(data.followers);
            setFollowingCount(data.following);
        } catch (err) {
            console.error("Error toggling follow status", err);
        }
    };    
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [userResponse, postsResponse, followStatusResponse] = await Promise.all([
                    fetch(`/api/user/fetchByUsername/${username}`),
                    fetch(`/api/user/fetchByUsername/${username}/posts`),
                    fetch(`/api/user/followStatus/${username}`)
                ]);
    
                if (!userResponse.ok || !postsResponse.ok || !followStatusResponse.ok) {
                    throw new Error("Failed to fetch user data");
                }
    
                const userData = await userResponse.json() as User;
                const postsData = await postsResponse.json() as PostType[];
                const followStatusData = await followStatusResponse.json() as FollowStatusResponse;
                console.log(followStatusData);
                setUser(userData);
                setPosts(postsData);
                setIsFollowing(followStatusData.isFollowing);
                setFollowersCount(followStatusData.followersCount);
                setFollowingCount(followStatusData.followingCount);
            } catch (err) {
                setError("Error fetching user data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        void fetchUserData();
    }, [username]);

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">{error}</div>;
    if (!user) return <div className="text-white">User not found</div>;

    return (
        <div className="flex flex-col items-center sm:px-8 md:px-16 lg:px-32 md:py-2">
            <div className="w-full max-w-2xl bg-neutral-900 p-4 md:rounded-t-lg border border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeftIcon className="text-white w-8 h-8" />
                    </button>
                    <div className="flex-grow">
                        <p className="text-white font-bold text-2xl">{user.userName}</p>
                        <p className="text-gray-400">{posts.length} posts</p>
                    </div>
                </div>
                <div className="flex items-center ml-4">
                    <Image
                        src={user.image ?? "/placeholderpfp.webp"}
                        width={256}
                        height={256}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border border-neutral-800 mb-2"
                    />
                </div>
                <div className="ml-4 mb-2 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white">{user.fullName}</h1>
                        <p className="text-gray-400">@{user.userName}</p>
                    </div>
                    <button 
                        onClick={handleFollowToggle}
                        className={`px-4 py-2 rounded-full text-sm font-semibold 
                            ${isFollowing 
                                ? 'bg-neutral-700 text-white' 
                                : 'bg-white text-black hover:bg-gray-200'
                            }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
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
                    <p className="text-gray-400 text-center">{user.bio ?? "No bio available"}</p>
                </div>
            </div>
            <div className="w-full md:max-w-2xl bg-neutral-900 p-4 space-y-4 md:rounded-b-lg border border-neutral-700">
                <div className="flex items-center gap-2">
                    <FileTextIcon className="text-gray-400 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-white">Posts</h2>
                </div>
                {posts.length > 0 ? (
                    posts.map((post: PostType) => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No posts yet</p>
                )}
            </div>
        </div>
    );
}