import { ProjectTask } from "@/types";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

function TaskCard({ task }: { task: ProjectTask }) {
  const getTaskPriorityColor = () => {
    if (task.priority === "low") return "bg-green-500";
    if (task.priority === "medium") return "bg-yellow-500";
    if (task.priority === "high") return "bg-red-500";
  };
  return (
    <div className="max-w-screen md:max-w-72 p-3 rounded-lg bg-secondary-light-400 dark:bg-secondary-dark-600">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <h2 className="overflow-hidden text-ellipsis max-w-[15ch] text-nowrap font-bold text-lg">
            {task.title}
          </h2>
        </div>
        <DragHandleDots2Icon className=" rotate-90 w-5 h-5" />
      </div>
      <p className="my-2">{task.description}</p>
      <p className={`rounded-md text-black pl-1 ${getTaskPriorityColor()}`}>
        <span className="font-bold">Created on:</span>&nbsp;
        {task.date_of_creation}
      </p>
    </div>
  );
}

export default TaskCard;
