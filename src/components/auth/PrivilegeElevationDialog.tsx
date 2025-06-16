
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface PrivilegeElevationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onElevate: (password: string) => Promise<boolean>;
  isVerifying: boolean;
  featureName?: string;
}

const PrivilegeElevationDialog = ({
  open,
  onOpenChange,
  onElevate,
  isVerifying,
  featureName = "this feature"
}: PrivilegeElevationDialogProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onElevate(password);
    if (success) {
      setPassword('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-500" />
            Admin Access Required
          </DialogTitle>
          <DialogDescription>
            Enter your admin password to access {featureName}. This will grant temporary elevated privileges.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Admin Password</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              💡 Hint: Admin@2024!
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1"
              disabled={!password.trim() || isVerifying}
            >
              {isVerifying ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Lock className="h-4 w-4 mr-2" />
              )}
              {isVerifying ? 'Verifying...' : 'Grant Access'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrivilegeElevationDialog;
