export function getCurrentSelectedProject(): {
  project_id: number;
  project_name: string;
} | null {
  const currentProject = localStorage.getItem("current-project");

  if (!currentProject) {
    return null;
  }

  try {
    return JSON.parse(currentProject);
  } catch (error) {
    return null;
  }
}

export function setCurrentSelectedProject(
  currentProject:
    | {
        project_id: number;
        project_name: string;
      }
    | undefined
): void {
  localStorage.setItem("current-project", JSON.stringify(currentProject));
}
