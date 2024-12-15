import type { APIRoute } from "astro";
import { processScheduleText } from "@/utils/processSchedule";
import { scheduleStore } from "@/utils/store";
import { nanoid } from "nanoid";

const OCR_API_KEY = import.meta.env.OCR_API_KEY;
const OCR_API_URL = "https://api.ocr.space/parse/image";

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("Received upload request");
    const formData = await request.formData();
    const file = formData.get("schedule") as File;

    if (!file) {
      console.log("No file provided");
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400
      });
    }

    console.log("Processing file:", file.name, "Size:", file.size);

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.log("Invalid file type:", file.type);
      return new Response(JSON.stringify({
        error: "Invalid file type. Please upload a JPEG, PNG, or WebP image."
      }), { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      console.log("File too large:", file.size);
      return new Response(JSON.stringify({
        error: "File too large. Maximum size is 5MB."
      }), { status: 400 });
    }

    // Convert file to base64 with data URI format
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64Image}`;
    console.log("Base64 image length:", dataUri.length);
    console.log("File type:", file.type);

    // Prepare OCR request
    const ocrFormData = new FormData();
    ocrFormData.append('base64Image', dataUri);
    ocrFormData.append('language', 'eng');
    ocrFormData.append('isTable', 'true');
    ocrFormData.append('OCREngine', '2');
    ocrFormData.append('filetype', file.type.split('/')[1]);
    ocrFormData.append('detectOrientation', 'true');
    ocrFormData.append('scale', 'true');

    console.log("Calling OCR.space API...");
    const ocrResponse = await fetch(OCR_API_URL, {
      method: 'POST',
      headers: {
        'apikey': OCR_API_KEY,
      },
      body: ocrFormData
    });

    console.log("OCR API Response Status:", ocrResponse.status);
    const ocrData = await ocrResponse.json();
    console.log("OCR API Response:", JSON.stringify(ocrData, null, 2));

    if (!ocrData.ParsedResults?.[0]?.ParsedText) {
      if (ocrData.ErrorMessage) {
        throw new Error(`OCR API Error: ${ocrData.ErrorMessage}`);
      }
      throw new Error("Failed to extract text from image");
    }

    const text = ocrData.ParsedResults[0].ParsedText;
    console.log("OCR Result:", text);

    // Process the extracted text
    const scheduleData = processScheduleText(text);

    // Generate unique ID and store data
    const scheduleId = nanoid(10);
    console.log("Generated scheduleId:", scheduleId);

    scheduleStore.set(scheduleId, {
      data: scheduleData,
      expiry: Date.now() + 3600000 // 1 hour
    });

    return new Response(JSON.stringify({ scheduleId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error details:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Failed to process schedule",
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500
    });
  }
};
