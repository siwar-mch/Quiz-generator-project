import { Label } from "../ui/label"
import { Shield } from "lucide-react"

export default function ProfileRoleSection({ role }) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Account Role</h3>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-purple-700">Role</Label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
          <div className="pl-10 py-2 px-3 bg-white border border-purple-200 rounded-md text-purple-800 font-medium capitalize">
            {role}
          </div>
        </div>
      </div>
    </div>
  )
}