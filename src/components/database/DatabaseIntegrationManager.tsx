
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Database, Plus, Settings, Trash2, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis' | 'sqlite';
  host: string;
  port: number;
  database: string;
  username: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnected?: string;
}

const DatabaseIntegrationManager = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<DatabaseConnection[]>([
    {
      id: '1',
      name: 'Production DB',
      type: 'postgresql',
      host: 'prod-db.company.com',
      port: 5432,
      database: 'main_app',
      username: 'app_user',
      status: 'connected',
      lastConnected: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Analytics DB',
      type: 'mongodb',
      host: 'analytics.company.com',
      port: 27017,
      database: 'analytics',
      username: 'analytics_user',
      status: 'disconnected'
    }
  ]);

  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'postgresql' as const,
    host: '',
    port: 5432,
    database: '',
    username: '',
    password: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddConnection = () => {
    if (!newConnection.name || !newConnection.host || !newConnection.database) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const connection: DatabaseConnection = {
      id: Date.now().toString(),
      name: newConnection.name,
      type: newConnection.type,
      host: newConnection.host,
      port: newConnection.port,
      database: newConnection.database,
      username: newConnection.username,
      status: 'disconnected'
    };

    setConnections(prev => [...prev, connection]);
    setNewConnection({
      name: '',
      type: 'postgresql',
      host: '',
      port: 5432,
      database: '',
      username: '',
      password: ''
    });
    setShowAddForm(false);

    toast({
      title: "Connection Added",
      description: `Database connection "${connection.name}" has been added`,
    });
  };

  const handleTestConnection = (id: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id 
        ? { ...conn, status: 'connected', lastConnected: new Date().toISOString() }
        : conn
    ));

    toast({
      title: "Connection Test",
      description: "Connection test successful",
    });
  };

  const handleDeleteConnection = (id: string) => {
    const connection = connections.find(c => c.id === id);
    setConnections(prev => prev.filter(conn => conn.id !== id));

    toast({
      title: "Connection Removed",
      description: `Database connection "${connection?.name}" has been removed`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'default',
      disconnected: 'secondary',
      error: 'destructive'
    } as const;

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getDatabaseIcon = (type: string) => {
    return <Database className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Database Connections</h3>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Connection
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Database Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Connection Name</Label>
                <Input
                  id="name"
                  value={newConnection.name}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Database"
                />
              </div>
              <div>
                <Label htmlFor="type">Database Type</Label>
                <Select value={newConnection.type} onValueChange={(value: any) => setNewConnection(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="redis">Redis</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={newConnection.host}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, host: e.target.value }))}
                  placeholder="localhost"
                />
              </div>
              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  value={newConnection.port}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, port: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="database">Database</Label>
                <Input
                  id="database"
                  value={newConnection.database}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, database: e.target.value }))}
                  placeholder="database_name"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newConnection.username}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newConnection.password}
                onChange={(e) => setNewConnection(prev => ({ ...prev, password: e.target.value }))}
                placeholder="password"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddConnection}>Add Connection</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {connections.map((connection) => (
          <Card key={connection.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getDatabaseIcon(connection.type)}
                  <div>
                    <h4 className="font-semibold">{connection.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {connection.type.toUpperCase()} • {connection.host}:{connection.port}/{connection.database}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusBadge(connection.status)}
                  
                  <Button variant="outline" size="sm" onClick={() => handleTestConnection(connection.id)}>
                    <TestTube className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={() => handleDeleteConnection(connection.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {connection.lastConnected && (
                <p className="text-xs text-muted-foreground mt-2">
                  Last connected: {new Date(connection.lastConnected).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {connections.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-muted-foreground">
          <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No database connections configured</p>
          <p className="text-sm">Add your first database connection to get started</p>
        </div>
      )}
    </div>
  );
};

export default DatabaseIntegrationManager;
