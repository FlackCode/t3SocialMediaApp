"use client";
import useUserProfile from "~/hooks/useUserProfile";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";

export default function SetupPage() {
    const {
        formData,
        setFormData,
        isLoading,
        isUserSetupComplete,
        handleSubmit,
    } = useUserProfile();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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