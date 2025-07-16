import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req) => {
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const res = await fetch("https://api.supabase.com/v1/projects/xnkkcpmdfpsktgrljytg/linter/run", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json"
    }
  });

  const result = await res.json();

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});