
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Database, Server, Zap, Shield, Settings, Eye, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis' | 'sqlite' | 'supabase';
  host: string;
  port: number;
  database: string;
  username: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastConnection: string;
  ssl: boolean;
  poolSize: number;
}

interface DatabaseTable {
  name: string;
  type: 'table' | 'view' | 'function';
  columns: number;
  rows: number;
  size: string;
}

interface QueryHistory {
  id: string;
  query: string;
  timestamp: string;
  duration: number;
  rows: number;
  status: 'success' | 'error';
}

const DatabaseIntegrationManager = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<string>('');
  const [newConnectionForm, setNewConnectionForm] = useState({
    name: '',
    type: 'postgresql' as const,
    host: '',
    port: 5432,
    database: '',
    username: '',
    password: '',
    ssl: true
  });
  const [queryText, setQueryText] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    initializeDatabaseData();
  }, []);

  const initializeDatabaseData = () => {
    // Initialize sample connections
    const sampleConnections: DatabaseConnection[] = [
      {
        id: '1',
        name: 'Production Database',
        type: 'postgresql',
        host: 'prod-db.company.com',
        port: 5432,
        database: 'enterprise_app',
        username: 'app_user',
        status: 'connected',
        lastConnection: '2024-01-15T10:30:00Z',
        ssl: true,
        poolSize: 20
      },
      {
        id: '2',
        name: 'Development Database',
        type: 'postgresql',
        host: 'dev-db.company.com',
        port: 5432,
        database: 'enterprise_app_dev',
        username: 'dev_user',
        status: 'connected',
        lastConnection: '2024-01-15T10:25:00Z',
        ssl: false,
        poolSize: 10
      },
      {
        id: '3',
        name: 'Analytics Warehouse',
        type: 'postgresql',
        host: 'analytics.company.com',
        port: 5432,
        database: 'data_warehouse',
        username: 'analytics_user',
        status: 'disconnected',
        lastConnection: '2024-01-14T16:45:00Z',
        ssl: true,
        poolSize: 5
      },
      {
        id: '4',
        name: 'Cache Storage',
        type: 'redis',
        host: 'cache.company.com',
        port: 6379,
        database: '0',
        username: 'cache_user',
        status: 'connected',
        lastConnection: '2024-01-15T10:29:00Z',
        ssl: true,
        poolSize: 15
      }
    ];
    setConnections(sampleConnections);
    setSelectedConnection(sampleConnections[0].id);

    // Initialize sample tables
    const sampleTables: DatabaseTable[] = [
      { name: 'users', type: 'table', columns: 12, rows: 45623, size: '2.3 MB' },
      { name: 'orders', type: 'table', columns: 18, rows: 123456, size: '8.7 MB' },
      { name: 'products', type: 'table', columns: 15, rows: 3456, size: '1.2 MB' },
      { name: 'user_analytics_view', type: 'view', columns: 8, rows: 45623, size: 'N/A' },
      { name: 'calculate_revenue', type: 'function', columns: 0, rows: 0, size: 'N/A' }
    ];
    setTables(sampleTables);

    // Initialize sample query history
    const sampleQueries: QueryHistory[] = [
      {
        id: '1',
        query: 'SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL \'1 month\'',
        timestamp: '2024-01-15T10:30:00Z',
        duration: 45,
        rows: 1,
        status: 'success'
      },
      {
        id: '2',
        query: 'SELECT * FROM orders JOIN products ON orders.product_id = products.id',
        timestamp: '2024-01-15T10:25:00Z',
        duration: 1200,
        rows: 8756,
        status: 'success'
      },
      {
        id: '3',
        query: 'UPDATE users SET last_login = NOW() WHERE id = ?',
        timestamp: '2024-01-15T10:20:00Z',
        duration: 15,
        rows: 1,
        status: 'success'
      }
    ];
    setQueryHistory(sampleQueries);
  };

  const handleCreateConnection = async () => {
    if (!newConnectionForm.name || !newConnectionForm.host) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);

    try {
      // Simulate connection attempt
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newConnection: DatabaseConnection = {
        id: Date.now().toString(),
        ...newConnectionForm,
        status: 'connected',
        lastConnection: new Date().toISOString(),
        poolSize: 10
      };

      setConnections([...connections, newConnection]);
      setNewConnectionForm({
        name: '',
        type: 'postgresql',
        host: '',
        port: 5432,
        database: '',
        username: '',
        password: '',
        ssl: true
      });

      toast({
        title: "Connection Created",
        description: `Successfully connected to ${newConnection.name}`
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to establish database connection.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTestConnection = async (connectionId: string) => {
    setConnections(conns => 
      conns.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: 'connecting' as const }
          : conn
      )
    );

    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1500));

    setConnections(conns => 
      conns.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: 'connected' as const, lastConnection: new Date().toISOString() }
          : conn
      )
    );

    toast({
      title: "Connection Tested",
      description: "Database connection is working properly."
    });
  };

  const handleExecuteQuery = () => {
    if (!queryText.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a SQL query to execute.",
        variant: "destructive"
      });
      return;
    }

    const newQuery: QueryHistory = {
      id: Date.now().toString(),
      query: queryText,
      timestamp: new Date().toISOString(),
      duration: Math.floor(Math.random() * 1000) + 10,
      rows: Math.floor(Math.random() * 10000),
      status: 'success'
    };

    setQueryHistory([newQuery, ...queryHistory]);
    setQueryText('');

    toast({
      title: "Query Executed",
      description: `Query completed in ${newQuery.duration}ms, returned ${newQuery.rows} rows.`
    });
  };

  const handleDeleteConnection = (connectionId: string) => {
    setConnections(connections.filter(conn => conn.id !== connectionId));
    if (selectedConnection === connectionId) {
      setSelectedConnection(connections[0]?.id || '');
    }
    toast({
      title: "Connection Deleted",
      description: "Database connection has been removed."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'connecting': return 'bg-yellow-100 text-yellow-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDatabaseIcon = (type: string) => {
    switch (type) {
      case 'postgresql': return '🐘';
      case 'mysql': return '🐬';
      case 'mongodb': return '🍃';
      case 'redis': return '📦';
      case 'sqlite': return '📄';
      case 'supabase': return '⚡';
      default: return '🗄️';
    }
  };

  const getTableTypeColor = (type: string) => {
    switch (type) {
      case 'table': return 'bg-blue-100 text-blue-800';
      case 'view': return 'bg-purple-100 text-purple-800';
      case 'function': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database Integration Manager</h2>
          <p className="text-gray-600">Visual database connection and management interface</p>
        </div>
        <Button onClick={() => {}}>
          <Plus className="h-4 w-4 mr-2" />
          Add Connection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-green-600">
                  {connections.filter(c => c.status === 'connected').length}
                </p>
              </div>
              <Database className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tables</p>
                <p className="text-2xl font-bold text-blue-600">{tables.length}</p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Query History</p>
                <p className="text-2xl font-bold text-purple-600">{queryHistory.length}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Size</p>
                <p className="text-2xl font-bold text-orange-600">12.2 MB</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="query">Query Console</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Connections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getDatabaseIcon(connection.type)}</span>
                      <div>
                        <div className="font-medium">{connection.name}</div>
                        <div className="text-sm text-gray-600">
                          {connection.host}:{connection.port}/{connection.database}
                        </div>
                        <div className="text-xs text-gray-500">
                          Last connected: {new Date(connection.lastConnection).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestConnection(connection.id)}
                        disabled={connection.status === 'connecting'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteConnection(connection.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Connection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="connection-name">Connection Name</Label>
                    <Input
                      id="connection-name"
                      value={newConnectionForm.name}
                      onChange={(e) => setNewConnectionForm({
                        ...newConnectionForm,
                        name: e.target.value
                      })}
                      placeholder="My Database"
                    />
                  </div>
                  <div>
                    <Label htmlFor="database-type">Database Type</Label>
                    <Select 
                      value={newConnectionForm.type} 
                      onValueChange={(value: any) => setNewConnectionForm({
                        ...newConnectionForm,
                        type: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="redis">Redis</SelectItem>
                        <SelectItem value="sqlite">SQLite</SelectItem>
                        <SelectItem value="supabase">Supabase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="host">Host</Label>
                    <Input
                      id="host"
                      value={newConnectionForm.host}
                      onChange={(e) => setNewConnectionForm({
                        ...newConnectionForm,
                        host: e.target.value
                      })}
                      placeholder="localhost"
                    />
                  </div>
                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      type="number"
                      value={newConnectionForm.port}
                      onChange={(e) => setNewConnectionForm({
                        ...newConnectionForm,
                        port: parseInt(e.target.value) || 5432
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    value={newConnectionForm.database}
                    onChange={(e) => setNewConnectionForm({
                      ...newConnectionForm,
                      database: e.target.value
                    })}
                    placeholder="my_database"
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newConnectionForm.username}
                    onChange={(e) => setNewConnectionForm({
                      ...newConnectionForm,
                      username: e.target.value
                    })}
                    placeholder="database_user"
                  />
                </div>

                <Button 
                  onClick={handleCreateConnection}
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? 'Connecting...' : 'Create Connection'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Database Tables & Objects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tables.map((table, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{table.name}</div>
                        <div className="text-sm text-gray-600">
                          {table.type !== 'function' ? `${table.columns} columns • ${table.rows.toLocaleString()} rows` : 'Database function'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTableTypeColor(table.type)}>
                        {table.type}
                      </Badge>
                      <span className="text-sm text-gray-600">{table.size}</span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="query">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Query Console
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="connection-select">Connection</Label>
                  <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select connection" />
                    </SelectTrigger>
                    <SelectContent>
                      {connections.filter(c => c.status === 'connected').map((conn) => (
                        <SelectItem key={conn.id} value={conn.id}>
                          {conn.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="query-text">SQL Query</Label>
                  <textarea
                    id="query-text"
                    className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="SELECT * FROM users WHERE created_at > NOW() - INTERVAL '1 week';"
                  />
                </div>

                <Button onClick={handleExecuteQuery} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Execute Query
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {queryHistory.map((query) => (
                  <div key={query.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={query.status === 'success' ? 'default' : 'destructive'}>
                        {query.status}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {query.duration}ms • {query.rows} rows
                      </span>
                    </div>
                    <code className="text-sm bg-gray-100 p-2 rounded block overflow-x-auto">
                      {query.query}
                    </code>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(query.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Database Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription>
                  Real-time database monitoring, performance metrics, and connection pooling management coming soon.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Advanced security settings, connection encryption, and access control configuration options.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseIntegrationManager;
