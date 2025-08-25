import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { User } from "lucide-react"

export default function ProfilePersonalSection({ isEditing, formData, errors, handleInputChange, userData }) {
  return (
    <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
      <h3 className="text-lg font-semibold text-pink-800 mb-4">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-pink-700">
            First Name {isEditing && <span className="text-red-500">*</span>}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-pink-500" />
            {isEditing ? (
              <>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`pl-10 border-pink-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </>
            ) : (
              <div className="pl-10 py-2 px-3 bg-white border border-pink-200 rounded-md text-gray-900">
                {userData.firstName}
              </div>
            )}
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-pink-700">
            Last Name {isEditing && <span className="text-red-500">*</span>}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-pink-500" />
            {isEditing ? (
              <>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`pl-10 border-pink-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </>
            ) : (
              <div className="pl-10 py-2 px-3 bg-white border border-pink-200 rounded-md text-gray-900">
                {userData.lastName}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
