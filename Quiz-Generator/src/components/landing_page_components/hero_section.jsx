import { Button } from "../ui/button";

export default function HeroSection({ onGetAccess }) {
  return (
    <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Transform Your Content Into Interactive Quizzes
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Upload any text or PDF file and our AI-powered platform will instantly generate engaging quizzes for you.
          Track your progress, review your quiz history, and get detailed scores to enhance your learning experience.
        </p>
        <Button
          size="lg"
          onClick={onGetAccess}
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-400 hover:from-purple-600 hover:via-purple-700 hover:to-pink-500 text-white text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Start Creating Quizzes
        </Button>
      </div>
    </main>
  );
}
