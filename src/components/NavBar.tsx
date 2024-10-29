"use client"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "~/components/ui/dropdown-menu";
import {SignInButton,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs"
import { useUserData } from "~/server/user";

export default function NavBar() {
    const { user, signOut } = useUserData();
    return (
        <div className="px-16 py-4 flex justify-between items-center">
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
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem className="font-bold" onClick={() => signOut({redirectUrl: '/'})}>Sign out</DropdownMenuItem>
                      </DropdownMenuContent>
                </DropdownMenu>
            </SignedIn>
          </div>
        </div>
    )
}