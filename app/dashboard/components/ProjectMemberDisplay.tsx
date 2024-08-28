"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProjectContext } from "@/context/CurrentProjectContext";
import { getProjectMembers } from "@/data-access";
import { ProjectMember } from "@/types";
import { BackpackIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { useContext, useEffect, useState } from "react";

export function ProjectMemberDisplay() {
  const [members, setMembers] = useState<ProjectMember[] | null>();
  const { currentProject } = useContext(ProjectContext);

  useEffect(() => {
    if (!currentProject) return;
    const getMembers = async () => {
      const resp = await getProjectMembers(currentProject.project_id);
      setMembers(resp);
    };
    getMembers();
  }, [currentProject]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => console.log("lo")}
          className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600 "
        >
          <BackpackIcon width={20} height={20} className="mr-2" />
          <p>Members</p>
          <ChevronDownIcon width={20} height={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className=" h-72">
          <div>
            {members?.map((member) => (
              <div key={member.user_id} className="px-2 pb-2">
                <p className="font-bold">{member.fname}</p>
                <p className="text-xs">@{member.username}</p>
                <p className="text-sm">{member.role}</p>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
