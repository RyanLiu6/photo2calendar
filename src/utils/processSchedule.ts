export interface ScheduleEntry {
  name: string;
  date: string;
  shift: string;
}

interface ShiftTime {
  start: string;
  end: string;
}

const SHIFT_PATTERNS: Record<string, ShiftTime> = {
  "830-5": { start: "08:30", end: "17:00" },
  "930-6": { start: "09:30", end: "18:00" },
  "1130-8": { start: "11:30", end: "20:00" },
  "130-10": { start: "13:30", end: "22:00" },
  "1030-7": { start: "10:30", end: "19:00" },
  "10-630": { start: "10:00", end: "18:30" },
  "9-530": { start: "09:00", end: "17:30" },
  "330-10": { start: "15:30", end: "22:00" },
  "830 5": { start: "08:30", end: "17:00" },
};

function normalizeShiftPattern(input: string): string | null {
  const cleaned = input.replace(/[^0-9-]/g, '');

  if (SHIFT_PATTERNS[cleaned]) {
    return cleaned;
  }

  for (const pattern of Object.keys(SHIFT_PATTERNS)) {
    const patternDigits = pattern.replace(/[^0-9]/g, '');
    const inputDigits = cleaned.replace(/[^0-9]/g, '');
    if (patternDigits === inputDigits) {
      return pattern;
    }
  }

  return null;
}

export function processScheduleText(text: string): ScheduleEntry[] {
  console.log("Starting text processing");
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  // First, find the month and year
  const monthMatch = lines.find(line => /Nov|Dec|Jan/.test(line));
  if (!monthMatch) {
    throw new Error("Could not find month in schedule");
  }

  // Extract month and year
  const monthRegex = /(Nov|Dec|Jan)/;
  const monthResult = monthMatch.match(monthRegex);
  if (!monthResult?.[1]) {
    throw new Error("Could not extract month from schedule");
  }

  const month = monthResult[1];
  const year = new Date().getFullYear();
  const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;

  // Find the line with day numbers
  const dayLine = lines.find(line =>
    line.match(/\d{1,2}[-]?(Nov|Dec|Jan)/g)
  );

  if (!dayLine) {
    throw new Error("Could not find days in schedule");
  }

  // Extract days
  const dayMatches = dayLine.match(/\d{1,2}/g);
  if (!dayMatches) {
    throw new Error("Could not extract days from schedule");
  }

  const days = dayMatches.map(Number);
  console.log("Found days:", days);

  // Generate dates
  const dates = days.map(day =>
    `${year}-${monthNum.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  );
  console.log("Generated dates:", dates);

  const entries: ScheduleEntry[] = [];

  // Process each line for shifts
  for (const line of lines) {
    // Skip header lines
    if (line.includes("Sun") || line.includes("Mon") || line.length < 2) continue;

    // Split line by vertical bars or tabs and clean up
    const parts = line.split(/[|\t]/).map(p => p.trim()).filter(Boolean);

    // First part should be the name
    const name = parts[0].replace(/[^a-zA-Z\s]/g, '').trim();
    if (!name || name.length < 2) continue;

    console.log(`Processing line for ${name}:`, parts);

    // Look for shift patterns in each part
    parts.slice(1).forEach((part, index) => {
      // Skip empty parts or known non-shift values
      if (!part || part === 'vac' || part === 'Xr' || part.length < 3) return;

      const normalizedPattern = normalizeShiftPattern(part);
      if (normalizedPattern && SHIFT_PATTERNS[normalizedPattern]) {
        const times = SHIFT_PATTERNS[normalizedPattern];
        if (dates[index]) {
          entries.push({
            name,
            date: dates[index],
            shift: `${times.start}-${times.end}`
          });
          console.log("Found shift:", { name, pattern: normalizedPattern, times });
        }
      }
    });
  }

  if (entries.length === 0) {
    throw new Error("No schedule entries could be extracted");
  }

  return entries;
}
