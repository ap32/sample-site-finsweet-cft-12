export type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  userName: string;
  userLink: string;
};

export type Author = {
  id: number;
  name: string;
  avatarId: number;
  description: string;
};

export type AuthorPreview = Omit<Author, 'description'>;

export type CategorySlug = 'business' | 'startup' | 'economy' | 'technology';
export type CategoryName = Capitalize<CategorySlug>;
export type Category = {
  slug: CategorySlug;
  name: CategoryName;
  description: string;
};

export type CategoryPreview = {
  slug: CategorySlug;
  name: CategoryName;
  shortDescription: string;
};

export type Post = {
  id: number;
  title: string;
  subtitle: string;
  author: Author;
  date: number;
  paragraphs: string[];
  category: Category;
  image: Image;
};

export type PostPreview = Omit<Post, 'paragraphs' | 'author'> & {
  author: AuthorPreview;
};

export type Page = {
  data: PostPreview[];
  pagination: {
    curr: string;
    prev?: string;
    next?: string;
  };
};

export type Testimonial = {
  id: number;
  name: string;
  avatarId: number;
  text: string;
  place: string;
};
