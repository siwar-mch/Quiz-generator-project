import { Card, CardContent } from "../ui/card";
import { Upload, FileText } from "lucide-react";

export default function UploadPDFCard({ pdfFile, onFileChange }) {
  return (
    <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-violet-100 rounded-lg">
            <FileText className="w-6 h-6 text-violet-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Upload PDF Document</h3>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
          <input type="file" accept=".pdf" onChange={onFileChange} className="hidden" id="pdf-upload" />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">
              {pdfFile ? pdfFile.name : "Drop your PDF here or click to browse"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Supports PDF files up to 10MB</p>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
