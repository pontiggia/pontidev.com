import type { Heading } from '@/types/mdx';
import { slugify } from '@/lib/utils/validation';

export function extractHeadings(content: string): Heading[] {
  const matches = content.match(/^#{2,3}\s+.+$/gm) || [];
  return matches.map((match) => {
    const level = match.startsWith('### ') ? 3 : 2;
    const text = match.replace(/^#{2,3}\s+/, '');
    const id = slugify(text);
    return { id, text, level };
  });
}
