import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import type { Language, Post, PostMeta } from '@/types/mdx';
import { validateSlug } from '@/lib/utils/validation';
import { parseDateToISO } from '@/lib/utils/date';
import { extractHeadings } from '@/lib/utils/headings';
import { mdxComponents } from '@/components/components';

export type { Language, Post, PostMeta, Heading } from '@/types/mdx';

const postsDirectory = path.join(process.cwd(), 'content');

export function checkLanguageVersions(slug: string): {
  hasEnglish: boolean;
  hasSpanish: boolean;
} {
  if (!validateSlug(slug)) {
    console.warn(`Invalid slug detected in checkLanguageVersions: ${slug}`);
    return { hasEnglish: false, hasSpanish: false };
  }

  const folderEnPath = path.join(postsDirectory, slug, 'index.mdx');
  const folderEsPath = path.join(postsDirectory, slug, 'index.es.mdx');

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

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      slugsSet.add(entry.name);
    } else if (entry.name.endsWith('.mdx')) {
      const slug = entry.name.replace(/\.es\.mdx$/, '').replace(/\.mdx$/, '');
      slugsSet.add(slug);
    }
  });

  const allPosts = Array.from(slugsSet)
    .filter((slug) => {
      if (!validateSlug(slug)) {
        console.warn(`Invalid slug filtered in getAllPosts: ${slug}`);
        return false;
      }
      return true;
    })
    .map((slug) => {
      const versions = checkLanguageVersions(slug);

      let fullPath: string;
      const folderPath = path.join(
        postsDirectory,
        slug,
        lang === 'es' && versions.hasSpanish ? 'index.es.mdx' : 'index.mdx',
      );
      const flatPath = path.join(
        postsDirectory,
        lang === 'es' && versions.hasSpanish ? `${slug}.es.mdx` : `${slug}.mdx`,
      );

      if (fs.existsSync(folderPath)) {
        fullPath = folderPath;
      } else if (fs.existsSync(flatPath)) {
        fullPath = flatPath;
      } else {
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

export function getPostBySlug(
  slug: string,
  lang: Language = 'en',
): Post | null {
  if (!validateSlug(slug)) {
    console.warn(`Invalid slug detected in getPostBySlug: ${slug}`);
    return null;
  }

  const versions = checkLanguageVersions(slug);
  console.log(`[getPostBySlug] slug: ${slug}, lang: ${lang}, versions:`, versions);

  let fullPath: string | null = null;

  const folderPath = path.join(
    postsDirectory,
    slug,
    lang === 'es' && versions.hasSpanish ? 'index.es.mdx' : 'index.mdx',
  );
  const flatPath = path.join(
    postsDirectory,
    lang === 'es' && versions.hasSpanish ? `${slug}.es.mdx` : `${slug}.mdx`,
  );

  console.log(`[getPostBySlug] folderPath: ${folderPath}`);
  console.log(`[getPostBySlug] flatPath: ${flatPath}`);

  if (fs.existsSync(folderPath)) {
    fullPath = folderPath;
  } else if (fs.existsSync(flatPath)) {
    fullPath = flatPath;
  } else {
    const folderEnPath = path.join(postsDirectory, slug, 'index.mdx');
    const flatEnPath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(folderEnPath)) {
      fullPath = folderEnPath;
    } else if (fs.existsSync(flatEnPath)) {
      fullPath = flatEnPath;
    }
  }

  console.log(`[getPostBySlug] Selected fullPath: ${fullPath}`);

  if (!fullPath) {
    return null;
  }

  const normalizedPath = path.normalize(fullPath);
  const normalizedContentDir = path.normalize(postsDirectory);

  if (!normalizedPath.startsWith(normalizedContentDir)) {
    console.error(`Path traversal attempt detected: ${slug}`);
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

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      slugsSet.add(entry.name);
    } else if (entry.name.endsWith('.mdx')) {
      const slug = entry.name.replace(/\.es\.mdx$/, '').replace(/\.mdx$/, '');
      slugsSet.add(slug);
    }
  });

  return Array.from(slugsSet);
}

export async function compilePost(slug: string, lang: Language = 'en') {
  if (!validateSlug(slug)) {
    console.warn(`Invalid slug detected in compilePost: ${slug}`);
    return null;
  }

  const post = getPostBySlug(slug, lang);

  if (!post) {
    return null;
  }

  const headings = extractHeadings(post.content);

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return {
    content,
    headings,
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    hasEnglish: post.hasEnglish,
    hasSpanish: post.hasSpanish,
  };
}
