
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface MasterPasswordFormProps {
  onUnlock: () => void;
}

const MasterPasswordForm = ({ onUnlock }: MasterPasswordFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyMasterPassword = async () => {
    setIsVerifying(true);
    
    try {
      // Simple master password verification - in production, this should be more secure
      const MASTER_PASSWORD = 'Admin@2024!';
      
      if (masterPassword === MASTER_PASSWORD) {
        onUnlock();
        toast({
          title: "Access Granted",
          description: "LLM configuration unlocked successfully.",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid master password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Unable to verify master password.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-red-500" />
          Secure LLM Configuration Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Admin Access Verified</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Role: {role} | User: {user?.email}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="master-password">Master Password</Label>
          <div className="relative">
            <Input
              id="master-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter master password..."
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && verifyMasterPassword()}
              className="pr-10"
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
        
        <Button 
          onClick={verifyMasterPassword}
          className="w-full"
          disabled={!masterPassword.trim() || isVerifying}
        >
          {isVerifying ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Lock className="h-4 w-4 mr-2" />
          )}
          {isVerifying ? 'Verifying...' : 'Unlock Configuration'}
        </Button>

        <div className="text-xs text-gray-500 text-center mt-4">
          <p>🔒 This area contains sensitive API configurations</p>
          <p>Contact your system administrator for access</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MasterPasswordForm;
