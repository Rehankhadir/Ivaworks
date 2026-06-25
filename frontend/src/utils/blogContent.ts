/**
 * Normalize Quill HTML for display. Empty paragraphs stay as single line breaks.
 */
export function prepareBlogHtml(html: string): string {
  if (!html) return '';

  return html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '<p><br></p>');
}
