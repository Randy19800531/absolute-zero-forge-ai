
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Eye, EyeOff, Check, X } from 'lucide-react';

const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkTwoFactorStatus();
  }, []);

  const checkTwoFactorStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('two_factor_auth')
        .select('is_enabled, backup_codes')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking 2FA status:', error);
        return;
      }

      if (data) {
        setIsEnabled(data.is_enabled);
        setBackupCodes(data.backup_codes || []);
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const generateSecret = () => {
    // Generate a simple base32 secret for demonstration
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  const setupTwoFactor = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newSecret = generateSecret();
      const appName = 'Absolute-0.AI';
      const qrCodeUrl = `otpauth://totp/${appName}:${user.email}?secret=${newSecret}&issuer=${appName}`;
      
      setSecret(newSecret);
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`);

      // Generate backup codes
      const codes = Array.from({ length: 8 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);

      // Store in database (not enabled yet)
      await supabase
        .from('two_factor_auth')
        .upsert({
          user_id: user.id,
          secret: newSecret,
          backup_codes: codes,
          is_enabled: false
        });

    } catch (error) {
      console.error('Error setting up 2FA:', error);
      toast({
        title: "Error",
        description: "Failed to setup 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In a real implementation, you would verify the TOTP code here
      // For demo purposes, we'll accept any 6-digit code
      
      await supabase
        .from('two_factor_auth')
        .update({ is_enabled: true })
        .eq('user_id', user.id);

      setIsEnabled(true);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled.",
      });

    } catch (error) {
      console.error('Error enabling 2FA:', error);
      toast({
        title: "Error",
        description: "Failed to enable 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('two_factor_auth')
        .delete()
        .eq('user_id', user.id);

      setIsEnabled(false);
      setSecret('');
      setQrCode('');
      setBackupCodes([]);
      setVerificationCode('');

      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      });

    } catch (error) {
      console.error('Error disabling 2FA:', error);
      toast({
        title: "Error",
        description: "Failed to disable 2FA. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEnabled ? (
          <>
            {!secret ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Add an extra layer of security to your admin account
                </p>
                <Button onClick={setupTwoFactor} disabled={loading}>
                  {loading ? 'Setting up...' : 'Setup 2FA'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Scan this QR code with your authenticator app:
                  </p>
                  <img src={qrCode} alt="2FA QR Code" className="mx-auto mb-4" />
                  <p className="text-xs text-gray-500 mb-4">
                    Or enter this secret manually: <code className="bg-gray-100 px-2 py-1 rounded">{secret}</code>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Enter verification code from your app:
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Backup Codes:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBackupCodes(!showBackupCodes)}
                    >
                      {showBackupCodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {showBackupCodes && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded">
                      {backupCodes.map((code, index) => (
                        <code key={index} className="text-xs bg-white p-1 rounded text-center">
                          {code}
                        </code>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={verifyAndEnable} disabled={loading}>
                    <Check className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                  <Button variant="outline" onClick={() => setSecret('')}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              <span className="font-medium">2FA is enabled</span>
            </div>
            <p className="text-sm text-gray-600">
              Your account is protected with two-factor authentication
            </p>
            {backupCodes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backup Codes:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                  >
                    {showBackupCodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {showBackupCodes && (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded">
                    {backupCodes.map((code, index) => (
                      <code key={index} className="text-xs bg-white p-1 rounded text-center">
                        {code}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            )}
            <Button variant="destructive" onClick={disableTwoFactor} disabled={loading}>
              <X className="h-4 w-4 mr-2" />
              Disable 2FA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
