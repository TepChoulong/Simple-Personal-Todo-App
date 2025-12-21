import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse as res } from "next/server";
import { revalidatePath } from "next/cache";

import supabase from "@/utils/supabase";

export async function POST(req: NextRequest) {
  try {
    const supabaseClient = await supabase();

    const { userId } = await auth();
    const { name, color } = await req.json();

    if (!userId) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      return res.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    if (!color) {
      return res.json(
        { message: "Category color is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseClient
      .from("categories")
      .insert({ user_id: userId, name, color });

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    revalidatePath("/dashboard/categories");

    return res.json({ message: "Category created successfully" });
  } catch (error) {
    console.error("[CREATE_CATEGORY_ERROR]: " + error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { isAuthenticated, userId } = await auth();

    const supabaseClient = await supabase();

    if (!isAuthenticated) {
      return res.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseClient
      .from("categories")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.json({ message: error.message }, { status: 500 });
    }

    return res.json(
      { message: "Categories fetched successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET_CATEGORY_ERROR]: " + error);
    return res.json({ message: "Something went wrong" }, { status: 500 });
  }
}
