import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Plus } from "lucide-react";

export default function TextContentCard({ paragraphText, onTextChange }) {
  return (
    <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Plus className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Add Text Content</h3>
        </div>
        <Textarea
          placeholder="Paste your paragraph or text content here..."
          value={paragraphText}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[200px] resize-none border-gray-300 focus:border-pink-400"
        />
        <p className="text-sm text-gray-500 mt-2">{paragraphText.length}/2000 characters</p>
      </CardContent>
    </Card>
  );
}
