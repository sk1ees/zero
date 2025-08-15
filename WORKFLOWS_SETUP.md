# Workflows Backend Setup

This document explains how to set up the backend CRUD operations for workflows in your application.

## Database Setup

### 1. Create the Workflows Table

Run the SQL migration in your Supabase database:

```sql
-- Copy and paste the contents of migrations/create_workflows_table.sql
-- into your Supabase SQL editor and execute it
```

### 2. Verify the Table Structure

The workflows table should have the following structure:

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Required)
- `description` (TEXT)
- `status` (VARCHAR, Default: 'draft')
- `type` (VARCHAR, Required)
- `tags` (TEXT array)
- `config` (JSONB)
- `last_run` (TIMESTAMP)
- `next_run` (TIMESTAMP)
- `runs_count` (INTEGER, Default: 0)
- `success_rate` (DECIMAL, Default: 0.00)
- `workspace_id` (UUID, Foreign Key to workspaces)
- `created_by` (UUID)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

The following API endpoints are now available:

### GET /api/workspaces/[workspace_id]/workflows
- Fetches all workflows for a workspace
- Supports query parameters: `status`, `type`, `search`
- Example: `/api/workspaces/123/workflows?status=active&type=sync&search=email`

### POST /api/workspaces/[workspace_id]/workflows
- Creates a new workflow
- Required fields: `name`, `type`, `created_by`
- Optional fields: `description`, `tags`, `config`

### GET /api/workspaces/[workspace_id]/workflows/[workflow_id]
- Fetches a specific workflow

### PUT /api/workspaces/[workspace_id]/workflows/[workflow_id]
- Updates a workflow
- Required fields: `name`, `type`
- Optional fields: `description`, `tags`, `config`, `status`

### DELETE /api/workspaces/[workspace_id]/workflows/[workflow_id]
- Deletes a workflow

## Frontend Integration

### 1. Custom Hook

Use the `useWorkflows` hook in your components:

```typescript
import { useWorkflows } from '../hooks/useWorkflows';

const { workflows, loading, createWorkflow, updateWorkflow, deleteWorkflow } = useWorkflows(workspaceId);
```

### 2. Available Methods

- `workflows`: Array of workflow objects
- `loading`: Boolean indicating loading state
- `error`: Error message if any
- `fetchWorkflows(filters?)`: Fetch workflows with optional filters
- `createWorkflow(data)`: Create a new workflow
- `updateWorkflow(id, data)`: Update an existing workflow
- `deleteWorkflow(id)`: Delete a workflow
- `getWorkflow(id)`: Get a single workflow

### 3. Workflow Data Structure

```typescript
interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  type: 'sync' | 'automation' | 'pipeline';
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
```

## Security

The workflows table includes Row Level Security (RLS) policies that ensure:

1. Users can only view workflows in workspaces they have access to
2. Only workspace owners can create, update, and delete workflows
3. All operations are properly authenticated

## Usage Examples

### Creating a Workflow

```typescript
const newWorkflow = await createWorkflow({
  name: 'Email Automation',
  description: 'Send automated emails based on triggers',
  type: 'automation',
  tags: ['Email', 'Marketing'],
  config: { /* workflow configuration */ }
});
```

### Filtering Workflows

```typescript
await fetchWorkflows({
  status: 'active',
  type: 'sync',
  search: 'email'
});
```

### Updating a Workflow

```typescript
await updateWorkflow(workflowId, {
  name: 'Updated Workflow Name',
  status: 'active',
  tags: ['Updated', 'Tags']
});
```

### Deleting a Workflow

```typescript
await deleteWorkflow(workflowId);
```

## Error Handling

The API endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message explaining what went wrong.

## Testing

To test the endpoints, you can use tools like Postman or curl:

```bash
# Get all workflows
curl -X GET "http://localhost:3000/api/workspaces/YOUR_WORKSPACE_ID/workflows"

# Create a workflow
curl -X POST "http://localhost:3000/api/workspaces/YOUR_WORKSPACE_ID/workflows" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Workflow",
    "type": "automation",
    "created_by": "USER_ID"
  }'
```

## Next Steps

1. Run the database migration
2. Test the API endpoints
3. Integrate the frontend components
4. Add any additional features like workflow execution, scheduling, etc.
