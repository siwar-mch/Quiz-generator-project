import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import api from "../../services/Service"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Search, TrendingUp, Users, FileQuestion, BarChart3 } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const mockAttempts = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    quizId: "1",
    quizName: "Basic Mathematics",
    score: 85,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: 12,
    completedAt: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    quizId: "1",
    quizName: "Basic Mathematics",
    score: 92,
    totalQuestions: 10,
    correctAnswers: 9,
    timeSpent: 8,
    completedAt: "2024-01-16T14:20:00Z",
    status: "completed",
  },
  {
    id: "3",
    userId: "3",
    userName: "Mike Johnson",
    userEmail: "mike.johnson@example.com",
    quizId: "2",
    quizName: "Science Fundamentals",
    score: 78,
    totalQuestions: 15,
    correctAnswers: 12,
    timeSpent: 25,
    completedAt: "2024-01-17T09:15:00Z",
    status: "completed",
  },
  {
    id: "4",
    userId: "1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    quizId: "2",
    quizName: "Science Fundamentals",
    score: 88,
    totalQuestions: 15,
    correctAnswers: 13,
    timeSpent: 18,
    completedAt: "2024-01-18T16:45:00Z",
    status: "completed",
  },
  {
    id: "5",
    userId: "2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    quizId: "1",
    quizName: "Basic Mathematics",
    score: 0,
    totalQuestions: 10,
    correctAnswers: 0,
    timeSpent: 3,
    completedAt: "2024-01-19T11:00:00Z",
    status: "abandoned",
  },
  {
    id: "6",
    userId: "6",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    quizId: "1",
    quizName: "Basic Mathematics",
    score: 85,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: 12,
    completedAt: "2024-01-15T10:30:00Z",
    status: "completed",
  },
]

const chartData = [
  { date: "Jan 15", attempts: 12, avgScore: 78 },
  { date: "Jan 16", attempts: 18, avgScore: 82 },
  { date: "Jan 17", attempts: 15, avgScore: 75 },
  { date: "Jan 18", attempts: 22, avgScore: 85 },
  { date: "Jan 19", attempts: 19, avgScore: 80 },
  { date: "Jan 20", attempts: 25, avgScore: 88 },
  { date: "Jan 21", attempts: 20, avgScore: 83 },
]

const quizPerformanceData = [
  { quiz: "Basic Math", attempts: 45, avgScore: 82, completion: 89 },
  { quiz: "Science Fund.", attempts: 32, avgScore: 78, completion: 94 },
  { quiz: "History Quiz", attempts: 28, avgScore: 85, completion: 92 },
  { quiz: "Literature", attempts: 21, avgScore: 79, completion: 87 },
]

export function DashboardOverview() {
  const [attempts] = useState(mockAttempts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [quizFilter, setQuizFilter] = useState("all")

  const [currentPage, setCurrentPage] = useState(1)
  const attemptsPerPage = 5

  const stats = {
    totalUsers: 1234,
    totalQuizzes: 89,
    totalAttempts: attempts.length,
    completedAttempts: attempts.filter((a) => a.status === "completed").length,
    averageScore: Math.round(
      attempts.filter((a) => a.status === "completed").reduce((sum, a) => sum + a.score, 0) /
        attempts.filter((a) => a.status === "completed").length,
    ),
    completionRate: Math.round((attempts.filter((a) => a.status === "completed").length / attempts.length) * 100),
  }

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: "Active registered users",
      icon: Users,
      trend: "+12%",
    },
    {
      title: "Total Quizzes",
      value: stats.totalQuizzes.toString(),
      description: "Published quizzes",
      icon: FileQuestion,
      trend: "+5%",
    },
    {
      title: "Quiz Attempts",
      value: stats.totalAttempts.toLocaleString(),
      description: "This month",
      icon: BarChart3,
      trend: "+23%",
    },
    {
      title: "Avg. Score",
      value: `${stats.averageScore}%`,
      description: "Overall performance",
      icon: TrendingUp,
      trend: "+3%",
    },
  ]

  const filteredAttempts = attempts.filter((attempt) => {
    const matchesSearch =
      attempt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attempt.quizName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attempt.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || attempt.status === statusFilter
    const matchesQuiz = quizFilter === "all" || attempt.quizName === quizFilter

    return matchesSearch && matchesStatus && matchesQuiz
  })

  const uniqueQuizzes = Array.from(new Set(attempts.map((attempt) => attempt.quizName)))

  const indexOfLastAttempt = currentPage * attemptsPerPage
  const indexOfFirstAttempt = indexOfLastAttempt - attemptsPerPage
  const currentAttempts = filteredAttempts.slice(indexOfFirstAttempt, indexOfLastAttempt)
  const totalPages = Math.ceil(filteredAttempts.length / attemptsPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "abandoned":
        return <Badge className="bg-red-100 text-red-800">Abandoned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">Monitor your quiz platform performance and track user activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance Trends</CardTitle>
            <CardDescription>Quiz attempts and average scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                attempts: {
                  label: "Attempts",
                  color: "hsl(var(--chart-1))",
                },
                avgScore: {
                  label: "Avg Score",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="attempts" fill="var(--color-attempts)" name="Attempts" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgScore"
                    stroke="var(--color-avgScore)"
                    name="Avg Score %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Performance Comparison</CardTitle>
            <CardDescription>Performance metrics by quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgScore: {
                  label: "Average Score",
                  color: "hsl(var(--chart-1))",
                },
                completion: {
                  label: "Completion Rate",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quiz" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="avgScore" fill="var(--color-avgScore)" name="Avg Score %" />
                  <Bar dataKey="completion" fill="var(--color-completion)" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Quiz Attempts ({filteredAttempts.length})</CardTitle>
              <CardDescription>Comprehensive tracking of all quiz attempts with detailed analytics</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search attempts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="abandoned">Abandoned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={quizFilter} onValueChange={setQuizFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Quiz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quizzes</SelectItem>
                  {uniqueQuizzes.map((quiz) => (
                    <SelectItem key={quiz} value={quiz}>
                      {quiz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Correct/Total</TableHead>
                  <TableHead>Time Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAttempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{attempt.userName}</div>
                        <div className="text-sm text-muted-foreground">{attempt.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{attempt.quizName}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getScoreColor(attempt.score)}`}>{attempt.score}%</span>
                    </TableCell>
                    <TableCell>
                      {attempt.correctAnswers}/{attempt.totalQuestions}
                    </TableCell>
                    <TableCell>{attempt.timeSpent} min</TableCell>
                    <TableCell>{getStatusBadge(attempt.status)}</TableCell>
                    <TableCell>{formatDate(attempt.completedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
        </CardContent>
      </Card>
    </div>
  )
}
