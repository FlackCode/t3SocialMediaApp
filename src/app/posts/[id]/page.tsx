import Post from '~/components/Post';
import CommentCard from '~/components/CommentCard';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import NavBar from '~/components/NavBar';
import { getPost } from '~/lib/db/posts';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="bg-neutral-800 min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center sm:px-8 md:px-16 lg:px-32 py-4">
        <div className="w-full max-w-2xl bg-neutral-900 rounded-t-lg border border-neutral-700 p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to feed</span>
          </Link>
          <Post post={post} />
        </div>
        
        <div className="w-full max-w-2xl bg-neutral-800 p-4 pb-0 border-x border-neutral-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-gray-400 w-6 h-6" />
            <h2 className="text-xl font-bold text-white">
              Comments
              <span className="text-gray-400 text-base font-normal ml-2">
                ({post.comments.length})
              </span>
            </h2>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-neutral-900 p-4 space-y-4 rounded-b-lg border border-neutral-700">
          {post.comments.length === 0 ? (
            <div className="text-gray-400 text-center py-8 bg-neutral-800/50 rounded-lg">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="space-y-3">
              {post.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}