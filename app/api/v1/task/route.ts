import supabase from "@/utils/supabase";

import { NextRequest, NextResponse as res } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

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

    if (!userId) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
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

    const new_task_object = {
      title,
      description,
      due_date: new Date(due_date).toISOString(),
      priority,
      is_completed,
      is_important,
      is_reminder,
      category,
    };

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("tasks")
      .insert(new_task_object);

    if (error) {
      console.log(error);
      return res.json({ message: error.message }, { status: 400 });
    }

    return res.json({ message: "Task created successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
