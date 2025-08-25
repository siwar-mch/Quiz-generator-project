import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Lock } from "lucide-react"

export default function ProfileSecuritySection({ formData, errors, handleInputChange }) {
  return (
    <div className="bg-sky-50 p-6 rounded-xl border border-sky-200">
      <h3 className="text-lg font-semibold text-sky-800 mb-4">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-sky-700">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-sky-500" />
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-sky-700">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-sky-500" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`pl-10 border-sky-200 focus:border-sky-500 focus:ring-sky-500 ${
                errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
