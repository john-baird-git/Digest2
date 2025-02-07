import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

export const articleRouter = router({
  list: publicProcedure
    .input(
      z.object({
        type: z.enum(["demo", "explainer"]).optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.article.findMany({
        take: input.limit + 1,
        where: input.type ? { type: input.type } : undefined,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { publishedAt: "desc" },
      })

      let nextCursor: typeof input.cursor | undefined = undefined
      if (items.length > input.limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items,
        nextCursor,
      }
    }),

  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const article = await ctx.prisma.article.findUnique({
      where: { slug: input.slug },
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!article) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      })
    }

    return article
  }),

  addComment: protectedProcedure
    .input(
      z.object({
        articleId: z.string(),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
          articleId: input.articleId,
        },
      })
    }),
})

