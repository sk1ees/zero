import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch all workflows for a workspace
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspace_id: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const { workspace_id: workspaceId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let query = supabaseAdmin
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
      .eq('workspace_id', workspaceId);

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    if (type && type !== 'all') {
      query = query.eq('type', type);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ workflows: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}

// POST - Create a new workflow
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workspace_id: string }> }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 });
    }

    const { workspace_id: workspaceId } = await params;
    const body = await request.json();
    const { name, description, type, tags, config, created_by } = body;

    if (!name || !type || !created_by) {
      return NextResponse.json({ 
        error: 'name, type, and created_by are required' 
      }, { status: 400 });
    }

    const workflowData = {
      name,
      description: description || '',
      type,
      tags: tags || [],
      config: config || {},
      status: 'draft',
      workspace_id: workspaceId,
      created_by,
      runs_count: 0,
      success_rate: 0,
      last_run: null,
      next_run: null
    };

    const { data, error } = await supabaseAdmin
      .from('workflows')
      .insert(workflowData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ workflow: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
