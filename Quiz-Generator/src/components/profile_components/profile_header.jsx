export default function ProfileHeader({ isEditing }) {
    return (
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h2>
        <p className="text-lg text-gray-600">
          {isEditing
            ? "Update your personal information"
            : "View and manage your account details"}
        </p>
      </div>
    )
  }
  