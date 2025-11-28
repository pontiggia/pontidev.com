import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { getAllPosts } from '@/lib/mdx';
import { BlogFilter } from '@/components/blog-filter';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on software, design, and life',
};

export default function BlogPage() {
  const posts = getAllPosts('en');
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-8 md:py-10">
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SiteHeader />
      </div>

      <div className="max-w-2xl mx-auto">
        <BlogFilter posts={posts} allTags={allTags} />

        <footer className="mt-12 pt-6 border-t border-border">
          <Link
            href="/"
            className="blog-tag text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← back home
          </Link>
        </footer>
      </div>
    </main>
  );
}
