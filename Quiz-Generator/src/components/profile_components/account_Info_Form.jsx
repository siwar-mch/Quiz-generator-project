import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Mail, UserCheck } from "lucide-react"

export default function ProfileAccountSection({ isEditing, formData, errors, handleInputChange, userData }) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">Account Information</h3>
      <div className="space-y-4">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-blue-700">
            Username {isEditing && <span className="text-red-500">*</span>}
          </Label>
          <div className="relative">
            <UserCheck className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
            {isEditing ? (
              <>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={`pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </>
            ) : (
              <div className="pl-10 py-2 px-3 bg-white border border-blue-200 rounded-md text-gray-900">
                {userData.username}
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-blue-700">
            Email Address {isEditing && <span className="text-red-500">*</span>}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
            {isEditing ? (
              <>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </>
            ) : (
              <div className="pl-10 py-2 px-3 bg-white border border-blue-200 rounded-md text-gray-900">
                {userData.email}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
