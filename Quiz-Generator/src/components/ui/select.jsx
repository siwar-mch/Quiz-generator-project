import React from "react"
import { cn } from "../lib/utils"

const Select = ({ value, onValueChange, children }) => {
  return (
    <div className="relative">
      {React.Children.map(children, (child) => React.cloneElement(child, { value, onValueChange }))}
    </div>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "" : "text-gray-400"}>{value || placeholder}</span>
)

const SelectContent = ({ children, className }) => (
  <div
    className={cn(
      "absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg",
      className,
    )}
  >
    {children}
  </div>
)

const SelectItem = ({ value, children, onValueChange }) => (
  <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => onValueChange(value)}>
    {children}
  </div>
)

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
