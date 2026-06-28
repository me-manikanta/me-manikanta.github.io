/** Strip Markdown/Markdoc syntax and collapse whitespace to plain text. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/\{%[\s\S]*?%\}/g, " ") // markdoc tags
    .replace(/^>\s?/gm, "") // blockquotes
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/[*_~#>-]/g, " ") // leftover markdown punctuation
    .replace(/\s+/g, " ")
    .trim();
}

/** Build a meta-description-length excerpt (~155 chars) from post content. */
export function excerpt(markdown: string, maxLen = 155): string {
  const text = toPlainText(markdown);
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLen).trim()}…`;
}

/** Estimate reading time in whole minutes at ~200 wpm (minimum 1). */
export function readingTimeMinutes(markdown: string): number {
  const words = toPlainText(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Convert a human date like "June 28, 2026" to an ISO date string (YYYY-MM-DD). */
export function toISODate(humanDate: string): string {
  const d = new Date(humanDate);
  if (Number.isNaN(d.getTime())) return humanDate;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
