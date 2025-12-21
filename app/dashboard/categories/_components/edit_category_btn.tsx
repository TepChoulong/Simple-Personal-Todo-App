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
import { Edit } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Category {
  name: string;
  color: string;
}

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

const EditCategoryBtn = ({
  onRefresh,
  category_id,
  category_name,
  category_color,
}: any) => {
  const [dataForm, setDataForm] = useState<Category>({
    name: category_name,
    color: category_color,
  });

  const [loading, setLoading] = useState(false);

  const handleSaveCategory = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch(`/api/v1/category/${id}`, {
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
      setDataForm({ name: "", color: "" });
      onRefresh();
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => handleSaveCategory(e, category_id)}
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
              onValueChange={(e) => setDataForm({ ...dataForm, color: e })}
              value={dataForm.color}>
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

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner /> <span>Saving....</span>
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryBtn;
