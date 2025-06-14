
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain, Clock, Users } from 'lucide-react';

const ConversationMemory = () => {
  const conversations = [
    {
      id: 1,
      agent: 'Customer Service',
      user: 'John Doe',
      lastMessage: 'Thank you for helping with my billing question',
      timestamp: '2 minutes ago',
      messages: 12,
      sentiment: 'positive',
      context: ['billing', 'payment', 'support'],
    },
    {
      id: 2,
      agent: 'Data Analyst',
      user: 'Jane Smith',
      lastMessage: 'Can you analyze the sales data from Q3?',
      timestamp: '15 minutes ago',
      messages: 8,
      sentiment: 'neutral',
      context: ['sales', 'data analysis', 'quarterly'],
    },
    {
      id: 3,
      agent: 'Code Reviewer',
      user: 'Mike Johnson',
      lastMessage: 'The code looks good, just minor suggestions',
      timestamp: '1 hour ago',
      messages: 25,
      sentiment: 'positive',
      context: ['code review', 'javascript', 'optimization'],
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-gray-500">Total Conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-gray-500">Context Retention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">{conversation.agent}</p>
                      <p className="text-sm text-gray-500">with {conversation.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSentimentColor(conversation.sentiment)}>
                      {conversation.sentiment}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {conversation.timestamp}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{conversation.lastMessage}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {conversation.context.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{conversation.messages} messages</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationMemory;
