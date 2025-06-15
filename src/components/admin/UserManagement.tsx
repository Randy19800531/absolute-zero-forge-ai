
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Crown, Shield, User, Plus } from 'lucide-react';
import type { UserRole } from '@/hooks/useUserRole';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailToPromote, setEmailToPromote] = useState('');
  const [roleToAssign, setRoleToAssign] = useState<UserRole>('admin');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return;
      }

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        return;
      }

      const usersWithRoles: UserWithRole[] = profiles.map(profile => {
        const userRole = roles.find(r => r.user_id === profile.id);
        return {
          ...profile,
          role: (userRole?.role as UserRole) || 'user'
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async () => {
    if (!emailToPromote.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('assign_superuser_role', {
        _email: emailToPromote.trim()
      });

      if (error) {
        console.error('Error assigning role:', error);
        toast({
          title: "Error",
          description: "Failed to assign role. Make sure the user exists.",
          variant: "destructive",
        });
        return;
      }

      // If we're assigning a specific role other than superuser, update it
      if (roleToAssign !== 'superuser') {
        const user = users.find(u => u.email === emailToPromote.trim());
        if (user) {
          await supabase
            .from('user_roles')
            .upsert({
              user_id: user.id,
              role: roleToAssign
            });
        }
      }

      toast({
        title: "Role Assigned",
        description: `Successfully assigned ${roleToAssign} role to ${emailToPromote}`,
      });

      setEmailToPromote('');
      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'superuser':
        return <Crown className="h-4 w-4 text-purple-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'superuser':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Assign Role Section */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Assign Admin/Superuser Role
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder="user@example.com"
              value={emailToPromote}
              onChange={(e) => setEmailToPromote(e.target.value)}
              className="flex-1"
            />
            <Select value={roleToAssign} onValueChange={(value: UserRole) => setRoleToAssign(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superuser">Superuser</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={assignRole} disabled={loading}>
              Assign
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            The user must have an account before you can assign them a role.
          </p>
        </div>

        {/* Users List */}
        <div>
          <h3 className="font-medium mb-4">All Users</h3>
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getRoleIcon(user.role)}
                    <div>
                      <p className="font-medium">{user.full_name || user.email}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
