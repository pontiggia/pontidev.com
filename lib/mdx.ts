import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export type Language = 'en' | 'es';

function parseDateToISO(dateString: string): string {
  // Check if it's already in ISO format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Parse dd/mm/yyyy format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  // Return as-is if format is unknown
  return dateString;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  hasSpanish: boolean;
  hasEnglish: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  hasSpanish: boolean;
  hasEnglish: boolean;
}

function checkLanguageVersions(slug: string): { hasEnglish: boolean; hasSpanish: boolean } {
  // Check for folder structure first (e.g., slug/index.mdx)
  const folderEnPath = path.join(postsDirectory, slug, 'index.mdx');
  const folderEsPath = path.join(postsDirectory, slug, 'index.es.mdx');

  // Check for flat structure (e.g., slug.mdx)
  const flatEnPath = path.join(postsDirectory, `${slug}.mdx`);
  const flatEsPath = path.join(postsDirectory, `${slug}.es.mdx`);

  return {
    hasEnglish: fs.existsSync(folderEnPath) || fs.existsSync(flatEnPath),
    hasSpanish: fs.existsSync(folderEsPath) || fs.existsSync(flatEsPath),
  };
}

export function getAllPosts(lang: Language = 'en'): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const slugsSet = new Set<string>();

  // Get slugs from both folders and files
  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      // It's a folder, use folder name as slug
      slugsSet.add(entry.name);
    } else if (entry.name.endsWith('.mdx')) {
      // It's a flat file
      const slug = entry.name.replace(/\.es\.mdx$/, '').replace(/\.mdx$/, '');
      slugsSet.add(slug);
    }
  });

  const allPosts = Array.from(slugsSet).map((slug) => {
    const versions = checkLanguageVersions(slug);

    // Determine file path (check folder structure first, then flat)
    let fullPath: string;
    const folderPath = path.join(postsDirectory, slug, lang === 'es' && versions.hasSpanish ? 'index.es.mdx' : 'index.mdx');
    const flatPath = path.join(postsDirectory, lang === 'es' && versions.hasSpanish ? `${slug}.es.mdx` : `${slug}.mdx`);

    if (fs.existsSync(folderPath)) {
      fullPath = folderPath;
    } else if (fs.existsSync(flatPath)) {
      fullPath = flatPath;
    } else {
      // Fall back to English if Spanish doesn't exist
      const folderEnPath = path.join(postsDirectory, slug, 'index.mdx');
      const flatEnPath = path.join(postsDirectory, `${slug}.mdx`);
      fullPath = fs.existsSync(folderEnPath) ? folderEnPath : flatEnPath;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: parseDateToISO(data.date || ''),
      description: data.description || '',
      tags: data.tags || [],
      hasEnglish: versions.hasEnglish,
      hasSpanish: versions.hasSpanish,
    };
  });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)));
  return Array.from(tagsSet).sort();
}

export function getPostBySlug(slug: string, lang: Language = 'en'): Post | null {
  const versions = checkLanguageVersions(slug);

  // Determine file path (check folder structure first, then flat)
  let fullPath: string | null = null;

  const folderPath = path.join(postsDirectory, slug, lang === 'es' && versions.hasSpanish ? 'index.es.mdx' : 'index.mdx');
  const flatPath = path.join(postsDirectory, lang === 'es' && versions.hasSpanish ? `${slug}.es.mdx` : `${slug}.mdx`);

  if (fs.existsSync(folderPath)) {
    fullPath = folderPath;
  } else if (fs.existsSync(flatPath)) {
    fullPath = flatPath;
  } else {
    // Fall back to English if Spanish doesn't exist
    const folderEnPath = path.join(postsDirectory, slug, 'index.mdx');
    const flatEnPath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(folderEnPath)) {
      fullPath = folderEnPath;
    } else if (fs.existsSync(flatEnPath)) {
      fullPath = flatEnPath;
    }
  }

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: parseDateToISO(data.date || ''),
    description: data.description || '',
    tags: data.tags || [],
    content,
    hasEnglish: versions.hasEnglish,
    hasSpanish: versions.hasSpanish,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const slugsSet = new Set<string>();

  // Get slugs from both folders and files
  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      // It's a folder, use folder name as slug
      slugsSet.add(entry.name);
    } else if (entry.name.endsWith('.mdx')) {
      // It's a flat file
      const slug = entry.name.replace(/\.es\.mdx$/, '').replace(/\.mdx$/, '');
      slugsSet.add(slug);
    }
  });

  return Array.from(slugsSet);
}
