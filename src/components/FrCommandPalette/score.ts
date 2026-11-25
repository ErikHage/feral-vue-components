/**
 * How well `query` matches `text`, both already lowercased: 100 for the whole text, 80 for its
 * start, 60 for the start of a later word, 40 anywhere inside, 20 for its letters in order with
 * others between (`plt` in `plants`), and 0 for no match or an empty text or query
 */
export function scoreMatch(text: string, query: string): number {
  if (!query || !text) return 0;
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  const index = text.indexOf(query);
  if (index > 0 && /\s/.test(text.charAt(index - 1))) return 60;
  if (index >= 0) return 40;
  let matched = 0;
  for (let i = 0; i < text.length && matched < query.length; i++) {
    if (text[i] === query[matched]) matched++;
  }
  return matched === query.length ? 20 : 0;
}
