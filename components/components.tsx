import { isValidElement, type ReactNode } from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/utils/validation';

const Img = ({ src, alt }: { src?: string; alt?: string }) => (
  <figure className="my-6">
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={450}
      className="h-auto w-full rounded-lg"
      sizes="(max-width: 768px) 100vw, 672px"
    />
    {alt && (
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        {alt}
      </figcaption>
    )}
  </figure>
);

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <h2 id={slugify(String(children))}>{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 id={slugify(String(children))}>{children}</h3>
  ),
  // Markdown wraps a lone image in <p>, and <figure> can't live inside <p>.
  p: ({ children }: { children: ReactNode }) =>
    isValidElement(children) && children.type === Img ? (
      children
    ) : (
      <p>{children}</p>
    ),
  img: Img,
};
