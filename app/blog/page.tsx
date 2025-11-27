'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setAllTags(data.tags);
      });
  }, []);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-8 md:py-10">
      <div className="mb-16 md:mb-20 lg:mb-24">
        <SiteHeader />
      </div>

      <div className="max-w-2xl mx-auto">
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 text-sm border rounded-sm transition-colors ${
                activeTag === null
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border hover:border-foreground'
              }`}
            >
              <span className={activeTag === null ? '' : 'blog-tag'}>#all</span>
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 text-sm border rounded-sm transition-colors ${
                  activeTag === tag
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-foreground'
                }`}
              >
                <span className={activeTag === tag ? '' : 'blog-tag'}>#{tag}</span>
              </button>
            ))}
          </div>
        )}

        <div className="divide-y divide-border">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-sm text-muted-foreground mb-1">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:underline underline-offset-4 mb-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-muted-foreground py-6">no posts found.</p>
          )}
        </div>

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
