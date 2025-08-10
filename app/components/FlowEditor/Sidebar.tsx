import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { 
  Mail, 
  Trello, 
  Database, 
  Plus,
  Zap,
  Settings,
  GitBranch,
  Play,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { NodeData } from '../../stores/automationStore';

const nodeTypes: NodeData[] = [
  {
    id: 'trigger-email',
    type: 'trigger',
    label: 'New Email',
    icon: 'Mail'
  },
  {
    id: 'action-trello',
    type: 'action', 
    label: 'Create Trello Card',
    icon: 'Trello'
  },
  {
    id: 'action-database',
    type: 'action',
    label: 'Append to Database',
    icon: 'Database'
  }
];

const iconMap = {
  Mail,
  Trello,
  Database,
  Zap,
  Settings,
  GitBranch
};

interface DraggableNodeProps {
  nodeData: NodeData;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({ nodeData }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: nodeData.id,
    data: nodeData
  });

  const IconComponent = iconMap[nodeData.icon as keyof typeof iconMap] || Zap;
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group cursor-grab active:cursor-grabbing select-none
        p-3 rounded-lg border border-border bg-card hover:bg-accent/50
        transition-all duration-200 hover:scale-[1.02] hover:shadow-md
        ${isDragging ? 'opacity-50' : ''}
        ${nodeData.type === 'trigger' ? 'border-l-4 border-l-trigger' : ''}
        ${nodeData.type === 'action' ? 'border-l-4 border-l-action' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-md flex items-center justify-center
          ${nodeData.type === 'trigger' ? 'bg-trigger/10 text-trigger' : ''}
          ${nodeData.type === 'action' ? 'bg-action/10 text-action' : ''}
        `}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-accent-foreground transition-colors">
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

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">zamuri.ai</h1>
            <p className="text-xs text-sidebar-foreground/60">Professional Plan</p>
          </div>
        </div>
        
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-sidebar-border">
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-primary bg-sidebar-accent rounded-md">
            <Zap className="w-4 h-4" />
            Sync
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
            <Play className="w-4 h-4" />
            Discover
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
            <GitBranch className="w-4 h-4" />
            Interfaces
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
            <Database className="w-4 h-4" />
            Tables
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors">
            <Users className="w-4 h-4" />
            Chatbots
            <span className="ml-auto px-2 py-0.5 text-xs bg-warning text-warning-foreground rounded">BETA</span>
          </a>
        </nav>
      </div>

      {/* Draggable Nodes */}
      <div className="flex-1 p-4">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Automation Blocks</h3>
        <div className="space-y-2">
          {nodeTypes.map((nodeType) => (
            <DraggableNode key={nodeType.id} nodeData={nodeType} />
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 mb-2">Professional plan (Trial)</div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-sidebar-foreground">Task</span>
            <span className="text-sidebar-foreground">324/1,000</span>
          </div>
          <div className="w-full bg-sidebar-accent rounded-full h-1">
            <div className="bg-primary h-1 rounded-full" style={{ width: '32.4%' }} />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-sidebar-foreground">Sync</span>
            <span className="text-sidebar-foreground">Unlimited</span>
          </div>
        </div>
      </div>
    </div>
  );
};