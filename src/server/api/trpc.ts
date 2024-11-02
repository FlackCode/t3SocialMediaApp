import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// Create context type that can be shared across files
export const createTRPCContext = async () => {
  return {
    // you can add things like prisma, session, etc. here
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;