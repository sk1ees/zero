'use client'
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { 
  Sun, 
  Moon, 
  Settings, 
  Play, 
  Save, 
  Download, 
  Upload, 
  Share2, 
  MoreHorizontal,
  ChevronRight,
  Home,
  Workflow,
  Search,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';

import { NodeDragItem } from './NodeDragItem';
import { useAutomationStore, generateNodeId, NodeData } from '../../stores/automationStore';
import { Node } from '@xyflow/react';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { RightPanel } from './RightPanel';
import { FlowCanvas } from './FlowCanvas';
import { Button } from '../ui/button';
import { useTheme } from '../theme-provider';
import { Input } from '../ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export const N8nFlowEditor: React.FC = () => {
  const { addNode, setShowConfigPanel } = useAutomationStore();
  const [draggedItem, setDraggedItem] = useState<NodeData | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const handleDragStart = (nodeData: NodeData) => {
    setDraggedItem(nodeData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    if (over && over.id === 'flow-canvas' && draggedItem) {
      const canvasElement = document.getElementById('flow-canvas');
      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();
        
        let x = 200;
        let y = 200;
        
        if (event.activatorEvent) {
          const mouseEvent = event.activatorEvent as MouseEvent;
          if (mouseEvent.clientX && mouseEvent.clientY) {
            x = mouseEvent.clientX - rect.left - 100;
            y = mouseEvent.clientY - rect.top - 50;
          }
        }

        const newNode: Node<NodeData> = {
          id: generateNodeId(),
          type: 'automation',
          position: { x: Math.max(50, x), y: Math.max(50, y) },
          data: {
            ...draggedItem,
            id: generateNodeId(),
            config: {
              method: 'GET',
              url: '',
              queryParams: [],
              description: ''
            }
          }
        };

        addNode(newNode);
      }
    }
    
    setDraggedItem(null);
  };

  return (
    <DndContext onDragStart={(event: DragStartEvent) => {
      const nodeData = event.active.data.current as NodeData;
      handleDragStart(nodeData);
    }} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top Navigation Bar - n8n style */}
        <div className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-3 h-3" />
              <Workflow className="w-4 h-4" />
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Workflows</span>
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
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
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

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Collapsible Left Sidebar */}
          <CollapsibleSidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          
          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Toolbar */}
            <div className="h-10 border-b border-border bg-card/30 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Zoom:</span>
                  <span className="font-mono">100%</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Position:</span>
                  <span className="font-mono">0, 0</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  Fit View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  Center
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfigPanel(true)}
                  className="h-6 px-2 text-xs gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </Button>
              </div>
            </div>
            
            {/* Flow Canvas */}
            <div className="flex-1 relative" style={{ height: 'calc(100vh - 96px)' }}>
              <FlowCanvas showMiniMap={showMiniMap} />
            </div>
          </div>
          
          {/* Right Panel for Triggers and Actions */}
          <RightPanel 
            isCollapsed={isRightPanelCollapsed}
            onToggleCollapse={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
          />
        </div>
        
        {/* Drag Overlay */}
        <DragOverlay>
          {draggedItem && <NodeDragItem nodeData={draggedItem} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
