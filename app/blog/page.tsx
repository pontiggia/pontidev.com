import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
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
      <SiteHeader name="Ponti" href="/" />

      <div className="max-w-2xl mx-auto">
        <BlogFilter posts={posts} allTags={allTags} />
      </div>

      <div className="mt-12">
        <SiteFooter />
      </div>
    </main>
  );
}
