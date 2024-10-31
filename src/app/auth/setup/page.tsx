"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";

interface PrismaUser {
    id: string;
    clerkId: string;
    fullName: string;
    userName: string;
    email: string;
    image: string;
    bio: string | null;
  }

export default function SetupPage() {
  const router = useRouter();
  const { user } = useUser();
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
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
            const userData = await response.json() as PrismaUser;
            setFormData({
              fullName: userData.fullName || "",
              username: userData.userName || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const queryParams = new URLSearchParams({
        fullName: formData.fullName,
        username: formData.username.replace('@', ''),
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

  if (isUserSetupComplete) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800">
      <Card className="w-full max-w-md bg-neutral-700">
        <CardHeader>
          <CardTitle className="text-white">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading} variant={"outline"}>
              {isLoading ? "Setting up..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
