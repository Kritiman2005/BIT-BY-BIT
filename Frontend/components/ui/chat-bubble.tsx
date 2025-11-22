"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatBubbleProps {
  variant?: "sent" | "received"
  className?: string
  children: React.ReactNode
}

export function ChatBubble({ variant = "received", className, children }: ChatBubbleProps) {
  return (
    <div className={cn("flex items-start gap-2 mb-4", variant === "sent" && "flex-row-reverse", className)}>
      {children}
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received"
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({ variant = "received", isLoading, className, children }: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-3",
        variant === "sent" ? "bg-primary text-primary-foreground" : "bg-muted",
        className,
      )}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

export function ChatBubbleAvatar({ src, fallback = "AI", className }: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      {src && <AvatarImage src={src || "/placeholder.svg"} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
