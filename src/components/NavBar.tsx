"use client"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "~/components/ui/dropdown-menu";
import {SignInButton,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs"
import { useUserData } from "~/server/user";
import Link from "next/link";

export default function NavBar() {
    const { user, signOut } = useUserData();
    return (
      <div className="flex justify-center">
          <div className="px-4 pt-2 flex justify-between items-center w-full max-w-2xl">
          <h1 className="text-3xl font-semibold text-white">Social Media Name</h1>
          <div className="flex flex-row gap-2">
            <SignedOut>
                <Button>
                    <SignInButton />
                </Button>
            </SignedOut>
            <SignedIn>
                <DropdownMenu>
                      <DropdownMenuTrigger className="ml-2">
                        <Avatar>
                          <AvatarImage src={user?.imageUrl} />
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
      </div>
        
    )
}