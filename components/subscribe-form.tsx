"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trpc } from "@/utils/trpc"
import { toast } from "@/components/ui/use-toast"

export function SubscribeForm() {
  const [email, setEmail] = useState("")
  const subscribeMutation = trpc.subscription.subscribe.useMutation({
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    subscribeMutation.mutate({ email })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full"
        disabled={subscribeMutation.isLoading}
      />
      <Button type="submit" className="w-full bg-[#556B2F] hover:bg-[#4A5F29]" disabled={subscribeMutation.isLoading}>
        {subscribeMutation.isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
      <p className="text-sm text-gray-600">Get latest in explainers and demos, in your inbox once a month</p>
    </form>
  )
}

