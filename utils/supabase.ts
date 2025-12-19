import { createClient } from "@supabase/supabase-js";

import { auth } from "@clerk/nextjs/server";

export default async function supabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  const { sessionClaims, getToken } = await auth();

  if (!sessionClaims) {
    throw new Error("Missing session claims");
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  });
}
