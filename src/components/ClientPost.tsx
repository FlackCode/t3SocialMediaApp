'use client'

import { useAuth } from "@clerk/nextjs";
import Post from "./Post";
import { type PostWithPartialRelations } from "~/types";

interface ClientPostProps {
  post: PostWithPartialRelations;
}

export default function ClientPost({ post }: ClientPostProps) {
  const { userId } = useAuth();

  return <Post post={post} userId={userId!} />;
}