"use client";

import Image from "next/image";
import { useUserData } from "~/server/user";
import { ArrowLeftIcon, Pencil1Icon, FileTextIcon } from '@radix-ui/react-icons';
import Link from "next/link";

export default function ProfilePage() {
    const { user } = useUserData();

    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 py-2">
            <div className="w-full max-w-2xl bg-neutral-900 p-4 rounded-t-lg border border-neutral-700">
                <div className="flex items-center gap-2 mb-4">
                    <Link href={'/'}>
                        <ArrowLeftIcon className="text-white w-8 h-8" />
                    </Link>
                    <div>
                        <p className="text-white font-bold text-2xl">{user?.username}</p>
                        <p className="text-gray-400">0 posts</p>
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
            <div className="w-full max-w-2xl bg-neutral-800 p-4 border border-neutral-700">
                <div className="flex justify-center items-center">
                    <p className="text-gray-400 text-center">Add user bio!</p>
                    <button className="ml-2 p-2 rounded-full bg-neutral-700 hover:bg-neutral-600">
                        <Pencil1Icon className="text-gray-400 w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="w-full max-w-2xl bg-neutral-900 p-4 space-y-4 rounded-b-lg border border-neutral-700">
                <div className="flex items-center gap-2">
                    <FileTextIcon className="text-gray-400 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-white">Posts</h2>
                </div>
                <p className="text-gray-400 text-center">Currently empty...</p>
            </div>
        </div>
    );
}
