'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

interface BlogFilterProps {
  posts: PostMeta[];
  allTags: string[];
}

export function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags?.includes(activeTag))
    : posts;

  return (
    <>
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
    </>
  );
}
