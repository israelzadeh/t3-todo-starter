import { z } from "zod";
import { protectedProcedure } from "./trpc";
import { createTRPCRouter } from "./trpc";

export const todoRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return todos;
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return todo;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),
});
