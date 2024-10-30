"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UserResponse {
    bio: string;
    id?: string;
    clerkId?: string;
    fullName?: string;
    userName?: string;
    email?: string;
    image?: string;
}

export const useUserData = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const imageUrl = user?.imageUrl;
    const [bio, setBio] = useState<string>("");

    useEffect(() => {
        const fetchBio = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/user/${user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch bio");
                    }
                    const data = (await response.json()) as UserResponse;
                    setBio(data.bio ?? "");
                } catch (error) {
                    console.error(error);
                }
            }
        };
        void fetchBio();
    }, [user]);

    const updateBio = async (newBio: string) => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/user/updateBio', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bio: newBio }),
            });
            if (!response.ok) {
                throw new Error("Failed to update bio");
            }
            setBio(newBio);
        } catch (error) {
            console.error(error);
        }
    };

    return { user, signOut, imageUrl, bio, setBio, updateBio };
};