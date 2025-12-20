"use client";

import React, { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

const colors = [
  { name: "IndianRed", color: "#CD5C5C" },
  { name: "OrangeRed", color: "#FF4500" },
  { name: "	Orange", color: "#FFA500" },
  {
    name: "Yellow",
    color: "#FFFF00",
  },
  {
    name: "Gold",
    color: "#FFD700",
  },
  {
    name: "Khaki",
    color: "#F0E68C",
  },
  {
    name: "Voilet",
    color: "#EE82EE",
  },
  {
    name: "Magenta",
    color: "#FF00FF",
  },
  {
    name: "Purple",
    color: "#800080",
  },
  {
    name: "BlueViolet",
    color: "#8A2BE2",
  },
  {
    name: "DarkViolet",
    color: "#9400D3",
  },
  {
    name: "DarkOrchid",
    color: "#9932CC",
  },
  {
    name: "DarkMagenta",
    color: "#8B008B",
  },
  {
    name: "Blue",
    color: "#0000FF",
  },
  {
    name: "Navy",
    color: "#000080",
  },
];

interface Category {
  name: string;
  color: string;
}

const AddCategoryBtn = () => {
  const [dataForm, setDataForm] = useState<Category>({
    name: "",
    color: "",
  });

  const [open, setOpen] = useState(false);

  const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dataForm);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold">
          <Plus />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Add a new category to your account
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmitCategory}
          className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category_name">Name</Label>
            <Input
              type="text"
              id="category_name"
              name="category_name"
              placeholder="E.g Personal, School, Math"
              onChange={(e) =>
                setDataForm({ ...dataForm, name: e.target.value })
              }
              value={dataForm.name}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="category_name">Color</Label>
            <Select
              onValueChange={(e) => setDataForm({ ...dataForm, color: e })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>priorities</SelectLabel>
                  {colors.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full`}
                        style={{ backgroundColor: item.color }}></div>
                      <SelectItem value={item.color}>{item.name}</SelectItem>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryBtn;
