import { NextRequest, NextResponse as res } from "next/server";
import { auth } from "@clerk/nextjs/server";
import supabase from "@/utils/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { is_done } = await req.json();

    if (!id) {
      return res.json({ message: "Task ID is required" }, { status: 400 });
    }

    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("tasks")
      .update({ is_completed: is_done })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json(
      { message: "You have successfully completed this task" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR_MARKING_TASK]: " + error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}
