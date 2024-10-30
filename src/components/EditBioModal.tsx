"use client";
import { useState } from "react";
import { Button } from "./ui/button";

interface EditBioModalProps {
    currentBio: string;
    setShowModal: (show: boolean) => void;
    onSaveBio: (bio: string) => void;
}

export default function EditBioModal({ currentBio, setShowModal, onSaveBio }: EditBioModalProps) {
    const [bio, setBio] = useState(currentBio || "");

    const handleSave = () => {
        onSaveBio(bio);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-neutral-900 p-6 rounded-lg max-w-3xl w-full space-y-4">
                <h2 className="text-white text-xl font-semibold">Edit Bio</h2>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell something about yourself..."
                    className="w-full p-2 rounded-md bg-neutral-800 text-white border border-neutral-700 resize-none"
                    rows={4}
                />
                <div className="flex justify-end gap-2">
                    <Button onClick={() => setShowModal(false)} variant={'destructive'}>Cancel</Button>
                    <Button onClick={handleSave} variant={'outline'} type="submit">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};