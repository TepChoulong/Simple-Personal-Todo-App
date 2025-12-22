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

import { Bell, Star } from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Task {
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

const AddTask = () => {
  const router = useRouter();

  const [dataForm, setDataForm] = useState<Task>({
    title: "",
    description: "",
    priority: "low",
    category: "Uncategorized",
    due_date: null,
    is_completed: false,
    is_reminder: false,
    is_important: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!dataForm.title) {
        toast.error("Task name is required");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/v1/task", {
        method: "POST",
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
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
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
    <div className="w-[35vw] mx-auto flex flex-col space-y-6">
      <h1 className="text-4xl font-bold">New Task</h1>
      <form onSubmit={handleSubmitTask} className="flex flex-col space-y-6">
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
              onValueChange={(e) => setDataForm({ ...dataForm, priority: e })}>
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
          <div className="flex flex-col space-y-2 w-1/2">
            <Label
              htmlFor="Category"
              className="text-base text-muted-foreground font-medium">
              Category
            </Label>
            <Select
              onValueChange={(e) => setDataForm({ ...dataForm, category: e })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
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
    </div>
  );
};

export default AddTask;
