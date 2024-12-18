export async function downloadSchedule(scheduleId: string, name: string | null): Promise<void> {
  const params = new URLSearchParams();
  if (name) params.set('name', name);

  const response = await fetch(`/api/download-ics/${scheduleId}?${params}`);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to download schedule');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `schedule-${name || 'all'}-${scheduleId}.ics`;
  a.click();
  window.URL.revokeObjectURL(url);
}
