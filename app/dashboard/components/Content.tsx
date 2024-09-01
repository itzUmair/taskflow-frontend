"use client";

import { useToast } from "@/components/ui/use-toast";
import { ProjectContext } from "@/context/CurrentProjectContext";
import { getCurrentProjectTasks } from "@/data-access";
import { ProjectTask } from "@/types";
import { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function Content() {
  const { currentProject } = useContext(ProjectContext);

  const [tasks, setTasks] = useState<ProjectTask[] | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const getTasks = async (projectid: number) => {
      const tasks = await getCurrentProjectTasks(projectid);
      if (!tasks) {
        toast({
          title: "Oops!",
          description: "Couldn't fetch your tasks right now!",
        });
      }
      setTasks(tasks);
    };
    if (currentProject) {
      getTasks(currentProject.project_id);
    }
  }, [currentProject, setTasks, toast]);

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
      {tasks &&
        tasks.map((task) => <TaskCard key={task.task_id} task={task} />)}
    </div>
  );
}

export default Content;
