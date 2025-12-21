import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";

const DeleteCategoryBtn = ({ onRefresh, category_id }: any) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState("");

  const handleDeleteCategory = async (id: string) => {
    try {
      setDeleteLoading(true);
      setDeleteCategoryId(id);

      const res = await fetch(`/api/v1/category/${id}`, {
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
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Button
      variant="destructive"
      className="ml-3"
      type="button"
      onClick={() => handleDeleteCategory(category_id)}>
      {deleteLoading && deleteCategoryId === category_id ? (
        <Spinner />
      ) : (
        <Trash2 size={30} />
      )}
    </Button>
  );
};

export default DeleteCategoryBtn;
