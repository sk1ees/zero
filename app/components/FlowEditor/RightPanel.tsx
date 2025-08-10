import React, { useState, useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { 
  Zap,
  ChevronLeft,
  Search,
  Filter,
  Plus,
  Sparkles,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Database,
  Globe,
  Smartphone,
  CreditCard,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Play
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NodeData, useAutomationStore } from '../../stores/automationStore';
import { cn } from '@/lib/utils';

// Compact automation apps with their triggers and actions
const automationApps = {
  'Google': {
    icon: Globe,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    triggers: [
      { id: 'google-calendar-event', label: 'New Calendar Event', type: 'trigger' },
      { id: 'google-drive-file', label: 'New File in Drive', type: 'trigger' },
      { id: 'google-forms-response', label: 'New Form Response', type: 'trigger' }
    ],
    actions: [
      { id: 'google-calendar-create', label: 'Create Calendar Event', type: 'action' },
      { id: 'google-drive-upload', label: 'Upload to Drive', type: 'action' },
      { id: 'google-sheets-append', label: 'Append to Sheets', type: 'action' }
    ]
  },
  'Facebook': {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    triggers: [
      { id: 'facebook-page-post', label: 'New Page Post', type: 'trigger' },
      { id: 'facebook-message', label: 'New Message', type: 'trigger' },
      { id: 'facebook-comment', label: 'New Comment', type: 'trigger' }
    ],
    actions: [
      { id: 'facebook-post', label: 'Create Post', type: 'action' },
      { id: 'facebook-send-message', label: 'Send Message', type: 'action' },
      { id: 'facebook-upload-photo', label: 'Upload Photo', type: 'action' }
    ]
  },
  'Slack': {
    icon: MessageSquare,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    triggers: [
      { id: 'slack-message', label: 'New Message', type: 'trigger' },
      { id: 'slack-reaction', label: 'New Reaction', type: 'trigger' },
      { id: 'slack-channel-join', label: 'Channel Join', type: 'trigger' }
    ],
    actions: [
      { id: 'slack-send-message', label: 'Send Message', type: 'action' },
      { id: 'slack-upload-file', label: 'Upload File', type: 'action' },
      { id: 'slack-create-channel', label: 'Create Channel', type: 'action' }
    ]
  },
  'Email': {
    icon: Mail,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    triggers: [
      { id: 'email-received', label: 'Email Received', type: 'trigger' },
      { id: 'email-opened', label: 'Email Opened', type: 'trigger' },
      { id: 'email-clicked', label: 'Email Link Clicked', type: 'trigger' }
    ],
    actions: [
      { id: 'email-send', label: 'Send Email', type: 'action' },
      { id: 'email-reply', label: 'Reply to Email', type: 'action' },
      { id: 'email-forward', label: 'Forward Email', type: 'action' }
    ]
  },
  'Shopify': {
    icon: ShoppingCart,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    triggers: [
      { id: 'shopify-order', label: 'New Order', type: 'trigger' },
      { id: 'shopify-customer', label: 'New Customer', type: 'trigger' },
      { id: 'shopify-product', label: 'Product Updated', type: 'trigger' }
    ],
    actions: [
      { id: 'shopify-create-order', label: 'Create Order', type: 'action' },
      { id: 'shopify-update-customer', label: 'Update Customer', type: 'action' },
      { id: 'shopify-create-product', label: 'Create Product', type: 'action' }
    ]
  },
  'Stripe': {
    icon: CreditCard,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    triggers: [
      { id: 'stripe-payment', label: 'Payment Received', type: 'trigger' },
      { id: 'stripe-subscription', label: 'Subscription Created', type: 'trigger' },
      { id: 'stripe-refund', label: 'Refund Processed', type: 'trigger' }
    ],
    actions: [
      { id: 'stripe-create-payment', label: 'Create Payment', type: 'action' },
      { id: 'stripe-create-customer', label: 'Create Customer', type: 'action' },
      { id: 'stripe-create-refund', label: 'Create Refund', type: 'action' }
    ]
  }
};

interface CompactDraggableNodeProps {
  nodeData: NodeData;
}

const CompactDraggableNode: React.FC<CompactDraggableNodeProps> = ({ nodeData }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: nodeData.id,
    data: nodeData
  });

  const getNodeColor = () => {
    switch (nodeData.type) {
      case 'start':
        return 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20';
      case 'trigger':
        return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20';
      case 'action':
        return 'border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20';
      default:
        return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-950/20';
    }
  };
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group cursor-grab active:cursor-grabbing select-none",
        "p-2 rounded-lg border border-border hover:bg-accent",
        "transition-all duration-150 hover:scale-[1.02]",
        "border-l-2",
        getNodeColor(),
        isDragging && "opacity-50 scale-95 shadow-md"
      )}
      title={nodeData.label}
    >
      <div className="flex items-center gap-2">
        <div className={cn(
          "flex items-center justify-center",
          nodeData.type === 'trigger' && "text-blue-600",
          nodeData.type === 'action' && "text-purple-600"
        )}>
          <Zap className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground group-hover:text-foreground transition-colors truncate">
            {nodeData.label}
          </p>
        </div>
      </div>
    </div>
  );
};

interface RightPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const { setShowConfigPanel } = useAutomationStore();

  const filteredApps = useMemo(() => {
    if (!searchQuery) return Object.keys(automationApps);
    return Object.keys(automationApps).filter(appName =>
      appName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedAppData = selectedApp ? automationApps[selectedApp as keyof typeof automationApps] : undefined;

  const allNodes = useMemo(() => {
    if (!selectedAppData) return [];
    
    const nodes: NodeData[] = [];
    selectedAppData.triggers.forEach(trigger => {
      nodes.push({
        id: trigger.id,
        type: trigger.type as 'trigger',
        label: trigger.label,
        icon: 'Zap',
        app: selectedApp || undefined
      });
    });
    selectedAppData.actions.forEach(action => {
      nodes.push({
        id: action.id,
        type: action.type as 'action',
        label: action.label,
        icon: 'Zap',
        app: selectedApp || undefined
      });
    });
    return nodes;
  }, [selectedAppData, selectedApp]);

  return (
    <div className={cn(
      "bg-card border-l border-border p-3 flex flex-col transition-all duration-300",
      isCollapsed ? "w-12" : "w-64"
    )}>
      {/* Header */}
      <div className="mb-4">
        <div className={cn("flex items-center mb-3", isCollapsed ? "justify-center" : "gap-2")}>
          {!isCollapsed && (
            <>
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Nodes</h2>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
        </div>
        
        {/* Collapse Toggle Button */}
        <div className={cn("flex", isCollapsed ? "justify-center mb-3" : "justify-between items-center mb-3")}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-6 h-6 p-0 hover:bg-accent"
          >
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 h-7 text-xs border-border bg-background focus:bg-background"
              />
            </div>

            {/* Start Node (General) */}
            {!selectedApp && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Start</div>
                </div>
                <div className="space-y-1.5">
                  <CompactDraggableNode
                    nodeData={{ id: 'start-node', type: 'start', label: 'Start', icon: 'Play' }}
                  />
                </div>
              </div>
            )}

            {/* App Selection */}
            {!selectedApp && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Apps</div>
                  <Button variant="ghost" size="sm" className="h-5 px-1.5 text-xs hover:bg-accent">
                    <Filter className="w-2.5 h-2.5 mr-1" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {filteredApps.map((appName) => {
                    const app = automationApps[appName as keyof typeof automationApps];
                    const Icon = app.icon;
                    return (
                      <button
                        key={appName}
                        onClick={() => {
                          setSelectedApp(appName);
                          setShowConfigPanel(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 p-2 rounded-lg border border-border bg-background hover:bg-accent",
                          "cursor-pointer transition-all duration-150 hover:scale-[1.01]",
                          "text-left group"
                        )}
                      >
                        <div className={cn("p-1 rounded-sm", app.color)}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-medium text-foreground group-hover:text-foreground transition-colors truncate">
                          {appName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Back Button when app is selected */}
            {selectedApp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedApp(null);
                  setShowConfigPanel(true);
                }}
                className="w-full justify-start text-xs hover:bg-accent h-6"
              >
                ← Back
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Automation Blocks */}
      {!isCollapsed && selectedApp && (
        <div className="flex-1">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {(() => {
                const app = automationApps[selectedApp as keyof typeof automationApps];
                const Icon = app.icon;
                return (
                  <div className={cn("p-1 rounded-sm", app.color)}>
                    <Icon className="w-3 h-3" />
                  </div>
                );
              })()}
              <h3 className="text-xs font-semibold text-foreground">
                {selectedApp}
              </h3>
            </div>
            <div className="text-xs text-muted-foreground">
              Drag to canvas
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Triggers */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                <h4 className="text-xs font-medium text-blue-600 uppercase tracking-wide">Triggers</h4>
              </div>
              <div className="space-y-1">
                {allNodes.filter(node => node.type === 'trigger').map((node) => (
                  <CompactDraggableNode key={node.id} nodeData={node} />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                <h4 className="text-xs font-medium text-purple-600 uppercase tracking-wide">Actions</h4>
              </div>
              <div className="space-y-1">
                {allNodes.filter(node => node.type === 'action').map((node) => (
                  <CompactDraggableNode key={node.id} nodeData={node} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed State - Show selected app icon */}
      {isCollapsed && selectedApp && (
        <div className="flex-1">
          <div className="space-y-1.5">
            {allNodes.slice(0, 8).map((node) => (
              <div
                key={node.id}
                className="p-1.5 rounded-lg border border-border bg-background hover:bg-accent cursor-grab transition-colors"
                title={node.label}
              >
                <Zap className="w-2.5 h-2.5 mx-auto text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground text-center">
            n8n Community
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-1 bg-muted rounded-full">
              <div className="bg-primary h-1 rounded-full transition-all duration-300" style={{ width: '0%' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
