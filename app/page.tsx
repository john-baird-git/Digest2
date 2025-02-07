"use client"

import { useInfiniteArticles } from "@/hooks/use-infinite-articles"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

function ArticleList({ type }: { type: "demo" | "explainer" }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteArticles(type)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="space-y-6">
      {data?.pages.map((page) =>
        page.items.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{article.content.substring(0, 150)}...</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(article.publishedAt).toLocaleDateString()} by {article.authorName}
              </p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href={`/${type}/${article.slug}`}>Read more</a>
              </Button>
            </CardContent>
          </Card>
        )),
      )}

      <div ref={ref} className="flex justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero section remains the same */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Demos</h2>
            <ArticleList type="demo" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Explainers</h2>
            <ArticleList type="explainer" />
          </div>
        </div>
      </section>
    </div>
  )
}

