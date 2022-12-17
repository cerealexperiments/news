export type User = {
  nickname?: string;
  name: string;
  lastName: string;
  profileImage?: string;
}

export type Post = {
  title: string;
  text: string;
  image?: string;
  datePosted: string;
  isLiked: boolean;
  comments?: Comment[];
}

export type Comment = {
  user: User;
  text: string;
  datePosted: string;
  replies?: CommentReply[]
}

export type CommentReply = {
  user: User;
  text: string;
  datePosted: string;
}
