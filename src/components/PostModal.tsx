"use client";

import { Button } from "~/components/ui/button";
import usePostForm from "../hooks/usePostForm";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, userId }) => {
  const {
    content,
    setContent,
    isSubmitting,
    error,
    handleSubmit,
  } = usePostForm(userId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-white mb-4">Add a New Post</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(onClose);
          }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-24 p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white resize-none outline-none placeholder-gray-400"
            required
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              variant="destructive"
              className="mr-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant={"outline"} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;