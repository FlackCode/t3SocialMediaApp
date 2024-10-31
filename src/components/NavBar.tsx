"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "~/components/ui/dropdown-menu";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useUserData } from "~/server/user";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import PostModal from "~/components/PostModal";

export default function NavBar() {
  const { user, signOut, imageUrl, clerkId } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="px-4 pt-4 flex justify-between items-center w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-white">DevMedia</h1>
        <div className="flex flex-row gap-2 items-center">
          <SignedOut>
            <Button>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircleIcon className="w-5 h-5" />
              <span className="font-bold">Add Post</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-2">
                <Avatar>
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex justify-center select-none">{user?.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`${user?.fullName}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="font-bold" onClick={() => signOut({redirectUrl: '/'})}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>
      </div>
      {user && <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={clerkId} />}
    </div>
  );
}
