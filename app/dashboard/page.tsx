"use client";

import { useEffect, useState } from "react";

import TasksOverview from "./_components/tasks_overview";
import TasksTable from "./_components/tasks_table";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/v1/task");
      const data = await response.json();
      setTasks(data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col gap-2 justify-center items-center h-[70vh]">
          <Spinner />
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-12">
          <TasksOverview tasks={tasks} />

          <TasksTable tasks={tasks} onRefresh={fetchTasks} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
