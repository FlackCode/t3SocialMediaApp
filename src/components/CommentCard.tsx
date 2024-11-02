import Image from "next/image";
import Link from "next/link";
import { type CommentWithUser } from "~/types";

interface CommentCardProps {
    comment: CommentWithUser;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors">
      <div className="flex items-start gap-3">
        <Link href={`/user/${comment.createdBy.userName}`}>
          <Image
            width={32}
            height={32}
            src={comment.createdBy.image ?? "/placeholderpfp.webp"}
            alt={`${comment.createdBy.userName ?? ''} profile picture`}
            className="w-8 h-8 rounded-full"
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/user/${comment.createdBy.userName}`}>
              <span className="text-white font-semibold hover:underline">
                {comment.createdBy.fullName}
              </span>
            </Link>
            <Link href={`/user/${comment.createdBy.userName}`}>
              <span className="text-gray-400 text-sm hover:underline">
                @{comment.createdBy.userName}
              </span>
            </Link>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-white mt-1">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}