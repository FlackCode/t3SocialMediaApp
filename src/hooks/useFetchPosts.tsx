import { useEffect, useState } from 'react';

interface ApiPost {
    id: number;
    content: string;
    createdAt: string;
    createdBy: {
        id: string;
        userName: string;
        image?: string;
        fullName: string;
    };
}

interface Post {
    id: number;
    content: string;
    username: string;
    fullName: string;
    created: string;
    imageUrl: string;
}

const useFetchPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/getPosts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data: ApiPost[] = await response.json() as ApiPost[];

                const transformedPosts: Post[] = data.map(post => ({
                    id: post.id,
                    content: post.content,
                    username: post.createdBy.userName,
                    fullName: post.createdBy.fullName,
                    created: post.createdAt, 
                    imageUrl: post.createdBy.image ?? '', 
                }));

                setPosts(transformedPosts);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        void fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useFetchPosts;
