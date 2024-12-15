import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export interface OCRResult {
  metadata: {
    timestamp: string;
    fileType: string;
    fileSize: number;
    fileName: string;
  };
  ocrResponse: {
    ParsedResults: Array<{
      ParsedText: string;
    }>;
  };
}

export function loadSampleOCRResults(): OCRResult[] {
  const ocrPath = join(process.cwd(), 'ocr-results');
  try {
    const files = readdirSync(ocrPath)
      .filter(file => file.endsWith('.json'))
      .sort(); // Sort to ensure consistent order

    return files.map(file => {
      const content = readFileSync(join(ocrPath, file), 'utf-8');
      return JSON.parse(content) as OCRResult;
    });
  } catch (error) {
    console.error('Error loading OCR results:', error);
    return [];
  }
}
