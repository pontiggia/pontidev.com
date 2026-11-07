import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compilePost, getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils/date';
import { TableOfContents } from '@/components/table-of-contents';
import { LanguageToggle } from '@/components/language-toggle';

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const post = getPostBySlug(slug, lang === 'es' ? 'es' : 'en');

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
  searchParams,
}: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = lang === 'es' ? 'es' : 'en';

  const post = await compilePost(slug, language);

  if (!post) {
    notFound();
  }

  const morePosts = getAllPosts(language)
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  return (
    <>
      <div className="mb-2">
        <div className="flex items-center justify-between gap-4">
          <time dateTime={post.date} className="text-sm text-muted-foreground">
            {formatDate(post.date)}
          </time>
          {post.hasEnglish && post.hasSpanish && (
            <LanguageToggle slug={slug} currentLang={language} />
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border/60" />

      <div className="flex justify-between gap-16 py-10">
        <article lang={language} className="min-w-0 max-w-[850px] flex-1">
          <h1 className="mb-6 font-serif text-3xl tracking-tight text-balance break-words md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="prose-custom">{post.content}</div>
        </article>

        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-10 border-l border-border/60 pl-6">
            <TableOfContents headings={post.headings} />
            {morePosts.length > 0 && (
              <div className="mt-10">
                <p className="mb-4 text-xs font-medium tracking-wider text-foreground uppercase">
                  More Posts
                </p>
                <ul className="space-y-2.5">
                  {morePosts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
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
    </>
  );
}
