"use client";

import {
  getCurrentSelectedProject,
  setCurrentSelectedProject,
} from "@/lib/localstorage";
import { ProjectHeader } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

type ProjectContextType = {
  currentProject: ProjectHeader | null;
  setCurrentProjectContext: (project: ProjectHeader) => void;
};

export const ProjectContext = createContext<ProjectContextType>({
  currentProject: null,
  setCurrentProjectContext: () => {},
});

function ProjectContextProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<ProjectHeader | null>(
    null
  );

  useEffect(() => {
    const storedProject = getCurrentSelectedProject();
    if (storedProject) {
      setCurrentProject(storedProject);
    }
  }, []);

  const setCurrentProjectContext = (project: ProjectHeader) => {
    setCurrentProject(project);
    setCurrentSelectedProject(project);
  };

  return (
    <ProjectContext.Provider
      value={{ currentProject, setCurrentProjectContext }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
