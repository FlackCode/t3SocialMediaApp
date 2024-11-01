import { useEffect, useState } from 'react';
import { Post, User, Comment, Like } from '../types'; // Adjust the import path as needed

interface ApiResponse {
  posts: Post[];
}

const useFetchPosts = (type: 'all' | 'mine') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = type === 'mine' ? '/api/getMyPosts' : '/api/getPosts';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json() as ApiResponse;

        if (!Array.isArray(data.posts)) {
          throw new Error('Invalid data structure received from API');
        }

        setPosts(data.posts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, [type]);

  return { posts, loading, error };
};

export default useFetchPosts;