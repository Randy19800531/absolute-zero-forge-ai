import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Clock, User, Flag } from 'lucide-react';

const TaskBoard = () => {
  const [tasks] = useState({
    todo: [
      {
        id: '1',
        title: 'Design user authentication flow',
        description: 'Create wireframes and mockups for login/register pages',
        priority: 'high',
        assignee: 'JD',
        hours: 8,
        storyPoints: 5
      },
      {
        id: '2',
        title: 'Setup database schema',
        description: 'Create tables for users, projects, and tasks',
        priority: 'medium',
        assignee: 'SM',
        hours: 4,
        storyPoints: 3
      }
    ],
    inProgress: [
      {
        id: '3',
        title: 'Implement user registration',
        description: 'Build registration form with validation',
        priority: 'high',
        assignee: 'JD',
        hours: 12,
        storyPoints: 8
      },
      {
        id: '4',
        title: 'Create project dashboard',
        description: 'Build main dashboard with project overview',
        priority: 'medium',
        assignee: 'AL',
        hours: 16,
        storyPoints: 13
      }
    ],
    review: [
      {
        id: '5',
        title: 'User profile page',
        description: 'Allow users to edit their profile information',
        priority: 'low',
        assignee: 'SM',
        hours: 6,
        storyPoints: 5
      }
    ],
    done: [
      {
        id: '6',
        title: 'Project setup',
        description: 'Initialize React project with necessary dependencies',
        priority: 'high',
        assignee: 'JD',
        hours: 4,
        storyPoints: 2
      },
      {
        id: '7',
        title: 'Design system setup',
        description: 'Setup Tailwind CSS and component library',
        priority: 'medium',
        assignee: 'AL',
        hours: 6,
        storyPoints: 3
      }
    ]
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-3 cursor-move hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm">{task.title}</h4>
            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
              <Flag className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-600">{task.assignee}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.hours}h
              </div>
              <Badge variant="outline" className="text-xs">
                {task.storyPoints} SP
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Column = ({ title, tasks: columnTasks, count }: { title: string; tasks: any[]; count: number }) => (
    <div className="flex-1 min-w-80">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <span>{title}</span>
            <Badge variant="secondary">{count}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-96 overflow-y-auto">
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <Button variant="outline" className="w-full border-dashed" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Board</h2>
          <p className="text-gray-600">Manage and track task progress across the development pipeline</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Sprint Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Sprint 2024-01</h3>
              <p className="text-sm text-gray-600">Implement user authentication and dashboard improvements</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                52h / 80h capacity
              </span>
              <Badge>8 days remaining</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        <Column title="To Do" tasks={tasks.todo} count={tasks.todo.length} />
        <Column title="In Progress" tasks={tasks.inProgress} count={tasks.inProgress.length} />
        <Column title="Review" tasks={tasks.review} count={tasks.review.length} />
        <Column title="Done" tasks={tasks.done} count={tasks.done.length} />
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.todo.length}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{tasks.inProgress.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{tasks.review.length}</div>
            <div className="text-sm text-gray-600">In Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{tasks.done.length}</div>
            <div className="text-sm text-gray-600">Done</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskBoard;
