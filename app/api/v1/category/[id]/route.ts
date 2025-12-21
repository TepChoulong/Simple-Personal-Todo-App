import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse as res } from "next/server";

import supabase from "@/utils/supabase";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, color } = await req.json();

    if (!id) {
      return res.json({ message: "Category ID is required" }, { status: 400 });
    }

    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("categories")
      .update({
        name,
        color,
      })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPDATE_CATEGORY_ERROR]", error);
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

    console.log(id, userId);

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return Response.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    const supabaseClient = await supabase();

    const { error } = await supabaseClient
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE_CATEGORY_ERROR]", error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    const supabaseClient = await supabase();

    const { data, error } = await supabaseClient
      .from("categories")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json(
      { message: "Category fetched successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_CATEGORY_BY_ID_ERROR]", error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}
