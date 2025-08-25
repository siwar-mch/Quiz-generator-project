import React from "react"
import { cn } from "../lib/utils"

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative z-50">{children}</div>
    </div>
  )
}

const DialogContent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <p className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-500", className)} {...props} />
)
const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
const DialogTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, {
    onClick: onClick,
  })
}

export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter }
