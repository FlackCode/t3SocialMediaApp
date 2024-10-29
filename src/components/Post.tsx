import Image from "next/image";
import { HeartIcon, MessageSquareIcon, RepeatIcon, UploadIcon } from "lucide-react";
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

interface PostProps {
  post: {
    id: number;
    content: string;
    username: string;
    user: string;
    created: string;
    imageUrl: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex gap-4">
      <Image
        src={post.imageUrl}
        width={48}
        height={48}
        alt={`${post.username} profile picture`}
        className="w-12 h-12 rounded-full bg-neutral-600"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <p className="text-white font-bold">{post.username}</p>
          <p className="text-gray-400">{post.user}</p>
          <span className="text-gray-500">•</span>
          <p className="text-gray-500">{post.created}</p>
        </div>
        <p className="text-white">{post.content}</p>

        <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-400 justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <MessageSquareIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Comment</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <RepeatIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Repost</span>
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm hidden md:inline">Like</span>
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
