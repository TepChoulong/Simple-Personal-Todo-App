import EditTaskBtn from "./edit_task_btn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

import { Star, Bell, CalendarClock, Delete } from "lucide-react";
import DeleteTaskBtn from "./delete_task_btn";
import { toast } from "sonner";

const TaskItem = ({
  task,
  onRefresh,
}: {
  task: any;
  onRefresh: () => void;
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const [isDone, setIsDone] = useState(task.is_completed);

  const getCategory = async () => {
    try {
      if (task.category === "uncategorized") {
        setCategoryName("Uncategorized");
        setCategoryColor("#758A93");
        return;
      }

      const res = await fetch(`/api/v1/category/${task.category}`);

      const data = await res.json();

      setCategoryName(data.data[0].name);
      setCategoryColor(data.data[0].color);
    } catch (error) {
      console.log(error);
    }
  };

  const markTask = async () => {
    try {
      const res = await fetch(`/api/v1/task/mark/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_done: !isDone }),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 500) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setIsDone(!isDone);
      onRefresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleDateFormate = (date: string) => {
    if (new Date(date).toISOString().split("T")[0] === "1970-01-01") {
      return "No due date";
    } else {
      return new Date(date).toISOString().split("T")[0];
    }
  };

  if (categoryName === "") return null;

  return (
    <li className="border border-sidebar-accent p-4 rounded-2xl flex justify-between">
      <div className="flex items-center gap-3">
        <Input
          type="checkbox"
          className="w-6 h-6"
          checked={task.is_completed}
          onChange={() => markTask()}
        />
        <div className="w-[40vw]">
          <div className="flex items-center gap-3">
            <span
              className={`text-lg ${task.is_completed ? "line-through" : ""}`}>
              {task.title}
            </span>
            {task.is_important && <Star size={16} fill="yellow" />}
            {task.is_reminder && <Bell size={16} fill="grey" />}
            <p className="text-sm flex items-center gap-2">
              <CalendarClock size={16} />{" "}
              {handleDateFormate(task.due_date) || "No due date"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground font-bold">
              {task.priority}
            </p>
            <p
              className="text-sm rounded font-bold"
              style={{ color: categoryColor }}>
              {categoryName}
            </p>

            <p className="text-sm text-muted-foreground line-clamp-1">
              {task.description || "No description"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <EditTaskBtn task={task} onRefresh={onRefresh} />
        <DeleteTaskBtn task_id={task.id} onRefresh={onRefresh} />
      </div>
    </li>
  );
};

export default TaskItem;
