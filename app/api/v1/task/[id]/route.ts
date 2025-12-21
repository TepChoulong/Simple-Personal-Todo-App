import { NextRequest, NextResponse as res } from "next/server";

import { auth } from "@clerk/nextjs/server";
import supabase from "@/utils/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      title,
      description,
      due_date,
      priority,
      is_completed,
      is_important,
      is_reminder,
      category,
    } = await req.json();

    if (!id) {
      return res.json({ message: "Task ID is required" }, { status: 400 });
    }

    if (!title) {
      return res.json({ message: "Task name is required" }, { status: 400 });
    }

    if (due_date !== null) {
      if (new Date(due_date).getTime() < new Date().getTime()) {
        return res.json(
          {
            message: "Due date cannot be in the past",
          },
          { status: 400 }
        );
      }
    }

    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newTaskObject = {
      title,
      description,
      due_date:
        due_date === "" ? null : new Date(due_date).toISOString().split("T")[0],
      priority,
      is_completed,
      is_important,
      is_reminder,
      category,
    };

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("tasks")
      .update(newTaskObject)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_UPDATE_TASK]: " + error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return res.json({ message: "Task ID is required" }, { status: 400 });
    }

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[DELETE_TASK_ERROR]: " + error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}
