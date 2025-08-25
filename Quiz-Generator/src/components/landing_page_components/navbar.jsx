import { Button } from "../ui/button";

export default function Navigation({ onGetAccess, onLogin }) {
  return (
    <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-gray-800">Quiz Generator</div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onLogin} className="bg-white/80 hover:bg-white">
          Login
        </Button>
        <Button
          onClick={onGetAccess}
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-400 hover:from-purple-600 hover:via-purple-700 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get Access
        </Button>
      </div>
    </nav>
  );
}
