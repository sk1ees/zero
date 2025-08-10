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
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { N8nFlowEditor } from '../../components/FlowEditor/N8nFlowEditor';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';

const FlowPage = () => {
  const router = useRouter();
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Workflow Editor Header */}
      <div className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => router.push('/flow')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-3 h-3" />
            <Workflow className="w-4 h-4" />
            <ChevronRight className="w-3 h-3" />
            <span 
              className="text-foreground hover:text-primary cursor-pointer transition-colors"
              onClick={() => router.push('/flow')}
            >
              Workflows
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{workflowName}</span>
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
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
                className="h-8 w-48 text-sm font-medium"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {workflowName}
              </button>
            )}
            <Badge variant="secondary" className="text-xs">Draft</Badge>
          </div>
        </div>

        {/* Center Section - Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2"
          >
            <Eye className="w-3 h-3" />
            Preview
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2"
          >
            <Save className="w-3 h-3" />
            Save
          </Button>
          
          <Button
            size="sm"
            className="h-8 gap-2"
          >
            <Play className="w-3 h-3" />
            Execute
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowMiniMap(!showMiniMap)}
          >
            {showMiniMap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
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
