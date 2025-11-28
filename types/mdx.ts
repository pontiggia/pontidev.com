export type Language = 'en' | 'es';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  hasSpanish: boolean;
  hasEnglish: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  hasSpanish: boolean;
  hasEnglish: boolean;
}

export interface CompiledPost {
  content: React.ReactElement;
  headings: Heading[];
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  hasEnglish: boolean;
  hasSpanish: boolean;
}
