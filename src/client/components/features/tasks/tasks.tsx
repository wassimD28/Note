import TaskDialog from "./dialogs/taskDialog";
import { useCategoryStore } from "@/src/client/store/useCategoryStore";
import { Loader2 } from "lucide-react";
import {  Task } from "@/src/shared/types/interfaces/common.interface";
import TaskCard from "./cards/taskCard";
import { useTaskQuery } from "@/src/client/api/queries/useTaskQuery";


function Tasks() {
  const { category } = useCategoryStore();

  // Fetch tasks only when we have a category selected
  const { data, isLoading, isError } = useTaskQuery(category)

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Tasks</h1>
        </span>
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Tasks</h1>
        </span>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-red-400">Error loading tasks. Please try again.</p>
        </div>
      </div>
    );
  }

  const showList = () => {
    const tasks = data?.data || [];
    return (
      <div className="flex flex-col gap-2">
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    );
  };

  const showEmpty = () => {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p className="text-custom-white-200/60">No tasks found.</p>
        <p className="text-sm text-custom-white-200/30">Add a new task.</p>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
      <span className="flex w-full items-center justify-between">
        <h1 className="text-2xl text-gray-400">Tasks</h1>
        <TaskDialog categoryId={category.id} disabled={!category.id} />
      </span>
      {!category.id ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-400">Select a category to see tasks</p>
        </div>
      ) : (
        <div className="mt-4">
          {data?.data && data.data.length > 0 ? showList() : showEmpty()}
        </div>
      )}
    </div>
  );
}

export default Tasks;
