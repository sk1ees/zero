import { create } from 'zustand';
import { Node, Edge, Connection, NodeChange, EdgeChange } from '@xyflow/react';

export interface NodeConfig {
  method?: string;
  url?: string;
  queryParams?: Array<{ key: string; value: string }>;
  description?: string;
  note?: string;
  hasErrorHandler?: boolean;
  [key: string]: unknown;
}

export interface NodeData extends Record<string, unknown> {
  id: string;
  type: 'start' | 'trigger' | 'action' | 'condition';
  label: string;
  icon: string;
  app?: string; // Add app information
  config?: NodeConfig;
}

export interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  showConfigPanel: boolean;
  
  // Actions
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node<NodeData>) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  removeNode: (nodeId: string) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
  setShowConfigPanel: (show: boolean) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}

let nodeIdCounter = 0;

export const useAutomationStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  showConfigPanel: true,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node]
    }));
  },

  updateNode: (nodeId, updates) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      ),
      selectedNode: state.selectedNode?.id === nodeId
        ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...updates } }
        : state.selectedNode
    }));
  },

  removeNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode
    }));
  },

  setSelectedNode: (node) => set({ selectedNode: node }),
  setShowConfigPanel: (show) => set({ showConfigPanel: show }),

  onNodesChange: (changes) => {
    set((state) => {
      const updatedNodes = [...state.nodes];
      
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const nodeIndex = updatedNodes.findIndex((n) => n.id === change.id);
          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: change.position
            };
          }
        } else if (change.type === 'select') {
          const nodeIndex = updatedNodes.findIndex((n) => n.id === change.id);
          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              selected: change.selected
            };
            
            if (change.selected) {
              set({ selectedNode: updatedNodes[nodeIndex] });
            }
          }
        } else if (change.type === 'remove') {
          get().removeNode(change.id);
          return;
        }
      });
      
      return { nodes: updatedNodes };
    });
  },

  onEdgesChange: (changes) => {
    set((state) => {
      let updatedEdges = [...state.edges];
      
      changes.forEach((change) => {
        if (change.type === 'remove') {
          updatedEdges = updatedEdges.filter((edge) => edge.id !== change.id);
        }
      });
      
      return { edges: updatedEdges };
    });
  },

  onConnect: (connection) => {
    set((state) => {
      // Create a new edge with proper styling
      const newEdge: Edge = {
        id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: 'hsl(var(--primary))',
          strokeWidth: 2,
        },
        data: { sourceHandle: connection.sourceHandle }
      };

      return { edges: [...state.edges, newEdge] };
    });
  }
}));

export const generateNodeId = () => `node-${++nodeIdCounter}`;