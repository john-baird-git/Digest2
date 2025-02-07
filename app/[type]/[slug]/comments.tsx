"use client"

import { useState } from "react"
import { trpc } from "@/utils/trpc"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Comments({ slug }: { slug: string }) {
  const [comment, setComment] = useState("")
  const { data: session } = useSession()
  const { data: article } = trpc.article.bySlug.useQuery({ slug })
  const utils = trpc.useContext()

  const addCommentMutation = trpc.article.addComment.useMutation({
    onSuccess: () => {
      setComment("")
      utils.article.bySlug.invalidate({ slug })
    },
  })

  if (!article) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {session ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addCommentMutation.mutate({
              articleId: article.id,
              content: comment,
            })
          }}
          className="mb-8"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="mb-2"
          />
          <Button type="submit" disabled={addCommentMutation.isLoading}>
            {addCommentMutation.isLoading ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <p className="mb-8">Please sign in to comment.</p>
      )}

      <div className="space-y-4">
        {article.comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.image ?? undefined} />
              <AvatarFallback>{comment.user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{comment.user.name}</div>
              <div className="text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</div>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

