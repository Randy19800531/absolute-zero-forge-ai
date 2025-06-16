
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitBranch, GitMerge, GitCommit, GitPullRequest, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GitRepository {
  id: string;
  name: string;
  url: string;
  branch: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
}

interface GitBranch {
  name: string;
  type: 'feature' | 'hotfix' | 'release' | 'main';
  author: string;
  lastCommit: string;
  ahead: number;
  behind: number;
}

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  timestamp: string;
  files: string[];
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';
}

interface PullRequest {
  id: string;
  title: string;
  source: string;
  target: string;
  status: 'open' | 'merged' | 'closed' | 'draft';
  author: string;
  reviewers: string[];
  checks: { name: string; status: 'pending' | 'success' | 'failure' }[];
}

const GitWorkflowIntegration = () => {
  const { toast } = useToast();
  const [repositories, setRepositories] = useState<GitRepository[]>([]);
  const [branches, setBranches] = useState<GitBranch[]>([]);
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [newBranchName, setNewBranchName] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true);

  useEffect(() => {
    initializeGitData();
  }, []);

  const initializeGitData = () => {
    // Initialize sample repositories
    const sampleRepos: GitRepository[] = [
      {
        id: '1',
        name: 'enterprise-app',
        url: 'https://github.com/company/enterprise-app.git',
        branch: 'main',
        status: 'connected',
        lastSync: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'design-system',
        url: 'https://github.com/company/design-system.git',
        branch: 'develop',
        status: 'connected',
        lastSync: '2024-01-15T09:45:00Z'
      }
    ];
    setRepositories(sampleRepos);
    setSelectedRepo(sampleRepos[0].id);

    // Initialize sample branches
    const sampleBranches: GitBranch[] = [
      {
        name: 'main',
        type: 'main',
        author: 'system',
        lastCommit: '2024-01-15T10:30:00Z',
        ahead: 0,
        behind: 0
      },
      {
        name: 'feature/user-dashboard',
        type: 'feature',
        author: 'john.doe',
        lastCommit: '2024-01-15T09:15:00Z',
        ahead: 3,
        behind: 1
      },
      {
        name: 'hotfix/security-patch',
        type: 'hotfix',
        author: 'jane.smith',
        lastCommit: '2024-01-15T08:45:00Z',
        ahead: 1,
        behind: 0
      },
      {
        name: 'release/v2.1.0',
        type: 'release',
        author: 'release.bot',
        lastCommit: '2024-01-14T16:20:00Z',
        ahead: 0,
        behind: 2
      }
    ];
    setBranches(sampleBranches);

    // Initialize sample commits
    const sampleCommits: GitCommit[] = [
      {
        hash: '7f8a3b2',
        message: 'feat: add enhanced security scanning component',
        author: 'john.doe',
        timestamp: '2024-01-15T10:30:00Z',
        files: ['src/components/security/EnhancedSecurityScanning.tsx', 'src/types/security.ts'],
        type: 'feat'
      },
      {
        hash: '9c4d5e1',
        message: 'fix: resolve authentication timeout issue',
        author: 'jane.smith',
        timestamp: '2024-01-15T09:15:00Z',
        files: ['src/hooks/useAuth.tsx', 'src/services/authService.ts'],
        type: 'fix'
      },
      {
        hash: '2a6b8f3',
        message: 'docs: update API documentation',
        author: 'doc.writer',
        timestamp: '2024-01-15T08:45:00Z',
        files: ['docs/api/README.md', 'docs/api/authentication.md'],
        type: 'docs'
      }
    ];
    setCommits(sampleCommits);

    // Initialize sample pull requests
    const samplePRs: PullRequest[] = [
      {
        id: '1',
        title: 'Add enhanced security scanning features',
        source: 'feature/security-enhancements',
        target: 'main',
        status: 'open',
        author: 'john.doe',
        reviewers: ['jane.smith', 'tech.lead'],
        checks: [
          { name: 'CI/CD Pipeline', status: 'success' },
          { name: 'Security Scan', status: 'success' },
          { name: 'Code Quality', status: 'pending' }
        ]
      },
      {
        id: '2',
        title: 'Hotfix: Critical authentication bug',
        source: 'hotfix/auth-bug',
        target: 'main',
        status: 'merged',
        author: 'jane.smith',
        reviewers: ['john.doe'],
        checks: [
          { name: 'CI/CD Pipeline', status: 'success' },
          { name: 'Security Scan', status: 'success' },
          { name: 'Code Quality', status: 'success' }
        ]
      }
    ];
    setPullRequests(samplePRs);
  };

  const handleCreateBranch = () => {
    if (!newBranchName) {
      toast({
        title: "Branch Name Required",
        description: "Please enter a branch name.",
        variant: "destructive"
      });
      return;
    }

    const newBranch: GitBranch = {
      name: newBranchName,
      type: newBranchName.startsWith('feature/') ? 'feature' : 
            newBranchName.startsWith('hotfix/') ? 'hotfix' :
            newBranchName.startsWith('release/') ? 'release' : 'feature',
      author: 'current.user',
      lastCommit: new Date().toISOString(),
      ahead: 0,
      behind: 0
    };

    setBranches([...branches, newBranch]);
    setNewBranchName('');
    
    toast({
      title: "Branch Created",
      description: `Successfully created branch: ${newBranch.name}`
    });
  };

  const handleCommit = () => {
    if (!commitMessage) {
      toast({
        title: "Commit Message Required",
        description: "Please enter a commit message.",
        variant: "destructive"
      });
      return;
    }

    const commitType = commitMessage.startsWith('feat:') ? 'feat' :
                      commitMessage.startsWith('fix:') ? 'fix' :
                      commitMessage.startsWith('docs:') ? 'docs' :
                      commitMessage.startsWith('style:') ? 'style' :
                      commitMessage.startsWith('refactor:') ? 'refactor' :
                      commitMessage.startsWith('test:') ? 'test' : 'chore';

    const newCommit: GitCommit = {
      hash: Math.random().toString(36).substring(2, 9),
      message: commitMessage,
      author: 'current.user',
      timestamp: new Date().toISOString(),
      files: ['src/components/modified-file.tsx'],
      type: commitType
    };

    setCommits([newCommit, ...commits]);
    setCommitMessage('');
    
    toast({
      title: "Changes Committed",
      description: "Your changes have been committed successfully."
    });
  };

  const handleSync = async (repoId: string) => {
    setRepositories(repos => 
      repos.map(repo => 
        repo.id === repoId 
          ? { ...repo, status: 'syncing' as const }
          : repo
      )
    );

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setRepositories(repos => 
      repos.map(repo => 
        repo.id === repoId 
          ? { ...repo, status: 'connected' as const, lastSync: new Date().toISOString() }
          : repo
      )
    );

    toast({
      title: "Repository Synced",
      description: "Repository has been synchronized successfully."
    });
  };

  const getBranchTypeColor = (type: string) => {
    switch (type) {
      case 'main': return 'bg-green-100 text-green-800';
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'hotfix': return 'bg-red-100 text-red-800';
      case 'release': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommitTypeColor = (type: string) => {
    switch (type) {
      case 'feat': return 'bg-green-100 text-green-800';
      case 'fix': return 'bg-red-100 text-red-800';
      case 'docs': return 'bg-blue-100 text-blue-800';
      case 'style': return 'bg-yellow-100 text-yellow-800';
      case 'refactor': return 'bg-purple-100 text-purple-800';
      case 'test': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCheckStatus = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failure': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />;
      default: return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Git Workflow Integration</h2>
          <p className="text-gray-600">Advanced Git workflow management and version control</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-sync: {isAutoSyncEnabled ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Branches</p>
                <p className="text-2xl font-bold">{branches.length}</p>
              </div>
              <GitBranch className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent Commits</p>
                <p className="text-2xl font-bold">{commits.length}</p>
              </div>
              <GitCommit className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open PRs</p>
                <p className="text-2xl font-bold">{pullRequests.filter(pr => pr.status === 'open').length}</p>
              </div>
              <GitPullRequest className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="repositories" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Connected Repositories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {repositories.map((repo) => (
                <div key={repo.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-sm text-gray-600">{repo.url}</div>
                      <div className="text-xs text-gray-500">
                        Last sync: {new Date(repo.lastSync).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      repo.status === 'connected' ? 'bg-green-100 text-green-800' :
                      repo.status === 'syncing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {repo.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSync(repo.id)}
                      disabled={repo.status === 'syncing'}
                    >
                      <RefreshCw className={`h-4 w-4 ${repo.status === 'syncing' ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Branch Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter branch name (e.g., feature/new-feature)"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                />
                <Button onClick={handleCreateBranch}>Create Branch</Button>
              </div>

              <div className="space-y-2">
                {branches.map((branch, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{branch.name}</div>
                        <div className="text-sm text-gray-600">
                          by {branch.author} • {new Date(branch.lastCommit).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getBranchTypeColor(branch.type)}>
                        {branch.type}
                      </Badge>
                      {branch.ahead > 0 && (
                        <Badge variant="outline" className="text-green-600">
                          +{branch.ahead}
                        </Badge>
                      )}
                      {branch.behind > 0 && (
                        <Badge variant="outline" className="text-red-600">
                          -{branch.behind}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commits">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-5 w-5" />
                Recent Commits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commit-message">Commit Message</Label>
                <Textarea
                  id="commit-message"
                  placeholder="feat: add new feature&#10;fix: resolve bug&#10;docs: update documentation"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
                <Button onClick={handleCommit}>Commit Changes</Button>
              </div>

              <div className="space-y-2">
                {commits.map((commit) => (
                  <div key={commit.hash} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{commit.hash}</code>
                        <Badge className={getCommitTypeColor(commit.type)}>
                          {commit.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {commit.author} • {new Date(commit.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="font-medium mb-1">{commit.message}</div>
                    <div className="text-sm text-gray-600">
                      Modified: {commit.files.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pull-requests">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitPullRequest className="h-5 w-5" />
                Pull Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pullRequests.map((pr) => (
                <div key={pr.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{pr.title}</div>
                      <div className="text-sm text-gray-600">
                        {pr.source} → {pr.target} by {pr.author}
                      </div>
                    </div>
                    <Badge variant={
                      pr.status === 'open' ? 'default' :
                      pr.status === 'merged' ? 'secondary' :
                      pr.status === 'draft' ? 'outline' : 'destructive'
                    }>
                      {pr.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Reviewers:</span> {pr.reviewers.join(', ')}
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Checks:</div>
                      <div className="flex gap-2">
                        {pr.checks.map((check, index) => (
                          <div key={index} className="flex items-center gap-1 text-sm">
                            {getCheckStatus(check.status)}
                            <span>{check.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitMerge className="h-5 w-5" />
                Workflow Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <GitBranch className="h-4 w-4" />
                <AlertDescription>
                  Advanced Git workflows with automated CI/CD integration, branch protection rules, and code quality gates.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Workflow Features</h4>
                  <div className="space-y-2">
                    {[
                      'Automated branch protection',
                      'Required status checks',
                      'Automatic code quality gates',
                      'Integrated security scanning',
                      'Deployment automation',
                      'Release management'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Integration Status</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'GitHub Actions', status: 'active' },
                      { name: 'Code Quality Gates', status: 'active' },
                      { name: 'Security Scanning', status: 'active' },
                      { name: 'Automated Testing', status: 'active' },
                      { name: 'Deployment Pipeline', status: 'pending' },
                      { name: 'Release Automation', status: 'pending' }
                    ].map((integration, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{integration.name}</span>
                        <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GitWorkflowIntegration;
