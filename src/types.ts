export interface Post {
  id: number;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  createdById: string;
  comments: Comment[];
  likes: Like[];
  shares: Share[];
}

export interface User {
  id: string;
  clerkId?: string | null;
  userName?: string | null;
  fullName?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  shares: Share[];
  followers: Follow[];
  following: Follow[];
  chats: Chat[];
  messages: Message[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  createdById: string;
}

export interface Like {
  id: number;
  postId: number;
  userId: string;
  createdAt: Date;
}

export interface Share {
  id: number;
  postId: number;
  userId: string;
  createdAt: Date;
}
export interface Follow {
  id: number;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Chat {
  id: number;
  participants: User[];
  messages: Message[];
  createdAt: Date;
}

export interface Message {
  id: number;
  content: string;
  senderId: string;
  chatId: number;
  sentAt: Date;
}