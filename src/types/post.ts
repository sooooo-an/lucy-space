export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  thumbnail: string;
};

export type PostData = Post & {
  content: string;
};
