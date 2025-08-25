import { Button } from "../ui/button";
import { UserIcon } from "../ui/user_icon";
import { LogOut,Settings} from "lucide-react";

export default function NavigationBar({isAdmin, onLogout,onAdminDashboard}) {
  return (
    <nav className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
          <a href="../home_page">QuizGenerator</a>
        </h1>
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdminDashboard}
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 font-medium bg-transparent"
          >
            <Settings className="w-4 h-4" />
            Admin Dashboard
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Welcome back, <span className="font-semibold">Admin</span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
        <a href="../profile"><UserIcon className="w-8 h-8 cursor-pointer" /></a>
      </div>
    </nav>
  );
}
