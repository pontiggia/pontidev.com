'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';

interface MDXContentProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

const components = {
  h2: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return <h3 id={id}>{children}</h3>;
  },
};

export function MDXContent({ content }: MDXContentProps) {
  return <MDXRemote source={content} components={components} />;
}
