import { useState } from "react";
import { createPost } from "~/server/posts";

interface PostRequestBody {
    content: string;
    createdById: string;
}

const usePostForm = (userId: string) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (onClose: () => void) => {
    setIsSubmitting(true);
    setError("");

    console.log("Submitting post:", { content, createdById: userId });

    try {
      const newPost: PostRequestBody = await createPost({ content, createdById: userId });
      console.log("Post submitted:", newPost);
      setContent("");
      onClose();
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    content,
    setContent,
    isSubmitting,
    error,
    handleSubmit,
  };
};

export default usePostForm;
