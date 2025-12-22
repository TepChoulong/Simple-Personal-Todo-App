"use client";

import { Star } from "lucide-react";
import TaskItem from "./tasks_item";

interface Tasks {
  id: string;
  title: string;
  description: string;
  category: string;
  is_important: boolean;
  is_completed: boolean;
  is_reminder: boolean;
  due_date: Date | string;
  priority: string;
}

const TasksTable = ({
  tasks,
  onRefresh,
}: {
  tasks: Tasks[];
  onRefresh: () => void;
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-xl  font-semibold">Important Tasks</h1>

      <div className="important-tasks">
        <ul className="flex flex-col space-y-4">
          {tasks.filter((task) => task.is_important === true).length === 0 ? (
            <div className="flex flex-col gap-2 w-full h-[45vh] items-center justify-center">
              <Star
                fill="gold"
                size={55}
                className="p-3 bg-accent rounded-2xl"
              />
              <p className="text-lg font-medium">No important tasks</p>
            </div>
          ) : (
            <div className="h-[45vh] flex flex-col gap-3 overflow-y-auto">
              {tasks
                .filter(
                  (task) =>
                    task.is_important === true && task.is_completed === false
                )
                .slice(0, 10)
                .map((task, index) => (
                  <TaskItem key={index} task={task} onRefresh={onRefresh} />
                ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TasksTable;
