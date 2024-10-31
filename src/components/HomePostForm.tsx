import Image from 'next/image';
import { PaperclipIcon } from 'lucide-react';
import { FaceIcon } from '@radix-ui/react-icons';
import usePostForm from "../hooks/usePostForm";

interface HomePostFormProps {
  userId?: string;
  imageUrl?: string;
}

const HomePostForm = ({ userId, imageUrl }: HomePostFormProps) => {
  const {
    content,
    setContent,
    isSubmitting,
    error,
    handleSubmit,
  } = usePostForm(userId ?? '');

  return (
    <div className="w-full md:max-w-2xl bg-neutral-900 p-4 border-t-0 border border-neutral-700">
      <div className="flex items-start gap-4">
        <Image
          src={imageUrl ? imageUrl : "/placeholderpfp.webp"}
          width={96}
          height={96}
          alt="User Profile Picture"
          className="w-12 h-12 rounded-full bg-neutral-600"
        />
        <form 
          className="flex flex-col w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(() => {
              setContent("");
            });
          }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell the world about your day!"
            className="w-full h-20 p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white resize-none outline-none placeholder-gray-400"
            required
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-neutral-700/30 transition-colors duration-200"
                aria-label="Upload Image">
                <PaperclipIcon className="text-white w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-neutral-700/30 transition-colors duration-200"
                aria-label="Add Emoji">
                <FaceIcon className="text-white w-5 h-5" />
              </button>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-4 py-1 bg-neutral-900 border border-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePostForm;