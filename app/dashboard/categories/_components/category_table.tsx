"use client";

import AddCategoryBtn from "./add_category_btn";
import DeleteCategoryBtn from "./delete_category_btn";
import EditCategoryBtn from "./edit_category_btn";

import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Category = {
  id: string;
  name: string;
  color: string;
};

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/v1/category");
      const data = await response.json();
      setCategories(data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Categories</h1>
        <AddCategoryBtn onRefresh={fetchCategories} />
      </div>

      {loading ? (
        <div className="h-[70vh] flex flex-col justify-center items-center space-y-3">
          <Spinner />
          <h1 className="text-lg">Loading Categories...</h1>
        </div>
      ) : (
        <>
          {categories.length === 0 ? (
            <div className="h-[70vh] flex flex-col gap-2 justify-center items-center">
              <Tag size={65} className="bg-accent p-4 rounded-2xl" />
              <h1 className="text-xl">No categories found</h1>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of your categories.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] text-base font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-base font-semibold">
                    Color
                  </TableHead>
                  <TableHead className="w-[150px] text-base font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: Category, index) => (
                  <TableRow key={index}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{ background: category.color }}></div>
                    </TableCell>
                    <TableCell>
                      <EditCategoryBtn
                        onRefresh={fetchCategories}
                        category_id={category.id}
                        category_name={category.name}
                        category_color={category.color}
                      />
                      <DeleteCategoryBtn
                        onRefresh={fetchCategories}
                        category_id={category.id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default CategoryTable;
