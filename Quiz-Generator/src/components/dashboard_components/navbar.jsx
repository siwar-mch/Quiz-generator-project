export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
          <a href="../home_page">QuizGenerator</a>
        </h1>
      </div>
    </nav>
  );
}
