import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mail, Trello, Database, Zap, MoreHorizontal, Play, Edit, Copy, AlertTriangle, Trash2 } from 'lucide-react';
import { NodeData, useAutomationStore } from '../../stores/automationStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const iconMap = {
  Mail,
  Trello,
  Database,
  Zap,
  Play
};

interface AutomationNodeProps {
  data: NodeData;
  selected?: boolean;
  id: string;
}

export const AutomationNode: React.FC<AutomationNodeProps> = ({
  data,
  selected = false,
  id
}) => {
  const { updateNode, removeNode, addNode, nodes } = useAutomationStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(data.label);

  const IconComponent = iconMap[data.icon as keyof typeof iconMap] || Zap;

  // Wrapper card color (no translucent background to avoid "transparent" look)
  const getWrapperColor = () => {
    switch (data.type) {
      case 'start':
        return 'text-green-600 border-green-200 dark:border-green-800';
      case 'trigger':
        return 'text-blue-600 border-blue-200 dark:border-blue-800';
      case 'action':
        return 'text-purple-600 border-purple-200 dark:border-purple-800';
      case 'condition':
        return 'text-orange-600 border-orange-200 dark:border-orange-800';
      default:
        return 'text-gray-600 border-gray-200 dark:border-gray-800';
    }
  };

  // Icon chip/tile color (soft tinted background for the small icon area)
  const getIconColor = () => {
    switch (data.type) {
      case 'start':
        return 'bg-green-500/10 text-green-600';
      case 'trigger':
        return 'bg-blue-500/10 text-blue-600';
      case 'action':
        return 'bg-purple-500/10 text-purple-600';
      case 'condition':
        return 'bg-orange-500/10 text-orange-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  const getHandleColor = () => {
    switch (data.type) {
      case 'start':
        return 'bg-green-500 border-green-200 dark:border-green-800';
      case 'trigger':
        return 'bg-blue-500 border-blue-200 dark:border-blue-800';
      case 'action':
        return 'bg-purple-500 border-purple-200 dark:border-purple-800';
      case 'condition':
        return 'bg-orange-500 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-500 border-gray-200 dark:border-gray-800';
    }
  };

  const handleRename = () => {
    if (newName.trim() && newName !== data.label) {
      updateNode(id, { label: newName.trim() });
    }
    setIsRenaming(false);
  };

  const handleDuplicate = () => {
    const currentNode = nodes.find(n => n.id === id);
    if (currentNode) {
      const newNode = {
        ...currentNode,
        id: `${data.type}-${Date.now()}`,
        position: {
          x: currentNode.position.x + 200,
          y: currentNode.position.y + 100
        },
        data: {
          ...currentNode.data,
          id: `${data.type}-${Date.now()}`,
          label: `${data.label} (Copy)`
        }
      };
      addNode(newNode);
    }
  };

  const handleAddErrorHandler = () => {
    updateNode(id, {
      config: {
        ...data.config,
        hasErrorHandler: true
      }
    });
  };

  const handleDelete = () => {
    removeNode(id);
  };

  const wrapperColorClass = getWrapperColor();
  const iconColorClass = getIconColor();
  const handleColor = getHandleColor();

  return (
    <>
      <div className={`
        relative bg-card border-2 rounded-xl shadow-lg
        min-w-[220px] max-w-[280px]
        transition-shadow transition-colors duration-200
        ${selected ? 'ring-2 ring-primary ring-offset-2 shadow-xl' : 'hover:shadow-md'}
        ${wrapperColorClass}
      `}>
        {/* Input Handle - Only show for non-start nodes */}
        {data.type !== 'start' && (
          <Handle
            type="target"
            position={Position.Top}
            id="target"
            className={`w-3 h-3 border-2 ${handleColor} hover:scale-110 transition-transform`}
            style={{ zIndex: 1000 }}
          />
        )}

        {/* Node Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-lg flex items-center justify-center
                ${iconColorClass}
              `}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                {isRenaming ? (
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRename}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename();
                      if (e.key === 'Escape') {
                        setNewName(data.label);
                        setIsRenaming(false);
                      }
                    }}
                    className="h-6 text-sm font-medium bg-background"
                    autoFocus
                  />
                ) : (
                  <h3 className="font-semibold text-foreground text-sm truncate">{data.label}</h3>
                )}
                <p className="text-xs text-muted-foreground capitalize">{data.type}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-60 hover:opacity-100">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddErrorHandler}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Add error handler
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Configuration Summary */}
          {data.config && (
            <div className="space-y-1.5">
              {data.config.method && (
                <div className="text-xs text-muted-foreground">
                  Method: <span className="text-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{data.config.method}</span>
                </div>
              )}
              {data.config.url && (
                <div className="text-xs text-muted-foreground truncate">
                  URL: <span className="text-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{data.config.url}</span>
                </div>
              )}
            </div>
          )}

          {/* Note Display */}
          {data.config?.note && (
            <div className="mt-3 p-2 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              📝 {data.config.note}
            </div>
          )}

          {/* Error Handler Indicator */}
          {data.config?.hasErrorHandler && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-3 h-3" />
              Error handler enabled
            </div>
          )}
        </div>

        {/* Output Handles for Actions/Conditions */}
        {(data.type === 'action' || data.type === 'condition') && (
          <>
            <Handle
              type="source"
              position={Position.Bottom}
              id="success"
              className="w-3 h-3 border-2 bg-green-500 border-green-200 dark:border-green-800 hover:scale-110 transition-transform"
              style={{ left: '40%', zIndex: 1000 }}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="error"
              className="w-3 h-3 border-2 bg-red-500 border-red-200 dark:border-red-800 hover:scale-110 transition-transform"
              style={{ left: '60%', zIndex: 1000 }}
            />

            {/* Success/Error Labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-8">
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Success</div>
              <div className="text-xs text-red-600 dark:text-red-400 font-medium">Error</div>
            </div>
          </>
        )}

        {/* Single Output Handle for Triggers and Start nodes */}
        {(data.type === 'trigger' || data.type === 'start') && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="source"
            className={`w-3 h-3 border-2 ${handleColor} hover:scale-110 transition-transform`}
            style={{ zIndex: 1000 }}
          />
        )}
      </div>
    </>
  );
};