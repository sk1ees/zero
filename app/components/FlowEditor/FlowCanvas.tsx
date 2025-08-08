import React, { useCallback } from 'react';
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
  ConnectionLineType,
  ReactFlowProvider
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
    stroke: 'hsl(var(--primary))',
  };

  if (edge.type === 'conditional') {
    return {
      ...baseStyle,
      stroke: edge.data?.sourceHandle === 'success' 
        ? 'hsl(var(--success))' 
        : 'hsl(var(--destructive))',
      strokeDasharray: '5,5',
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

  // Apply custom styles to edges
  const styledEdges = edges.map(edge => ({
    ...edge,
    style: getEdgeStyle(edge),
    animated: true,
    type: edge.type || 'smoothstep',
  }));

  return (
    <div className="flex-1 relative" style={{ height: '100%', minHeight: '500px' }}>
      <div 
        ref={setNodeRef}
        id="flow-canvas"
        className="w-full h-full"
      >
        <ReactFlowProvider>
          <ReactFlow
          nodes={nodes}
          edges={styledEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className=""
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.5}
          maxZoom={2}
          snapToGrid
          snapGrid={[20, 20]}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          connectionLineStyle={{
            stroke: 'hsl(var(--primary))',
            strokeWidth: 2,
          }}
          connectionLineType={ConnectionLineType.SmoothStep}
          style={{ background: 'transparent' }}
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
        </ReactFlowProvider>
      </div>
    </div>
  );
};