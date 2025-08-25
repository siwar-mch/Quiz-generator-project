import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function AccessFormDialog({ open, onOpenChange, formData, onChange, onSend }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Access to Quiz Generator</DialogTitle>
          <DialogDescription>Fill in your details below to create your account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={onChange}
              placeholder="Choose a username"
            />
          </div>
          <p className="text-sm text-gray-600 text-center py-2">
            You'll receive an email with your password so you can login whenever you want.
          </p>
          <Button
            onClick={onSend}
            className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-400 hover:from-purple-600 hover:via-purple-700 hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Send Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
