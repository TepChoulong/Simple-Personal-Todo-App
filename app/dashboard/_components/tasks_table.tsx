"use client";

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
          {tasks
            .filter((task) => task.is_important === true)
            .slice(0, 6)
            .map((task, index) => (
              <TaskItem key={index} task={task} onRefresh={onRefresh} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksTable;
