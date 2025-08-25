import { useState } from "react"
import { AdminSidebar }  from "../../components/dashboard_components/admin_sidebar"
import { DashboardOverview } from "../../components/dashboard_components/dashboard_overview"
import { UserManagement } from "../../components/dashboard_components/user_management"
import { QuizManagement } from "../../components/dashboard_components/quiz_management"
import Navbar  from "../../components/dashboard_components/navbar"
import "./Dashboard.css"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "quizzes":
        return <QuizManagement />
      default:
        return <DashboardOverview />
    }
  }
  return (
    <>
      {/* Navbar (top full width) */}
      <div className="h-16 border-b bg-white">
        <Navbar />
      </div>
  
      <div className="flex min-h-screen bg-background">
        {/* Sidebar (starts just below navbar) */}
        <div className="w-64 border-r bg-sidebar">
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
  
        {/* Main content (to the right of sidebar) */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </>
  )
}
