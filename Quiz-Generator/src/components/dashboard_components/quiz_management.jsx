import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, FileQuestion, Trash2 } from "lucide-react";
import api from "../../services/Service"

export function QuizManagement() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 5;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await api.getQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await api.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Quiz Management</h2>
        <p className="text-muted-foreground mt-1">View and manage existing quizzes</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Quizzes ({filteredQuizzes.length})</CardTitle>
              <CardDescription>Browse your quiz collection.</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz Name</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentQuizzes.map((quiz) => (
                  <TableRow key={quiz.quizId}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileQuestion className="h-4 w-4 text-primary" />
                      {quiz.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{quiz.questions?.length || 0} questions</Badge>
                    </TableCell>
                    <TableCell>{quiz.createdAt}</TableCell>
                    <TableCell>{quiz.createdByUserName}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleDeleteQuiz(quiz.quizId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "bg-blue-500 text-white" : ""}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
