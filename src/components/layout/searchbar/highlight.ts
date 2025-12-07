// Simple highlight utility functions
export function match(text: string, query: string): number[][] {
  if (!query) return [];
  
  const matches: number[][] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let index = 0;

  while (index < lowerText.length) {
    const foundIndex = lowerText.indexOf(lowerQuery, index);
    if (foundIndex === -1) break;
    matches.push([foundIndex, foundIndex + lowerQuery.length]);
    index = foundIndex + 1;
  }

  return matches;
}

export function parse(text: string, matches: number[][]): { text: string; highlight: boolean }[] {
  if (!matches.length) {
    return [{ text, highlight: false }];
  }

  const parts: { text: string; highlight: boolean }[] = [];
  let lastIndex = 0;

  matches.forEach(([start, end]) => {
    if (lastIndex < start) {
      parts.push({
        text: text.substring(lastIndex, start),
        highlight: false,
      });
    }
    parts.push({
      text: text.substring(start, end),
      highlight: true,
    });
    lastIndex = end;
  });

  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlight: false,
    });
  }

  return parts;
}

