import { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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

const TasksOverview = ({ tasks }: { tasks: Tasks[] }) => {
  const total_tasks = tasks.length;
  const total_completed_tasks = tasks.filter(
    (task) => task.is_completed === true
  ).length;
  const total_important_tasks = tasks.filter(
    (task) => task.is_important === true
  ).length;

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className=" grid grid-cols-3 gap-8">
        <Card id="total-uncompleted-tasks">
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
            <CardDescription>
              View all tasks that are not completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-semibold">{total_tasks}</span>
          </CardContent>
        </Card>

        <Card id="total-important-uncompleted-tasks">
          <CardHeader>
            <CardTitle>Total Important Tasks</CardTitle>
            <CardDescription>
              View all the important tasks that are not completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-semibold">
              {total_important_tasks}
            </span>
          </CardContent>
        </Card>

        <Card id="total-completed-tasks">
          <CardHeader>
            <CardTitle>Total Completed Tasks</CardTitle>
            <CardDescription>View all tasks that are completed</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-semibold">
              {total_completed_tasks}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksOverview;
