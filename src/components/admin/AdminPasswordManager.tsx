
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Eye, EyeOff, Save } from 'lucide-react';

const AdminPasswordManager = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [customHint, setCustomHint] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChanging(true);

    try {
      // Get current stored password
      const storedPassword = localStorage.getItem('admin-master-password') || 'Admin@2024!';
      const storedHint = localStorage.getItem('admin-password-hint') || '💡 Hint: Admin@2024!';

      // Verify current password
      if (currentPassword !== storedPassword) {
        toast({
          title: "Incorrect Password",
          description: "Current admin password is incorrect.",
          variant: "destructive",
        });
        return;
      }

      // Validate new password
      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "New password and confirmation don't match.",
          variant: "destructive",
        });
        return;
      }

      if (newPassword.length < 6) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        return;
      }

      // Save new password and hint
      localStorage.setItem('admin-master-password', newPassword);
      localStorage.setItem('admin-password-hint', customHint || '💡 Custom admin password');

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setCustomHint('');

      toast({
        title: "Password Updated",
        description: "Admin password and hint have been successfully updated.",
      });

    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update admin password.",
        variant: "destructive",
      });
    } finally {
      setIsChanging(false);
    }
  };

  const getCurrentHint = () => {
    return localStorage.getItem('admin-password-hint') || '💡 Hint: Admin@2024!';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Admin Password Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Current hint:</strong> {getCurrentHint()}
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Admin Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="Enter current admin password..."
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Admin Password</Label>
              <Input
                id="new-password"
                type={showPasswords ? 'text' : 'password'}
                placeholder="Enter new admin password..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type={showPasswords ? 'text' : 'password'}
                placeholder="Confirm new admin password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-hint">Custom Password Hint</Label>
              <Input
                id="custom-hint"
                type="text"
                placeholder="Enter a helpful hint for your password..."
                value={customHint}
                onChange={(e) => setCustomHint(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                This hint will be shown in the login dialog to help you remember your password.
              </p>
            </div>

            <Button 
              type="submit"
              className="w-full"
              disabled={!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim() || isChanging}
            >
              {isChanging ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isChanging ? 'Updating...' : 'Update Password & Hint'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPasswordManager;
