"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import UcczChat from "@/components/chat/uccz-chat"

interface FloatingButtonProps {
  className?: string
}

export function FloatingButton({ className }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          render={
            <button
              className={cn(
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
                "animate-shake",
                "hover:scale-110 hover:shadow-xl hover:shadow-primary/40",
                "dark:hover:shadow-primary/60",
                "hover:bg-gradient-to-br hover:from-primary/90 hover:via-primary hover:to-primary/70",
                "dark:hover:from-primary/80 dark:hover:via-primary/90 dark:hover:to-primary/60",
                "transition-all duration-300 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                className
              )}
              aria-label="Open UCCZ AI Assistant"
              aria-describedby="fab-tooltip"
            />
          }
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-primary/30 dark:bg-primary/40 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Ripple effect on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-black/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          <img src="/logo.png" alt="UCCZ logo" className="relative z-10 h-8 w-8 rounded-full object-contain" />
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <img src="/logo.png" alt="UCCZ logo" className="h-8 w-8 rounded-full object-contain" />
              <span className="text-lg font-semibold">UCCZ AI Assistant</span>
            </DialogTitle>
          </DialogHeader>
          <UcczChat />
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