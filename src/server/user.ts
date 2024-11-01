import { useState, useEffect } from 'react';
import { useUser, useClerk } from "@clerk/nextjs";

interface PrismaUser {
  id: string;
  clerkId: string;
  fullName: string;
  userName: string;
  email: string;
  image: string;
  bio: string | null;
}

export function useUserData() {
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState<PrismaUser | null>(null);
  const [bio, setBio] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useClerk();

  useEffect(() => {
    async function fetchUserData() {
      if (!clerkUser?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${clerkUser.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = (await response.json()) as PrismaUser;

        setUser(userData);
        setBio(userData.bio ?? '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUserData();
  }, [clerkUser?.id]);

  const updateBio = async (newBio: string) => {
    if (!user?.clerkId) return;

    try {
      const response = await fetch(`/api/user/${user.clerkId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bio');
      }

      const updatedUser = (await response.json()) as PrismaUser;
      setUser(updatedUser);
      setBio(newBio);
    } catch (err) {
      console.error('Error updating bio:', err);
      throw err;
    }
  };

  return {
    user,
    bio,
    updateBio,
    isLoading,
    error,
    imageUrl: user?.image ?? clerkUser?.imageUrl,
    signOut,
    clerkId: clerkUser?.id,
  };
}
