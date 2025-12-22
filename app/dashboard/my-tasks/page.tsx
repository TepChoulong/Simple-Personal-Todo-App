"use client";

import { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Spinner } from "@/components/ui/spinner";

import TaskItem from "../_components/tasks_item";

const MyTasks = () => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [fetchingCategoriesLoading, setFetchingCategoriesLoading] =
    useState(false);
  const [fetchingTasksLoading, setFetchingTasksLoading] = useState(false);

  const loading = fetchingCategoriesLoading && fetchingTasksLoading;

  const fetchCategories = async () => {
    try {
      setFetchingCategoriesLoading(true);
      const res = await fetch("/api/v1/category");
      const data = await res.json();
      setCategories(data.data);
      setFetchingCategoriesLoading(false);
    } catch (error) {
      setFetchingCategoriesLoading(false);
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      setFetchingTasksLoading(true);
      const res = await fetch("/api/v1/task");
      const data = await res.json();
      setTasks(data.data);
      setFetchingTasksLoading(false);
    } catch (error) {
      console.error(error);
      setFetchingTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  return (
    <div>
      {fetchingCategoriesLoading || fetchingTasksLoading ? (
        <div className="flex flex-col gap-2 justify-center items-center h-[70vh]">
          <Spinner />
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <h1 className="text-xl font-semibold">All Tasks</h1>
          <Accordion
            type="single"
            collapsible
            className="bg-sidebar px-6 rounded-2xl border">
            <AccordionItem value="all">
              <AccordionTrigger className="text-lg font-semibold">
                All
              </AccordionTrigger>
              <AccordionContent>
                {tasks.length === 0 ? (
                  <p>No tasks found</p>
                ) : (
                  <>
                    {tasks.map((task: any) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onRefresh={fetchTasks}
                      />
                    ))}
                  </>
                )}
              </AccordionContent>
            </AccordionItem>

            {categories.map((category: any) => (
              <AccordionItem value={category.name}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  {tasks.filter((task: any) => task.category === category.id)
                    .length === 0 ? (
                    <p>No tasks found</p>
                  ) : (
                    <>
                      {tasks
                        .filter((task: any) => task.category === category.id)
                        .map((task: any) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            onRefresh={fetchTasks}
                          />
                        ))}
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
