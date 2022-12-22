export type User = {
  id: number;
  nickname?: string;
  name: string;
  lastName: string;
  profileImage?: string;
}

export type Post = {
  id: number;
  title: string;
  text: string;
  image?: string;
  isLiked: boolean;
  comments?: Comment[];
}

export type Comment = {
  id: number,
  user: User;
  text: string;
  replies?: CommentReply[]
}

export type CommentReply = {
  id: number,
  user: User;
  text: string;
}
