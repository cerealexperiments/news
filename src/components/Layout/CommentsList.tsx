import React from "react";
import {Comment} from "../../types";
import CommentItem from "../Comment/CommentItem";

type CommentsListProps = {
  comments: Comment[];
  postId: number;
};

const CommentsList: React.FC<CommentsListProps> = ({comments, postId}) => {
  return (
    <div className="flex flex-col gap-8">
      {comments.map((comment: Comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          user={comment.user}
          text={comment.text}
          child={comment.child}
          postId={postId}
        />
      ))}
    </div>
  );
};

export default CommentsList;
