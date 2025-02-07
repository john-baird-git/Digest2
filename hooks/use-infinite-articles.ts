import { trpc } from "@/utils/trpc"

export function useInfiniteArticles(type?: "demo" | "explainer") {
  return trpc.article.list.useInfiniteQuery(
    { type, limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )
}

