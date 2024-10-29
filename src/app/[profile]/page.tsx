"use client";

import Image from "next/image";
import { useUserData } from "~/server/user";
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from "next/link";
export default function ProfilePage() {
    const { user } = useUserData();

    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 py-8">
            <div className="w-full max-w-2xl border border-neutral-300">
                <div className="flex px-4 py-2 items-center gap-2">
                    <Link href={'/'}><ArrowLeftIcon className="text-white w-8 h-8"/></Link>
                    <div>
                        <p className="text-white font-bold text-2xl">{user?.username}</p>
                        <p className="text-white">0 posts</p>
                    </div>
                </div>
                <div className="flex items-center ml-4">
                    <Image 
                        src={user?.imageUrl ?? "/placeholderpfp.webp"}
                        width={256}
                        height={256} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border border-neutral-800 mb-2"
                    />
                </div>
                <div className="ml-4 mb-2">
                    <h1 className="text-xl font-bold text-white">{user?.fullName}</h1>
                    <p className="text-gray-400">@{user?.username ?? "username"}</p>
                </div>
            </div>
            <div className="w-full max-w-2xl">
                <div className="text-center p-4 bg-neutral-800 border border-neutral-300">
                    <p className="text-gray-400">
                        Add user bio!
                    </p>
                </div>
                <div className="bg-neutral-800-800 p-4 space-y-2 border border-neutral-300">
                    <h2 className="text-xl font-semibold text-white">Posts</h2>
                    <p className="text-gray-400">Currently empty...</p>
                </div>
            </div>
        </div>
    );
}
