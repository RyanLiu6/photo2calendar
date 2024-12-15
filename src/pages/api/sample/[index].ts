import type { APIRoute } from "astro";
import { processScheduleText } from "@/utils/processSchedule";
import { scheduleStore } from "@/utils/store";
import { loadSampleOCRResults } from "@/utils/loadSampleData";
import { nanoid } from "nanoid";

export const GET: APIRoute = async ({ params }) => {
  const index = parseInt(params.index || '0');
  const samples = loadSampleOCRResults();

  if (index >= samples.length) {
    return new Response("Sample not found", { status: 404 });
  }

  try {
    const sample = samples[index];
    const text = sample.ocrResponse.ParsedResults[0].ParsedText;

    const scheduleEntries = processScheduleText(text);
    const scheduleId = nanoid(10);

    scheduleStore.set(scheduleId, {
      data: scheduleEntries,
      expiry: Date.now() + 3600000 // 1 hour
    });

    return new Response(JSON.stringify({ scheduleId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Sample processing error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to process schedule"
      }),
      { status: 500 }
    );
  }
};
