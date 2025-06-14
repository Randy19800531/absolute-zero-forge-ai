
import React from 'react';
import StatsCard from './StatsCard';
import { Workflow, Brain, Code, Users } from 'lucide-react';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Active Workflows"
        value="24"
        change="+12% from last month"
        icon={Workflow}
        color="blue"
      />
      <StatsCard
        title="AI Agents"
        value="8"
        change="+3 new this week"
        icon={Brain}
        color="purple"
      />
      <StatsCard
        title="VBA Scripts"
        value="156"
        change="+28 generated today"
        icon={Code}
        color="green"
      />
      <StatsCard
        title="Active Users"
        value="1,247"
        change="+5.3% growth"
        icon={Users}
        color="orange"
      />
    </div>
  );
};

export default StatsGrid;
