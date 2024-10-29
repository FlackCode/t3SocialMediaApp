"use client"

import { useClerk, useUser } from "@clerk/nextjs"

export const useUserData = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    return { user, signOut };
}