import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils/date';

const description = 'thoughts, notes, and whatever else is on my mind.';

export const metadata = {
  title: 'Blog',
  description,
};

export default function BlogPage() {
  return (
    <section className="max-w-3xl">
      <h1 className="font-serif text-3xl tracking-tight md:text-4xl">blog</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>

      <ul className="mt-10 divide-y divide-border">
        {getAllPosts('en').map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block py-6">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-serif text-xl text-balance transition-colors group-hover:text-muted-foreground md:text-2xl">
                  {post.title}
                </h2>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-sm text-muted-foreground tabular-nums"
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
