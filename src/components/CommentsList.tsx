import React from 'react';
import {Comment} from "../types";
import CommentItem from "./CommentItem";

type CommentsListProps = {
  comments: Comment[]
}

const CommentsList: React.FC<CommentsListProps> = ({comments}) => {
  return (
    <div className="flex flex-col gap-8">
      {comments.map((comment: Comment) => <CommentItem key={comment.id} id={comment.id} user={comment.user}
                                                       text={comment.text}
                                                       child={comment.child}/>)}
    </div>
  );
};

export default CommentsList;
