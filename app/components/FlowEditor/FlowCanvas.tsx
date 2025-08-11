import React, { useCallback, useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
  ConnectionMode,
  Edge,
  Connection,
  Node,
  ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeData, useAutomationStore } from '../../stores/automationStore';
import { AutomationNode } from './AutomationNode';
import { ConditionalEdge } from './ConditionalEdge';
import { useTheme } from '../theme-provider';

type AutomationNodeComponentProps = { id: string; data: NodeData; selected?: boolean } & Record<string, unknown>;
const AutomationNodeComponent = (props: AutomationNodeComponentProps) => <AutomationNode {...props} id={props.id} />;

const nodeTypes = {
  automation: AutomationNodeComponent,
};

const edgeTypes = {
  conditional: ConditionalEdge,
};

// Custom edge styles
const getEdgeStyle = (edge: Edge) => {
  const baseStyle = {
    strokeWidth: 2,
    stroke: '#3b82f6',
    strokeDasharray: '4 4',
  };

  if (edge.type === 'conditional') {
    return {
      ...baseStyle,
      stroke: edge.data?.sourceHandle === 'success' ? '#10b981' : '#ef4444',
      strokeDasharray: '6 3',
    };
  }

  return baseStyle;
};

interface FlowCanvasProps {
  showMiniMap?: boolean;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({ showMiniMap = true }) => {
  const { setNodeRef } = useDroppable({ id: 'flow-canvas' });
  const { theme } = useTheme();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setShowConfigPanel
  } = useAutomationStore();

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);
    setShowConfigPanel(true);
  }, [setSelectedNode, setShowConfigPanel]);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowConfigPanel(false);
  }, [setSelectedNode, setShowConfigPanel]);

  const handleConnect = useCallback((connection: Connection) => {
    onConnect(connection);
  }, [onConnect]);

  // Avoid extra writes during drag; React Flow internal state already tracks position.
  const handleNodeDrag = useCallback(() => {}, []);
  const handleNodeDragStop = useCallback(() => {}, []);

  // Apply custom styles to edges (memoized to avoid identity churn)
  const styledEdges = useMemo(() => (
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
      animated: false,
      type: edge.type || 'smoothstep',
    }))
  ), [edges]);



  return (
    <div className="flex-1 relative" style={{ height: '100%', minHeight: '500px' }}>
      <div
        ref={setNodeRef}
        id="flow-canvas"
        className="w-full h-full relative z-0"
        style={{ position: 'relative', zIndex: 0 }}
      >
          <ReactFlow
            nodes={nodes}
            edges={styledEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            onNodeDrag={handleNodeDrag}
            onNodeDragStop={handleNodeDragStop}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode={ConnectionMode.Loose}
            fitView
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.5}
            maxZoom={2}
            snapToGrid
            snapGrid={[20, 20]}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4 4' }}
            connectionLineType={ConnectionLineType.Straight}
            style={{ background: 'transparent' }}
            deleteKeyCode="Delete"
            multiSelectionKeyCode="Shift"
            panOnDrag={true}
            panOnScroll={false}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            preventScrolling={true}
            attributionPosition="bottom-left"
            // Ensure proper node initialization
            onInit={(reactFlowInstance) => {
              // Force a re-render to ensure all nodes are properly initialized
              // Avoid expensive fitView on init as it can trigger extra reflows while dragging
              // reactFlowInstance.fitView();
            }}

          >
            <Background
              variant={BackgroundVariant.Lines}
              gap={24}
              size={1}
              color={theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.1)"}
            />
            <Controls
              className="bg-card border border-border rounded-lg shadow-lg"
              showInteractive={false}
              position="bottom-right"
            />
            {showMiniMap && (
              <MiniMap
                className="bg-card border border-border rounded-lg shadow-lg"
                maskColor="hsl(var(--muted) / 0.1)"
                nodeColor="hsl(var(--primary))"
                nodeStrokeWidth={2}
                zoomable
                pannable
                position="bottom-left"
              />
            )}

            {/* Canvas Instructions */}
            {nodes.length === 0 && (
              <Panel position="top-center" className="pointer-events-none">
                <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg animate-fade-in">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-foreground">Start Building Your Automation</h3>
                    <p className="text-xs text-muted-foreground">
                      Select an app from the sidebar and drag triggers and actions to create your workflow
                    </p>
                  </div>
                </div>
              </Panel>
            )}
          </ReactFlow>
      </div>
    </div>
  );
};