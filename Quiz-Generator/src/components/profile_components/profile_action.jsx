import { Button } from "../ui/button"
import { Edit, Save, X } from "lucide-react"

export default function ProfileActions({ isEditing, setIsEditing, handleSave, handleCancel }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <p className="text-gray-600">Your account details and settings</p>
      </div>
      <div className="flex gap-2">
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
