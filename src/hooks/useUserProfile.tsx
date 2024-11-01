import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PrismaUser {
    id: string;
    clerkId: string;
    fullName: string;
    userName: string;
    email: string;
    image: string;
    bio: string | null;
}

const useUserProfile = () => {
    const router = useRouter();
    const { user } = useUser();
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        bio: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUserSetupComplete, setIsUserSetupComplete] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/user/${user.id}`);
                    if (response.ok) {
                        const userData = (await response.json()) as PrismaUser;
                        setFormData({
                            fullName: userData.fullName || "",
                            userName: userData.userName || "",
                            bio: userData.bio ?? "",
                        });
                        const isComplete = userData.fullName && userData.userName;
                        if (isComplete) {
                            setIsUserSetupComplete(true);
                            router.push("/");
                        }
                    } else {
                        console.error("Failed to fetch user data:", await response.text());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        void fetchUserData();
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const queryParams = new URLSearchParams({
                fullName: formData.fullName,
                userName: formData.userName.replace('@', ''),
                bio: formData.bio,
            });

            const response = await fetch(`/api/auth/new-user?${queryParams}`, {
                method: "GET",
            });

            if (response.ok || response.status === 307) {
                router.push("/");
                router.refresh();
            } else {
                const errorData = await response.text();
                console.error("Failed to create user:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        isLoading,
        isUserSetupComplete,
        handleSubmit,
        setIsLoading,
    };
};

export default useUserProfile;