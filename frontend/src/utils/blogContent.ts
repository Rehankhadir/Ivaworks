/**
 * Quill inserts <p><br></p> for blank lines. Mark them so CSS can use a single-line gap.
 */
export function prepareBlogHtml(html: string): string {
  if (!html) return '';

  return html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '<p class="blog-empty-line"><br></p>');
}
