import { Suspense } from "react"
import { ArticleContent } from "./article-content"
import { Comments } from "./comments"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ArticlePage({
  params,
}: {
  params: { type: string; slug: string }
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <ArticleContent slug={params.slug} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Comments slug={params.slug} />
      </Suspense>
    </div>
  )
}

