import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

import supabaseAdmin from "@/utils/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const supabaseClient = await supabaseAdmin();

      const { error } = await supabaseClient
        .from("categories")
        .insert({ user_id: id, name: "Uncategorized", color: "#71797E" });

      if (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
