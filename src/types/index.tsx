export type User = {
  id: number;
  nickname?: string;
  name: string;
  last_name: string;
  profile_image?: string;
};

export type Post = {
  id: number;
  title: string;
  text: string;
  image: string;
  is_liked: boolean;
  comment?: Comment[];
};

export type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  user: User;
  text: string;
  child?: CommentReply[];
};

export type CommentReply = {
  id: number;
  user: User;
  text: string;
};
