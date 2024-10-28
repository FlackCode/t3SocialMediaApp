import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default async function Home() {
  return (
      <div className="bg-neutral-800">
        <div className="px-16 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-white">Social Media Name</h1>
          <div className="flex flex-row gap-2">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-2">
                <Avatar>
                  <AvatarImage src="/placeholderpfp.webp" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex justify-center select-none">Name</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
  );
}
