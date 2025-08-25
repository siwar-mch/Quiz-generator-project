import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/home_page_components/navbar";
import UploadPDFCard from "../../components/home_page_components/PDF_card";
import TextContentCard from "../../components/home_page_components/text_card";
import GenerateButton from "../../components/home_page_components/generate_button";
import "./home_page.css";

export default function HomePage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [paragraphText, setParagraphText] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") setPdfFile(file);
  };

  const handleGenerate = () => {
    console.log("Generating quiz with:", { pdfFile, paragraphText });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };
  const handleDashboard = () => navigate("../dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-violet-100 to-pink-100 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-28 h-28 bg-blue-200/50 rounded-full blur-xl"></div>
        <div className="absolute top-60 right-32 w-36 h-36 bg-violet-200/40 rounded-lg rotate-45 blur-2xl"></div>
        <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-pink-200/45 rounded-full blur-xl"></div>
      </div>

      <NavigationBar isAdmin onAdminDashboard={handleDashboard} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Create your quizzes effortlessly!</h2>
            <p className="text-lg text-gray-600">Upload your materials and let us do the rest.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <UploadPDFCard pdfFile={pdfFile} onFileChange={handleFileUpload} />
            <TextContentCard paragraphText={paragraphText} onTextChange={setParagraphText} />
          </div>

          <GenerateButton
            onClick={handleGenerate}
            disabled={!pdfFile && !paragraphText}
          />
        </div>
      </main>
    </div>
  );
}
