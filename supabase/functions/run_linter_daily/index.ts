// supabase/functions/run_linter_daily/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req) => {
  const res = await fetch("https://api.supabase.com/v1/projects/xnkkcpmdfpsktgrljytg/lint", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      filters: {
        severity: ["WARN", "ERROR"],
        facing: ["EXTERNAL"]
      }
    })
  });

  const data = await res.json();
  console.log("Linter result:", data);

  return new Response(JSON.stringify({
    message: "Linter run complete",
    details: data
  }), { status: 200 });
});
