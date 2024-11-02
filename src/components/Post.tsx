"use client"

import Image from "next/image";
import { useState, useCallback } from "react";
import { HeartIcon, MessageSquareIcon, RepeatIcon, UploadIcon } from "lucide-react";
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { type CommentWithUser, type PostWithPartialRelations } from "~/types";
import Link from "next/link";
import CommentModal from "./CommentModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface PostProps {
  post: PostWithPartialRelations;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function Post({ post }: PostProps) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const { userId } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes.some(like => like.userId === userId));
  const router = useRouter();

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

      const data: { liked: boolean } = await response.json() as { liked: boolean };
      setIsLiked(data.liked);
      setLikes(prev => data.liked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  }, [post.id]);

  return (
    <div 
      className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex gap-4 cursor-pointer"
      onClick={handlePostClick}
    >
      <Link 
        href={`/user/${post.createdBy.userName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={post.createdBy.image ?? "/placeholderpfp.webp"}
          width={48}
          height={48}
          alt={`${post.createdBy.userName} profile picture`}
          className="w-12 h-12 rounded-full bg-neutral-600"
        />
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Link 
            href={`/user/${post.createdBy.userName}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:underline"
          >
            <p className="text-white font-bold">{post.createdBy.fullName}</p>
          </Link>
          <Link 
            href={`/user/${post.createdBy.userName}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:underline"
          >
            <p className="text-gray-400">@{post.createdBy.userName}</p>
          </Link>
          <span className="text-gray-500">•</span>
          <p className="text-gray-500">{formatDate(post.createdAt.toString())}</p>
        </div>
        <p className="text-white">{post.content}</p>

        <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-400 justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-1 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsCommentModalOpen(true);
              }}
            >
              <MessageSquareIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Comment ({post.comments.length})</span>
            </button>
            <button 
              className="flex items-center gap-1 hover:text-white transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <RepeatIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Repost</span>
            </button>
            <button 
              className={`flex items-center gap-1 hover:text-white transition-colors duration-200 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <HeartIcon className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-sm hidden md:inline">Like ({likes})</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="hover:text-white transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <UploadIcon className="w-5 h-5" />
            </button>
            <button 
              className="hover:text-white transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <BookmarkFilledIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.id}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}