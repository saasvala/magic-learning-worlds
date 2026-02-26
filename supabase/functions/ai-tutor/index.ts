import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANGUAGE_PROMPTS: Record<string, string> = {
  en: "Respond in English.",
  fil: "Respond in Filipino (Tagalog).",
  ceb: "Respond in Cebuano.",
  ilo: "Respond in Ilocano.",
  hil: "Respond in Hiligaynon (Ilonggo).",
  bik: "Respond in Bikol.",
  war: "Respond in Waray.",
  pam: "Respond in Kapampangan.",
  pag: "Respond in Pangasinan.",
  mrw: "Respond in Maranao.",
  tsg: "Respond in Tausug.",
  mdh: "Respond in Maguindanaon.",
  tbw: "Respond in Tagbanwa.",
  ivv: "Respond in Ivatan.",
  ifb: "Respond in Ifugao.",
  kne: "Respond in Kankanaey.",
  sgd: "Respond in Surigaonon.",
  msb: "Respond in Masbateño.",
  akl: "Respond in Aklanon.",
  smk: "Respond in Sambal.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language, subject, chapter } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langInstruction = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS["en"];

    const systemPrompt = `You are a friendly, encouraging AI Tutor for Philippine K-12 students. ${langInstruction}

Your role:
- Explain concepts step-by-step with real-world Philippine examples
- Use culturally relevant references (Philippine geography, history, daily life)
- Adapt explanations to the student's grade level
- Encourage curiosity and celebrate effort
- Use emojis sparingly to keep things fun 🌟
- If the student is confused, try explaining in a simpler way
- For math/science, show the solution process step by step
${subject ? `- Current subject context: ${subject}` : ""}
${chapter ? `- Current chapter context: ${chapter}` : ""}

Keep responses concise but thorough. Never give answers directly for homework - guide the student to discover the answer themselves.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
