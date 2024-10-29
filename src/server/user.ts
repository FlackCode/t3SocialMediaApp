"use client"

import { useClerk, useUser } from "@clerk/nextjs"

export const useUserData = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const imageUrl = user?.imageUrl;
    return { user, signOut, imageUrl };
}
