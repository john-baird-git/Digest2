import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

export const subscriptionRouter = router({
  subscribe: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ ctx, input }) => {
    const existing = await ctx.prisma.subscription.findUnique({
      where: { email: input.email },
    })

    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Already subscribed",
      })
    }

    return ctx.prisma.subscription.create({
      data: { email: input.email },
    })
  }),
})

