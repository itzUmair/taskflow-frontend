"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectContext } from "@/context/CurrentProjectContext";
import { ProjectHeader } from "@/types";
import { BackpackIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { useContext, useEffect, useState } from "react";

export function ProjectSelector({ projects }: { projects: ProjectHeader[] }) {
  const [project, setProject] = useState<string>();
  const { currentProject, setCurrentProjectContext } =
    useContext(ProjectContext);

  useEffect(() => {
    if (currentProject) {
      setProject(currentProject.project_name);
    } else {
      setCurrentProjectContext(projects[0]);
    }
  }, [currentProject, projects, setCurrentProjectContext]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600 "
        >
          <BackpackIcon width={20} height={20} className="mr-2" />
          <p className="overflow-hidden max-w-[10ch] text-ellipsis">
            {project}
          </p>
          <ChevronDownIcon width={20} height={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={project} onValueChange={setProject}>
          {projects.map((proj) => (
            <DropdownMenuRadioItem
              key={proj.project_id}
              value={proj.project_name}
              onClick={() => setCurrentProjectContext(proj)}
            >
              {proj.project_name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
