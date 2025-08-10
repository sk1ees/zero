import React, { useState } from 'react';
import { 
  ChevronRight,
  X,
  Settings,
  BarChart3,
  Play,
  Plus,
  Filter,
  Sparkles,
  Workflow,
  History,
  Bookmark,
  Folder,
  Search,
  Users,
  Bell,
  Calendar,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

// Navigation items for the compact sidebar
const navigationItems = [
  { id: 'workflows', label: 'Workflows', icon: Workflow, active: true },
  { id: 'executions', label: 'Executions', icon: Play },
  { id: 'history', label: 'History', icon: History },
  { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  { id: 'folders', label: 'Folders', icon: Folder },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'files', label: 'Files', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const [activeItem, setActiveItem] = useState('workflows');

  return (
    <div className={cn(
      "bg-card border-r border-border p-3 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-56"
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
                <h2 className="text-sm font-semibold text-foreground">n8n</h2>
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
            {isCollapsed ? <ChevronRight className="w-3 h-3 text-muted-foreground" /> : <X className="w-3 h-3 text-muted-foreground" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Navigation</div>
              <Button variant="ghost" size="sm" className="h-5 px-1.5 text-xs hover:bg-accent">
                <Plus className="w-2.5 h-2.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg transition-colors",
                  "hover:bg-accent cursor-pointer",
                  activeItem === item.id 
                    ? "bg-accent text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={cn(
                  "flex items-center justify-center",
                  activeItem === item.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  <Icon className="w-3 h-3" />
                </div>
                {!isCollapsed && (
                  <span className="text-xs font-medium truncate">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground mb-2">Community Edition</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Executions</span>
                <span className="text-muted-foreground">0/∞</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full transition-all duration-300" style={{ width: '0%' }} />
              </div>
            </div>
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