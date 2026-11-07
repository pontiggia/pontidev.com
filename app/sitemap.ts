import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

const baseUrl = 'https://www.felipepontiggia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },
    ...getAllPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
