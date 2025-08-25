import { useState, useEffect } from "react"
import api from "../../services/Service"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Plus, Edit, Trash2, Shield, ShieldOff, Search } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    interests: [],
  })

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        const normalized = res.data.map((u) => ({
          ...u,
          interests: u.interests || [],
          isBlocked: u.status === "BLOCKED",
        }))
        setUsers(normalized)
      })
      .catch((err) => console.error("Error fetching users:", err))
  }, [])

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      interests: [],
    })
  }

  const handleAddUser = async () => {
    try {
      console.log("Sending formData:", formData)
      const res = await api.post("/users", formData)
      setUsers([...users, { ...res.data, interests: res.data.interests || [], isBlocked: res.data.status === "BLOCKED" }])
      setIsAddDialogOpen(false)
      setFormData({ firstName: "", lastName: "", email: "", username: "" })
    } catch (err) {
      console.error("Error adding user:", err.response || err)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return
    try {
      const res = await api.put(`/users/${editingUser.userId}`, formData)
      const updatedUser = {
        ...res.data,
        interests: res.data.interests || [],
        isBlocked: res.data.status === "BLOCKED",
      }
      setUsers(users.map((u) => (u.userId === editingUser.userId ? updatedUser : u)))
      setIsEditDialogOpen(false)
      setEditingUser(null)
      resetForm()
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`)
      setUsers(users.filter((u) => u.userId !== userId))
    } catch (err) {
      console.error("Error deleting user:", err)
    }
  }

  const handleToggleBlock = async (userId) => {
    try {
      const res = await api.patch(`/users/${userId}`, {})
      const updatedUser = {
        ...res.data,
        interests: res.data.interests || [],
        isBlocked: res.data.status === "BLOCKED",
      }
      setUsers(users.map((u) => (u.userId === userId ? updatedUser : u)))
    } catch (err) {
      console.error("Error blocking/unblocking user:", err)
    }
  }

  const getStatusBadge = (isBlocked, status) => {
    if (isBlocked) {
      return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
    }

    if (status === "ACTIVE") {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    } else {
      return <Badge className="bg-blue-100 text-blue-800">Inactive</Badge>
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="space-y-6">
      {/* Header & Add Dialog */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground mt-1">Manage Users Effectively</p>
        </div>

        <Button variant="outline" size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add User
        </Button>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with their details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label>UserName</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Easily add, edit, or remove users to maintain a streamlined experience.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(user.interests || []).slice(0, 2).map((i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {i}
                          </Badge>
                        ))}
                        {(user.interests || []).length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{(user.interests || []).length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.isBlocked, user.status)}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggleBlock(user.userId)}>
                          {user.isBlocked ? <Shield className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.userId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user account details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
