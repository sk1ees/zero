-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'paused')),
  type VARCHAR(50) NOT NULL CHECK (type IN ('sync', 'automation', 'pipeline', 'custom')),
  tags TEXT[] DEFAULT '{}',
  config JSONB DEFAULT '{}',
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE,
  runs_count INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workflows_workspace_id ON workflows(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflows_type ON workflows(type);
CREATE INDEX IF NOT EXISTS idx_workflows_created_by ON workflows(created_by);
CREATE INDEX IF NOT EXISTS idx_workflows_created_at ON workflows(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_workflows_updated_at 
    BEFORE UPDATE ON workflows 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to see workflows in workspaces they own
CREATE POLICY "Users can view workflows in their workspaces" ON workflows
  FOR SELECT USING (
    workspace_id IN (
      SELECT id FROM workspaces 
      WHERE owner_user_id = auth.uid()
    )
  );

-- Policy to allow workspace owners to insert workflows
CREATE POLICY "Workspace owners can create workflows" ON workflows
  FOR INSERT WITH CHECK (
    workspace_id IN (
      SELECT id FROM workspaces 
      WHERE owner_user_id = auth.uid()
    )
  );

-- Policy to allow workspace owners to update workflows
CREATE POLICY "Workspace owners can update workflows" ON workflows
  FOR UPDATE USING (
    workspace_id IN (
      SELECT id FROM workspaces 
      WHERE owner_user_id = auth.uid()
    )
  );

-- Policy to allow workspace owners to delete workflows
CREATE POLICY "Workspace owners can delete workflows" ON workflows
  FOR DELETE USING (
    workspace_id IN (
      SELECT id FROM workspaces 
      WHERE owner_user_id = auth.uid()
    )
  );
