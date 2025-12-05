import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  compilePost,
  getAllPostSlugs,
  getAllPosts,
  type Language,
  checkLanguageVersions,
} from '@/lib/mdx';
import { SiteHeader } from '@/components/site-header';
import { TableOfContents } from '@/components/table-of-contents';
import { LanguageToggle } from '@/components/language-toggle';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const params = [];

  for (const slug of slugs) {
    const versions = checkLanguageVersions(slug);

    if (versions.hasEnglish) {
      params.push({ slug });
    }
  }

  return params;
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = (lang === 'es' ? 'es' : 'en') as Language;

  const post = await compilePost(slug, language);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function PostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = (lang === 'es' ? 'es' : 'en') as Language;

  const post = await compilePost(slug, language);
  const allPosts = getAllPosts(language);
  const morePosts = allPosts.filter((p) => p.slug !== slug).slice(0, 5);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-8 md:py-10">
      <SiteHeader />

      <div className="mb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <LanguageToggle
            hasEnglish={post.hasEnglish}
            hasSpanish={post.hasSpanish}
            currentLang={language}
          />
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 border border-border rounded-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border/40" />

      <div className="flex justify-between py-10">
        <article className="w-full max-w-2xl lg:max-w-[850px] lg:ml-12 min-w-0">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground mb-6 break-words">
            {post.title}
          </h1>

          <div className="prose-custom">{post.content}</div>

          <footer className="mt-16 pt-6 border-t border-border/40">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← back to blog
            </Link>
          </footer>
        </article>

        <div className="hidden lg:flex gap-4 items-start self-start sticky top-10">
          <div className="border-l border-border/40 self-stretch" />
          <aside className="w-52 flex-shrink-0">
            <div>
              <TableOfContents headings={post.headings} />

              {morePosts.length > 0 && (
                <div className="mt-10">
                  <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-4">
                    More Posts
                  </p>
                  <ul className="space-y-2">
                    {morePosts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
