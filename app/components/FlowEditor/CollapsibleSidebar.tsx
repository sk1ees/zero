import React, { useState } from 'react';
import { 
  ChevronRight,
  X,
  Settings,
  BarChart3,
  Play,
  GitBranch,
  Plus,
  Filter,
  Grid3X3,
  Sparkles,
  Workflow,
  History,
  Bookmark,
  Folder,
  Search,
  Zap,
  Home,
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
      "bg-background/95 backdrop-blur-sm border-r border-border/50 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-56"
    )}>
      {/* Header */}
      <div className="p-3 border-b border-border/50">
        <div className={cn("flex items-center mb-3", isCollapsed ? "justify-center" : "gap-2")}>
          {!isCollapsed && (
            <>
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">n8n</h2>
              </div>
            </>
          )}
          {isCollapsed && (
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* Collapse Toggle Button */}
        <div className={cn("flex", isCollapsed ? "justify-center mb-3" : "justify-between items-center mb-3")}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-1.5 hover:bg-accent/30 rounded-md transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <X className="w-3 h-3" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">Navigation</div>
              <Button variant="ghost" size="sm" className="h-5 px-1.5 text-xs hover:bg-accent/20">
                <Plus className="w-2.5 h-2.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-sm transition-all duration-150",
                  "hover:bg-accent/10 hover:scale-[1.01] cursor-pointer group",
                  activeItem === item.id 
                    ? "bg-accent/20 text-accent-foreground border border-accent/30" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={cn(
                  "p-1 rounded-sm flex items-center justify-center",
                  activeItem === item.id ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"
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
      <div className="p-3 border-t border-border/50">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground/60 mb-2">Community Edition</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-foreground/80">Executions</span>
                <span className="text-foreground/60">0/∞</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-0.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-0.5 rounded-full transition-all duration-300" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-0.5 bg-muted/20 rounded-full">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-0.5 rounded-full transition-all duration-300" style={{ width: '0%' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};