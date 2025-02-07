"use client"

import { useEffect } from "react"
import { trpc } from "@/utils/trpc"
import { MDXRemote } from "next-mdx-remote"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function ArticleContent({ slug }: { slug: string }) {
  const { data: article, isLoading } = trpc.article.bySlug.useQuery({ slug })

  useEffect(() => {
    // Track view
    if (article) {
      // Implement view tracking
    }
  }, [article])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{article.title}</h1>
      <div className="text-gray-600">
        By {article.authorName} • {new Date(article.publishedAt).toLocaleDateString()}
      </div>
      <MDXRemote compiledSource={article.content} />
    </article>
  )
}

