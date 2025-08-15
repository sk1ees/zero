'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';
import { useToast } from './use-toast';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  type: 'sync' | 'automation' | 'pipeline' | 'custom';
  tags: string[];
  config: any;
  last_run: string | null;
  next_run: string | null;
  runs_count: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
  workspace_id: string;
  created_by: string;
}

export interface CreateWorkflowData {
  name: string;
  description?: string;
  type: 'sync' | 'automation' | 'pipeline' | 'custom';
  tags?: string[];
  config?: any;
}

export interface UpdateWorkflowData {
  name?: string;
  description?: string;
  type?: 'sync' | 'automation' | 'pipeline' | 'custom';
  tags?: string[];
  config?: any;
  status?: 'active' | 'draft' | 'paused';
}

export interface WorkflowFilters {
  status?: string;
  type?: string;
  search?: string;
}

export function useWorkflows() {
  const params = useParams();
  const workspaceId = params?.workspace_id as string;
  
  console.log('🎯 useWorkflows hook initialized:', { workspaceId, timestamp: new Date().toISOString() });
  
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);

  // Fetch workflows
  const fetchWorkflows = useCallback(async (filters?: WorkflowFilters) => {
    console.log('📞 fetchWorkflows called:', { 
      workspaceId, 
      filters,
      isFetching: isFetchingRef.current,
      timestamp: new Date().toISOString()
    });
    
    if (!workspaceId) {
      console.log('❌ No workspaceId, returning early');
      return;
    }

    // Prevent concurrent fetches
    if (isFetchingRef.current && !filters) {
      console.log('⏭️ Already fetching, skipping');
      return;
    }

    try {
      console.log('🔄 Setting loading to true');
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.search) params.append('search', filters.search);

      const url = `/api/workspaces/${workspaceId}/workflows?${params}`;
      console.log('🌐 Making API call to:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch workflows');
      }

      const data = await response.json();
      console.log('✅ API response received:', data);
      setWorkflows(data.workflows || []);
    } catch (err: any) {
      console.error('❌ API call failed:', err);
      setError(err.message);
      // Only show toast for manual fetches, not initial load
      if (filters) {
        toast({
          title: 'Error',
          description: 'Failed to fetch workflows',
          variant: 'destructive'
        });
      }
    } finally {
      console.log('🏁 Setting loading to false');
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [workspaceId]); // Remove toast dependency

  // Create workflow
  const createWorkflow = useCallback(async (workflowData: CreateWorkflowData) => {
    if (!workspaceId) return null;

    try {
      // Get current user
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`/api/workspaces/${workspaceId}/workflows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workflowData,
          created_by: user.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create workflow');
      }

      const data = await response.json();
      
      // Add to local state
      setWorkflows(prev => [data.workflow, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Workflow created successfully',
      });

      return data.workflow;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to create workflow',
        variant: 'destructive'
      });
      throw err;
    }
  }, [workspaceId, toast]);

  // Update workflow
  const updateWorkflow = useCallback(async (workflowId: string, updateData: UpdateWorkflowData) => {
    if (!workspaceId) return null;

    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/workflows/${workflowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update workflow');
      }

      const data = await response.json();
      
      // Update in local state
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId ? data.workflow : w
      ));
      
      toast({
        title: 'Success',
        description: 'Workflow updated successfully',
      });

      return data.workflow;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update workflow',
        variant: 'destructive'
      });
      throw err;
    }
  }, [workspaceId, toast]);

  // Delete workflow
  const deleteWorkflow = useCallback(async (workflowId: string) => {
    if (!workspaceId) return;

    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/workflows/${workflowId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete workflow');
      }

      // Remove from local state
      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
      
      toast({
        title: 'Success',
        description: 'Workflow deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete workflow',
        variant: 'destructive'
      });
      throw err;
    }
  }, [workspaceId, toast]);

  // Get single workflow
  const getWorkflow = useCallback(async (workflowId: string) => {
    if (!workspaceId) return null;

    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/workflows/${workflowId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch workflow');
      }

      const data = await response.json();
      return data.workflow;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch workflow',
        variant: 'destructive'
      });
      throw err;
    }
  }, [workspaceId, toast]);

  // Initial fetch - only once when component mounts
  useEffect(() => {
    console.log('🔍 useWorkflows useEffect called:', { 
      workspaceId, 
      hasFetched: hasFetchedRef.current,
      timestamp: new Date().toISOString(),
      stack: new Error().stack?.split('\n').slice(1, 4).join('\n')
    });
    
    if (workspaceId && !hasFetchedRef.current) {
      console.log('🚀 Fetching workflows for workspace:', workspaceId);
      hasFetchedRef.current = true;
      fetchWorkflows();
    } else {
      console.log('⏭️ Skipping fetch - already fetched or no workspaceId');
    }
  }, [workspaceId]); // Only depend on workspaceId

  return {
    workflows,
    loading,
    error,
    fetchWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    getWorkflow,
  };
}
