export function getCurrentSelectedProject(): {
  project_id: number;
  project_name: string;
} | null {
  const currentProject = localStorage.getItem("current-project");

  if (!currentProject) {
    return null;
  }
  return JSON.parse(currentProject);
}

export function setCurrentSelectedProject(currentProject: {
  project_id: number;
  project_name: string;
}): void {
  localStorage.setItem("current-project", JSON.stringify(currentProject));
}
