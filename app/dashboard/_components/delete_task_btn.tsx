import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const DeleteTaskBtn = ({
  task_id,
  onRefresh,
}: {
  task_id: string;
  onRefresh: () => void;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState("");

  const handleDeleteTask = async () => {
    try {
      setDeleteLoading(true);
      setDeleteTaskId(task_id);

      const res = await fetch(`/api/v1/task/${task_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 500) {
        toast.error(data.message);
        setDeleteLoading(false);
        return;
      }

      toast.success(data.message);
      setDeleteLoading(false);
      onRefresh();
    } catch (error) {
      setDeleteLoading(false);
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Button
      variant={"destructive"}
      onClick={() => handleDeleteTask()}
      disabled={deleteLoading}>
      {deleteLoading ? <Spinner /> : <Trash2 size={18} />}
    </Button>
  );
};

export default DeleteTaskBtn;
