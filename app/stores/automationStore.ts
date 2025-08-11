import { create } from 'zustand';
import {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from '@xyflow/react';

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

// Throttle frequent drag position updates into rAF to avoid update-depth loops under heavy interaction
let pendingNodeChanges: NodeChange[] = [];
let rafScheduled: number | null = null;

function getNodeChangeKey(change: NodeChange): string | null {
  const c: any = change as any;
  if (c && typeof c.id === 'string') return c.id as string;
  if (c && c.item && typeof c.item.id === 'string') return c.item.id as string;
  return null;
}

function mergeNodeChangesById(changes: NodeChange[]): NodeChange[] {
  const map = new Map<string, NodeChange>();
  const passthrough: NodeChange[] = [];
  for (const change of changes) {
    const key = getNodeChangeKey(change);
    if (!key) {
      passthrough.push(change);
      continue;
    }
    map.set(key, change);
  }
  return [...passthrough, ...Array.from(map.values())];
}

export const useAutomationStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  showConfigPanel: true,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, {
        ...node,
        // Ensure the node has all required properties for React Flow
        id: node.id,
        position: node.position || { x: 0, y: 0 },
        data: node.data,
        type: node.type || 'automation',
        // Ensure these properties are set for proper React Flow initialization
        draggable: true,
        selectable: true,
        deletable: true
      }]
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

  setSelectedNode: (node) => set({ selectedNode: node, showConfigPanel: node !== null }),
  setShowConfigPanel: (show) => set({ showConfigPanel: show }),

  onNodesChange: (changes) => {
    // Batch frequent drag changes into a single rAF update for performance
    pendingNodeChanges.push(...changes);
    if (rafScheduled != null) return;
    rafScheduled = window.requestAnimationFrame(() => {
      const batched = mergeNodeChangesById(pendingNodeChanges);
      pendingNodeChanges = [];
      rafScheduled = null;

      set((state) => {
        const nextNodes = applyNodeChanges(batched, state.nodes) as Node<NodeData>[];
        const hasSelectChange = batched.some((c) => c.type === 'select');
        let nextSelectedNode = state.selectedNode;
        let nextShowConfigPanel = state.showConfigPanel;
        if (hasSelectChange) {
          for (const change of batched) {
            if (change.type === 'select') {
              const changedNode = nextNodes.find((n) => n.id === change.id);
              if (change.selected && changedNode) {
                nextSelectedNode = changedNode as Node<NodeData>;
                nextShowConfigPanel = true;
              }
            }
          }
          if (!nextNodes.some((n) => n.selected)) {
            nextSelectedNode = null;
            nextShowConfigPanel = false;
          }
        }

        const hasNodeRemoval = batched.some((c) => c.type === 'remove');
        const partial: Partial<FlowState> = { nodes: nextNodes };
        if (hasNodeRemoval) {
          const nextNodeIds = new Set(nextNodes.map((n) => n.id));
          partial.edges = state.edges.filter(
            (e) => nextNodeIds.has(e.source) && nextNodeIds.has(e.target)
          );
        }
        if (hasSelectChange) {
          partial.selectedNode = nextSelectedNode;
          partial.showConfigPanel = nextShowConfigPanel;
        }

        return partial;
      });
    });
  },

  onEdgesChange: (changes) => {
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }));
  },

  onConnect: (connection) => {
    if (!connection.source || !connection.target) return;
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          data: { sourceHandle: connection.sourceHandle },
        },
        state.edges
      ),
    }));
  }
}));

export const generateNodeId = () => `node-${++nodeIdCounter}`;