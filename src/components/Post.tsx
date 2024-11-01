import Image from "next/image";
import { HeartIcon, MessageSquareIcon, RepeatIcon, UploadIcon } from "lucide-react";
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { type Post as PostType } from "~/types";

interface PostProps {
  post: PostType;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function Post({ post }: PostProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex gap-4">
      <Image
        src={post.createdBy.image ?? "/placeholderpfp.webp"}
        width={48}
        height={48}
        alt={`${post.createdBy.userName} profile picture`}
        className="w-12 h-12 rounded-full bg-neutral-600"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <p className="text-white font-bold">{post.createdBy.fullName}</p>
          <p className="text-gray-400">@{post.createdBy.userName}</p>
          <span className="text-gray-500">•</span>
          <p className="text-gray-500">{formatDate(post.createdAt.toString())}</p>
        </div>
        <p className="text-white">{post.content}</p>

        <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-400 justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <MessageSquareIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Comment ({post.comments.length})</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <RepeatIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Repost</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Like ({post.likes.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors duration-200">
              <UploadIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition-colors duration-200">
              <BookmarkFilledIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}