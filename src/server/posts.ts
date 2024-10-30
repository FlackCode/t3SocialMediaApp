interface PostRequestBody {
    content: string;
    createdById: string;
}

export const createPost = async (data: PostRequestBody): Promise<PostRequestBody> => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to create post:", errorMessage);
        throw new Error("Failed to create post");
      }
  
      return response.json() as Promise<PostRequestBody>;
    } catch (error) {
      console.error("Error in createPost:", error);
      throw error;
    }
  };
