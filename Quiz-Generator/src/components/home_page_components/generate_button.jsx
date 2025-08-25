import { Button } from "../ui/button";

export default function GenerateButton({ onClick, disabled }) {
  return (
    <div className="text-center mt-8">
      <Button
        onClick={onClick}
        className="px-12 py-4 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg"
        disabled={disabled}
      >
        Generate Quiz
      </Button>
    </div>
  );
}
