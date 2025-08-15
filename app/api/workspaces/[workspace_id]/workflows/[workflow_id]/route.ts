import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch a specific workflow
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspace_id: string; workflow_id: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const { workspace_id, workflow_id } = await params;

    const { data, error } = await supabaseAdmin
      .from('workflows')
      .select(`
        id,
        name,
        description,
        status,
        type,
        tags,
        config,
        last_run,
        next_run,
        runs_count,
        success_rate,
        created_at,
        updated_at,
        workspace_id,
        created_by
      `)
      .eq('id', workflow_id)
      .eq('workspace_id', workspace_id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ workflow: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}

// PUT - Update a workflow
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ workspace_id: string; workflow_id: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const { workspace_id, workflow_id } = await params;
    const body = await request.json();
    const { name, description, type, tags, config, status } = body;

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json({ 
        error: 'name and type are required' 
      }, { status: 400 });
    }

    const updateData = {
      name,
      description: description || '',
      type,
      tags: tags || [],
      config: config || {},
      status: status || 'draft',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from('workflows')
      .update(updateData)
      .eq('id', workflow_id)
      .eq('workspace_id', workspace_id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ workflow: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}

// DELETE - Delete a workflow
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ workspace_id: string; workflow_id: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const { workspace_id, workflow_id } = await params;

    const { error } = await supabaseAdmin
      .from('workflows')
      .delete()
      .eq('id', workflow_id)
      .eq('workspace_id', workspace_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Workflow deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
