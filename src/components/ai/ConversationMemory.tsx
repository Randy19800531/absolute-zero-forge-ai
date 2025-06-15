
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain, Clock, Users, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  agent: string;
  user: string;
  lastMessage: string;
  timestamp: string;
  messages: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  context: string[];
}

const ConversationMemory = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState({
    totalConversations: 0,
    contextRetention: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Load conversations from localStorage
    const storedConversations = JSON.parse(localStorage.getItem('ai_conversations') || '[]');
    setConversations(storedConversations);
    
    // Calculate stats
    const uniqueUsers = new Set(storedConversations.map((c: Conversation) => c.user)).size;
    setStats({
      totalConversations: storedConversations.length,
      contextRetention: storedConversations.length > 0 ? Math.round((storedConversations.filter((c: Conversation) => c.context.length > 0).length / storedConversations.length) * 100) : 0,
      activeUsers: uniqueUsers,
    });
  }, []);

  const clearAllConversations = () => {
    localStorage.removeItem('ai_conversations');
    setConversations([]);
    setStats({ totalConversations: 0, contextRetention: 0, activeUsers: 0 });
    toast({
      title: "Conversations Cleared",
      description: "All conversation memory has been cleared.",
    });
  };

  const deleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(c => c.id !== conversationId);
    setConversations(updatedConversations);
    localStorage.setItem('ai_conversations', JSON.stringify(updatedConversations));
    
    const uniqueUsers = new Set(updatedConversations.map(c => c.user)).size;
    setStats({
      totalConversations: updatedConversations.length,
      contextRetention: updatedConversations.length > 0 ? Math.round((updatedConversations.filter(c => c.context.length > 0).length / updatedConversations.length) * 100) : 0,
      activeUsers: uniqueUsers,
    });
    
    toast({
      title: "Conversation Deleted",
      description: "The conversation has been removed from memory.",
    });
  };

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
                <p className="text-2xl font-bold">{stats.totalConversations}</p>
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
                <p className="text-2xl font-bold">{stats.contextRetention}%</p>
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
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Conversation Memory</CardTitle>
            {conversations.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllConversations}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-gray-500">Conversation memory will appear here as your agents interact with users.</p>
            </div>
          ) : (
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteConversation(conversation.id)}
                        className="text-red-600 ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationMemory;
