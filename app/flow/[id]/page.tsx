'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  ChevronRight,
  Home,
  Workflow,
  Eye,
  EyeOff,
  Save,
  Play,
  MoreHorizontal,
  Download,
  Upload,
  Share2,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { N8nFlowEditor } from '../../components/FlowEditor/N8nFlowEditor';
import { useTheme } from '../../components/theme-provider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';

const FlowPage = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Workflow Editor Header */}
      <div className="h-12 border-b border-border bg-card flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={() => router.push('/flow')}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Home className="w-3 h-3" />
            <ChevronRight className="w-2.5 h-2.5" />
            <Workflow className="w-3 h-3" />
            <ChevronRight className="w-2.5 h-2.5" />
            <span 
              className="text-foreground hover:text-primary cursor-pointer transition-colors"
              onClick={() => router.push('/flow')}
            >
              Workflows
            </span>
            <ChevronRight className="w-2.5 h-2.5" />
            <span className="text-foreground">{workflowName}</span>
          </div>
          
          <Separator orientation="vertical" className="h-4" />
          
          {/* Workflow Name */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingName(false);
                  if (e.key === 'Escape') setIsEditingName(false);
                }}
                className="h-7 w-40 text-xs font-medium"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                {workflowName}
              </button>
            )}
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">Draft</Badge>
          </div>
        </div>

        {/* Center Section - Action Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
          >
            <Eye className="w-3 h-3" />
            Preview
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
          >
            <Save className="w-3 h-3" />
            Save
          </Button>
          
          <Button
            size="sm"
            className="h-7 gap-1.5 text-xs"
          >
            <Play className="w-3 h-3" />
            Execute
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={() => setShowMiniMap(!showMiniMap)}
          >
            {showMiniMap ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-7 w-7 p-0 hover:bg-accent"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-accent"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Flow Editor Content */}
      <div className="flex-1">
        <N8nFlowEditor />
      </div>
    </div>
  );
};

export default FlowPage;
