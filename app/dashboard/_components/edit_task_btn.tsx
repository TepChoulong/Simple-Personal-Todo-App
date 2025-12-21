"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Bell, Edit, Star } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id?: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  due_date: string | null;
  is_completed: boolean;
  is_reminder: boolean;
  is_important: boolean;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

const EditTaskBtn = ({
  task,
  onRefresh,
}: {
  task: Task;
  onRefresh: () => void;
}) => {
  const router = useRouter();

  const [dataForm, setDataForm] = useState<Task>({
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    due_date: task.due_date,
    is_completed: task.is_completed,
    is_reminder: task.is_reminder,
    is_important: task.is_important,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setOpen(true);

      if (!dataForm.title) {
        toast.error("Task name is required");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/v1/task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 500) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success(data.message);
      setDataForm({
        title: "",
        description: "",
        priority: "LOW",
        category: "uncategorized",
        due_date: null,
        is_completed: false,
        is_reminder: false,
        is_important: false,
      });
      onRefresh();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const formatDate = (date: string) => {
    if (date === "1970-01-01T00:00:00") return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/v1/category");
      const data = await res.json();
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Edit className="" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update your task details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSaveTask} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="title"
              className="text-base text-muted-foreground font-medium">
              Task Name
            </Label>
            <Input
              type="text"
              placeholder="What needs to be done?"
              className="p-4 font-medium"
              onChange={(e) =>
                setDataForm({ ...dataForm, title: e.target.value })
              }
              value={dataForm.title}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col space-y-2 w-1/2">
              <Label
                htmlFor="priority"
                className="text-base text-muted-foreground font-medium">
                Priority
              </Label>
              <Select
                value={dataForm.priority}
                onValueChange={(e) =>
                  setDataForm({ ...dataForm, priority: e })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>priorities</SelectLabel>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
              <Label
                htmlFor="due date"
                className="text-base text-muted-foreground font-medium">
                Due Date
              </Label>
              <Input
                type="date"
                placeholder="What needs to be done?"
                className="p-4 font-medium w-full"
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    due_date: e.target.value,
                  })
                }
                value={dataForm.due_date || ""}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="description"
              className="text-base text-muted-foreground font-medium">
              Description
            </Label>
            <Textarea
              placeholder="Add dettails, subtasks, or links..."
              className="p-4 font-medium h-24 resize-none"
              onChange={(e) =>
                setDataForm({ ...dataForm, description: e.target.value })
              }
              value={dataForm.description}
            />
          </div>

          <div className="flex space-y-2 justify-between items-center">
            <div className="flex items-center gap-4">
              <Bell size={55} className="p-3 bg-accent rounded-full" />
              <div>
                <h1 className="font-semibold">Remind me</h1>
                <p className="text-sm text-muted-foreground">
                  Get notified when task is due
                </p>
              </div>
            </div>

            <div>
              <Switch
                onCheckedChange={(e) =>
                  setDataForm({ ...dataForm, is_reminder: e })
                }
                checked={dataForm.is_reminder}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-2 w-1/3">
              <Label
                htmlFor="Category"
                className="text-base text-muted-foreground font-medium">
                Category
              </Label>
              <Select
                value={dataForm.category || "uncategorized"}
                onValueChange={(e) =>
                  setDataForm({ ...dataForm, category: e })
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.length === 0 ? (
                      <SelectItem value="uncategorized">None</SelectItem>
                    ) : (
                      <>
                        <SelectItem value="uncategorized">None</SelectItem>
                        {categories.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-y-2 justify-between items-center gap-12">
              <div className="flex items-center gap-4">
                <Star size={55} className="p-3 bg-yellow-500/30 rounded-full" />
                <div>
                  <h1 className="font-semibold">important</h1>
                  <p className="text-sm text-muted-foreground">
                    Mark task as important
                  </p>
                </div>
              </div>

              <div>
                <Switch
                  onCheckedChange={(e) =>
                    setDataForm({ ...dataForm, is_important: e })
                  }
                  checked={dataForm.is_important}
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> <span>Creating...</span>
                </>
              ) : (
                "Create task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskBtn;
