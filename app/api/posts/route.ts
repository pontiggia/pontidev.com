import { getAllPosts, getAllTags } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return NextResponse.json({ posts, tags });
}
