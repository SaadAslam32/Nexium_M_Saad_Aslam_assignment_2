// lib/utils.ts

export function generateSummary(fullText: string): string {
  // Simple static logic: pehle 100 words lo
  const words = fullText.split(/\s+/).slice(0, 100);
  const summary = words.join(' ') + '...';
  return summary;
}
