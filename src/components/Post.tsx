"use client"

import Image from "next/image";
import { useState } from "react";
import { HeartIcon, MessageSquareIcon, RepeatIcon, UploadIcon } from "lucide-react";
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { CommentWithUser, type PostWithPartialRelations } from "~/types";
import Link from "next/link";
import CommentModal from "./CommentModal";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking interactive elements
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/posts/${post.id}`);
  };

  const handleCommentSubmit = (newComment: CommentWithUser) => {
    console.log('New comment:', newComment);
  };

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
              className="flex items-center gap-1 hover:text-white transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Like ({post.likes.length})</span>
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