import { getUserProjects } from "@/data-access";
import { User } from "@/types";
import { GearIcon, MagicWandIcon, PlusIcon } from "@radix-ui/react-icons";
import { ProjectSelector } from "./ProjectsSelector";
import { Button } from "@/components/ui/button";
import { ProjectMemberDisplay } from "./ProjectMemberDisplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignoutButton from "../SignoutButton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

async function Header({ user }: { user: User }) {
  const projects = await getUserProjects(user.user_id);

  return (
    <section className="flex justify-between items-center pt-4 px-4 md:px-8 lg:px-16">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600"
          >
            <span className="flex items-center justify-center font-bold text-lg bg-green-400 rounded-full w-6 h-6 mr-2">
              <p>{user?.fname[0].toUpperCase()}</p>
            </span>
            <span>
              <p>Profile</p>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <div className="px-2 pb-2 flex flex-col gap-y-2">
            <span>
              <p className="font-bold text-lg overflow-hidden text-ellipsis">
                {user.fname[0].toUpperCase() + user.fname.slice(1)}&nbsp;
                {user.lname[0].toUpperCase() + user.lname.slice(1)}
              </p>
              <p className="text-sm">@{user.username}</p>
              <p className="text-sm">{user.email}</p>
            </span>
            <DropdownMenuSeparator />
            <Link href={"/settings"} className="flex items-center gap-x-1">
              <GearIcon width={20} height={20} />
              Settings
            </Link>
            <Link
              href={"https://muhammadumairkhan.vercel.app/"}
              target="_blank"
              className="flex items-center gap-x-1"
            >
              <MagicWandIcon width={20} height={20} />
              About developer
            </Link>
            <Separator />
            <SignoutButton />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-x-2">
        {projects && <ProjectMemberDisplay />}
        {projects && <ProjectSelector projects={projects} />}
        <Button
          variant="outline"
          className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600"
        >
          <PlusIcon width={20} height={20} />
          <p className="hidden md:block ml-2">Add project</p>
        </Button>
      </div>
    </section>
  );
}

export default Header;
