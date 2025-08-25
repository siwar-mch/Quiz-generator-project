import { useState } from "react"
import { Card, CardContent, CardHeader} from "../../components/ui/card"
import Navbar from "../../components/profile_components/navbar"
import ProfilePersonalSection from "../../components/profile_components/personal_details_form"
import ProfileAccountSection from "../../components/profile_components/account_Info_Form"
import ProfileSecuritySection from "../../components/profile_components/security_Setting_Form"
import ProfileHeader from "../../components/profile_components/profile_header"
import ProfileActions from "../../components/profile_components/profile_action"
import ProfileRoleSection from "../../components/profile_components/role_section"



export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    password: "",
    confirmPassword: "",
  })

  const [formData, setFormData] = useState({ ...userData })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (formData.password && !formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password"
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setUserData({ ...formData })
    setIsEditing(false)
    setErrors({})
    console.log("Profile updated:", formData)
  }

  const handleCancel = () => {
    setFormData({ ...userData })
    setIsEditing(false)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100">
      <div className="h-16 border-b bg-white">
        <Navbar />
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfileHeader isEditing={isEditing} />

        <Card className="shadow-lg border bg-white">
          <CardHeader>
            <ProfileActions
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-8">
              <ProfileRoleSection role={userData.role} />
              <ProfilePersonalSection
                isEditing={isEditing}
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                userData={userData}
              />
              <ProfileAccountSection
                isEditing={isEditing}
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                userData={userData}
              />
              {isEditing && (
                <ProfileSecuritySection
                  formData={formData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}