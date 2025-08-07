import React from 'react';
import { Mail, Trello, Database, Zap, Play } from 'lucide-react';
import { NodeData } from '../../stores/automationStore';

const iconMap = {
  Mail,
  Trello,
  Database,
  Zap,
  Play
};

interface NodeDragItemProps {
  nodeData: NodeData;
}

export const NodeDragItem: React.FC<NodeDragItemProps> = ({ nodeData }) => {
  const IconComponent = iconMap[nodeData.icon as keyof typeof iconMap] || Zap;

  const getNodeColor = () => {
    switch (nodeData.type) {
      case 'start':
        return 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-800';
      case 'trigger':
        return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800';
      case 'action':
        return 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800';
      case 'condition':
        return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200 dark:border-gray-800';
    }
  };

  const colorClass = getNodeColor();

  return (
    <div className={`p-3 rounded-xl border-2 bg-card shadow-xl animate-scale-in ${colorClass}`}>
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-lg flex items-center justify-center
          ${colorClass}
        `}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {nodeData.label}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {nodeData.type}
          </p>
        </div>
      </div>
    </div>
  );
};