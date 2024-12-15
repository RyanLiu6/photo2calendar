import type { APIRoute } from "astro";
import { createEvents } from "ics";
import { scheduleStore } from "@/utils/store";
import type { EventAttributes } from 'ics';

export const GET: APIRoute = async ({ params, request }) => {
  const { scheduleId } = params;
  const url = new URL(request.url);
  const name = url.searchParams.get('name');

  if (!scheduleId) {
    return new Response("Schedule ID is required", { status: 400 });
  }

  const schedule = scheduleStore.get(scheduleId);

  if (!schedule) {
    return new Response("Schedule not found", { status: 404 });
  }

  // Filter events by name if provided
  let events = schedule.data;
  if (name) {
    events = events.filter(entry => entry.name === name);
  }

  // Convert schedule entries to ICS events
  const icsEvents: EventAttributes[] = events.map(entry => {
    // Parse date and shift times
    const [startTime, endTime] = parseShiftTimes(entry.shift);
    const date = new Date(entry.date);

    return {
      start: [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      ] as [number, number, number, number, number],
      end: [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      ] as [number, number, number, number, number],
      title: `Work Shift - ${entry.name}`,
      description: `Work shift for ${entry.name}`,
      location: "Work",
    };
  });

  const { error, value } = createEvents(icsEvents);

  if (error || !value) {
    return new Response("Failed to generate ICS file", { status: 500 });
  }

  return new Response(value, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="schedule-${scheduleId}.ics"`,
    },
  });
};

function parseShiftTimes(shift: string): [Date, Date] {
  // Example shift format: "9:00 AM - 5:00 PM"
  const [startStr, endStr] = shift.split("-").map(s => s.trim());

  const startDate = new Date();
  const endDate = new Date();

  // Parse start time
  const [startHour, startMinute, startPeriod] = startStr.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || [];
  startDate.setHours(
    parseInt(startHour) + (startPeriod.toUpperCase() === "PM" && startHour !== "12" ? 12 : 0),
    parseInt(startMinute),
    0,
    0
  );

  // Parse end time
  const [endHour, endMinute, endPeriod] = endStr.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || [];
  endDate.setHours(
    parseInt(endHour) + (endPeriod.toUpperCase() === "PM" && endHour !== "12" ? 12 : 0),
    parseInt(endMinute),
    0,
    0
  );

  return [startDate, endDate];
}
