import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type CommentWithUser, type PostWithPartialRelations } from "~/types";

export function usePostLogic(post: PostWithPartialRelations, userId: string | null) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      setIsLiked(post.likes.some(like => like.userId === userId));
    }
  }, [post.likes, userId]);

  const handlePostClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/posts/${post.id}`);
  }, [post.id, router]);

  const handleCommentSubmit = useCallback((newComment: CommentWithUser) => {
    console.log('New comment:', newComment);
  }, []);

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to like/unlike post');
      }

      const data = await response.json() as { liked: boolean };
      setIsLiked(data.liked);
      setLikes(prev => data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  }, [post.id, userId]);

  return {
    isCommentModalOpen,
    setIsCommentModalOpen,
    likes,
    isLiked,
    handlePostClick,
    handleCommentSubmit,
    handleLike,
  };
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}