'use client'
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { 
  Plus
} from 'lucide-react';

import { NodeDragItem } from './NodeDragItem';
import { useAutomationStore, generateNodeId, NodeData } from '../../stores/automationStore';
import { Node } from '@xyflow/react';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { RightPanel } from './RightPanel';
import { FlowCanvas } from './FlowCanvas';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export const N8nFlowEditor: React.FC = () => {
  const { addNode, setShowConfigPanel } = useAutomationStore();
  const [draggedItem, setDraggedItem] = useState<NodeData | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

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
            <FlowCanvas showMiniMap={false} />
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
    </DndContext>
  );
};
