"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"

interface FloatingButtonProps {
  className?: string
}

export function FloatingButton({ className }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <button
            className={cn(
              // Base styles
              "fixed bottom-6 right-6 z-50 group",
              "flex items-center justify-center",
              "w-14 h-14 rounded-full",
              "bg-gradient-to-br from-primary via-primary to-primary/80",
              "dark:from-primary dark:via-primary/90 dark:to-primary/70",
              "text-primary-foreground font-semibold text-sm",
              "shadow-lg shadow-primary/25",
              "dark:shadow-primary/40",
              "border border-primary/20 dark:border-primary/30",
              "backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90",
              // Shake animation
              "animate-shake",
              // Hover effects
              "hover:scale-110 hover:shadow-xl hover:shadow-primary/40",
              "dark:hover:shadow-primary/60",
              "hover:bg-gradient-to-br hover:from-primary/90 hover:via-primary hover:to-primary/70",
              "dark:hover:from-primary/80 dark:hover:via-primary/90 dark:hover:to-primary/60",
              // Transitions
              "transition-all duration-300 ease-out",
              // Focus styles
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              // Accessibility
              "aria-label='Open UCCZ AI Assistant'",
              className
            )}
            aria-describedby="fab-tooltip"
          >
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-primary/30 dark:bg-primary/40 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-black/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            {/* Icon */}
            <MessageCircle className="w-6 h-6 relative z-10" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              UCCZ AI Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to the UCCZ AI Assistant! I'm here to help you with information about the United Church of Christ in Zimbabwe.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Coming Soon:</strong> Interactive chatbot for church services, events, membership, and more.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tooltip */}
      <div
        id="fab-tooltip"
        className="fixed bottom-20 right-6 z-40 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border"
      >
        Chat with UCCZ AI
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover" />
      </div>
    </>
  )
}