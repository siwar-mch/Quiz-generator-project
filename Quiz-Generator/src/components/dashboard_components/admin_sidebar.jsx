import { useState } from "react"
import { Button } from "../ui/button"
import { Users, FileQuestion, BarChart3, Menu, X } from "lucide-react"

export function AdminSidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "quizzes", label: "Quiz Management", icon: FileQuestion },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={` inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">Admin Dashboard</h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">Quiz Generator Platform</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3 h-11"
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
