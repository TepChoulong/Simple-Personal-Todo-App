"use client";

import { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Spinner } from "@/components/ui/spinner";

const Calendars = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/task");
      const data = await res.json();

      setTasks(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={tasks
            .filter((task: any) => task.is_completed === false)
            .map((task: any) => ({
              title: task.title,
              start: task.due_date,
            }))}
        />
      )}
    </div>
  );
};

export default Calendars;
