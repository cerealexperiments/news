export type User = {
  id: number;
  nickname?: string;
  name: string;
  "last_name": string;
  profileImage?: string;
}

export type Post = {
  id: number;
  title: string;
  text: string;
  image: string;
  isLiked: boolean;
  comment?: Comment[];
}

export type Comment = {
  id: number,
  user: User;
  text: string;
  child?: CommentReply[]
}

export type CommentReply = {
  id: number,
  user: User;
  text: string;
}
