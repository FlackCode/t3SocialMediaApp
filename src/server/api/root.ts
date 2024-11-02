import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  // your router definitions will go here
});

export type AppRouter = typeof appRouter;