export interface Post {
  id: number;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  createdById: string;
  createdBy: User;
  comments: PostComment[];
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
  comments: PostComment[];
  likes: Like[];
  shares: Share[];
  followers: Follow[];
  following: Follow[];
  chats: Chat[];
  messages: Message[];
}

export interface PostComment {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  createdBy: User;
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

export interface FollowStatusResponse {
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
}

export interface ToggleFollowResponse {
  followed: boolean;
  followers: number;
  following: number;
}

export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  onCommentSubmit: (comment: CommentWithUser) => void;
}

export interface CommentRequest {
  postId: number;
  content: string;
}

export type UserBasic = Pick<User, 'id' | 'clerkId' | 'userName' | 'fullName' | 'email' | 'image' | 'bio'>;

export interface PostWithPartialRelations extends Omit<Post, 'createdBy' | 'comments'> {
  createdBy: UserBasic;
  comments: CommentWithUser[];
}

export interface CommentWithUser extends Omit<PostComment, 'createdBy'> {
  createdBy: UserBasic;
}