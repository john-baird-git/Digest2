import { router } from "../trpc"
import { articleRouter } from "./article"
import { subscriptionRouter } from "./subscription"

export const appRouter = router({
  article: articleRouter,
  subscription: subscriptionRouter,
})

export type AppRouter = typeof appRouter

