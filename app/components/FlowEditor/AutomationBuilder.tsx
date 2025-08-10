'use client'
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Sun, Moon, Settings } from 'lucide-react';

import { NodeDragItem } from './NodeDragItem';
import { useAutomationStore, generateNodeId, NodeData } from '../../stores/automationStore';
import { Node } from '@xyflow/react';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { ConfigPanel } from './ConfigPanel';
import { FlowCanvas } from './FlowCanvas';
import { Button } from '../ui/button';
import { useTheme } from '../theme-provider';

export const AutomationBuilder: React.FC = () => {
  const { addNode } = useAutomationStore();
  const [draggedItem, setDraggedItem] = React.useState<NodeData | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleDragStart = (nodeData: NodeData) => {
    setDraggedItem(nodeData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    if (over && over.id === 'flow-canvas' && draggedItem) {
      // Get the canvas element to calculate relative position
      const canvasElement = document.getElementById('flow-canvas');
      if (canvasElement) {
        const rect = canvasElement.getBoundingClientRect();

        // Use the canvas center as default if no mouse position available
        let x = 200; // Default x position
        let y = 200; // Default y position

        // Try to get mouse position from the active element if available
        if (event.activatorEvent) {
          const mouseEvent = event.activatorEvent as MouseEvent;
          if (mouseEvent.clientX && mouseEvent.clientY) {
            x = mouseEvent.clientX - rect.left - 100; // Center the node
            y = mouseEvent.clientY - rect.top - 50;   // Center the node
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
      <div className="min-h-screen bg-background flex w-full">
        {/* Collapsible Left Sidebar */}
        <CollapsibleSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">Automation Builder</h1>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm text-muted-foreground">Select an app and drag triggers/actions to build your workflow</span>
            </div>

            <div className="flex items-center gap-2">
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
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Flow Canvas */}
          <div className="flex-1 relative">
            <FlowCanvas />
          </div>
        </div>

        {/* Right Configuration Panel */}
        <ConfigPanel />

        {/* Drag Overlay */}
        <DragOverlay>
          {draggedItem && <NodeDragItem nodeData={draggedItem} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
};