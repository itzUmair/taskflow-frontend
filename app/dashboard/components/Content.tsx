"use client";

import { ProjectContext } from "@/context/CurrentProjectContext";
import { useContext } from "react";

function Content() {
  const { currentProject } = useContext(ProjectContext);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center pt-4 px-4 md:px-8 lg:px-16 ">
        <p className="text-gray-500">
          You do not have any projects yet. Start by creating a new project!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-4 px-4 md:px-8 lg:px-16">
      {currentProject.project_name}
    </div>
  );
}

export default Content;
