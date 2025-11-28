export function validateSlug(slug: string): boolean {
  const validSlugPattern = /^[a-zA-Z0-9_-]+$/;

  if (!validSlugPattern.test(slug)) {
    return false;
  }

  if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    return false;
  }

  if (slug.includes('\0')) {
    return false;
  }

  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}
