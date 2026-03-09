import type React from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/utils/validation';

export const mdxComponents = {
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
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-6">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={450}
        className="rounded-lg w-full h-auto"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
    </figure>
  ),
};
