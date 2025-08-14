'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Settings,
  Bell,
  Grid3X3,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Globe,
  Square,
  MessageSquare,
  Hexagon,
  Send,
  FileText,
  Trash2,
  MoreVertical,
  ChevronRight,
  Check,
  Clock,
  User,
  Gauge,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Activity,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  AlertTriangle,
  Workflow,
  Play,
  Save,
  Download,
  Upload,
  Share2,
  MoreHorizontal,
  Home,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  Database,
  Mail,
  ShoppingCart,
  Users,
  Calendar,
  BarChart,
  Target,
  FolderOpen,
  Copy,
  Edit3,
  Archive,
  Tag
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { useUserWorkspace } from '../../../../hooks/useUserWorkspace';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Separator } from '../../../../components/ui/separator';
import { ThemeToggle } from '../../../../components/theme-toggle';
import SearchDialog from '../../../../components/SearchDialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../../../components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { Textarea } from '../../../../components/ui/textarea';
import { supabaseClient } from '@/lib/supabaseClient';

// Mock templates
const workflowTemplates = [
  {
    id: 'sync-crm',
    name: 'CRM Data Sync',
    description: 'Sync customer data between CRM systems',
    icon: <Database className="w-6 h-6" />,
    category: 'sync',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    tags: ['CRM', 'Database', 'Sync']
  },
  {
    id: 'email-campaign',
    name: 'Email Marketing Campaign',
    description: 'Automated email campaigns based on user behavior',
    icon: <Mail className="w-6 h-6" />,
    category: 'automation',
    difficulty: 'Intermediate',
    estimatedTime: '30 min',
    tags: ['Email', 'Marketing', 'Automation']
  },
  {
    id: 'order-processing',
    name: 'Order Processing Pipeline',
    description: 'Process orders and update inventory automatically',
    icon: <ShoppingCart className="w-6 h-6" />,
    category: 'pipeline',
    difficulty: 'Advanced',
    estimatedTime: '45 min',
    tags: ['E-commerce', 'Orders', 'Inventory']
  },
  {
    id: 'lead-qualification',
    name: 'Lead Qualification Bot',
    description: 'Automatically qualify leads based on criteria',
    icon: <Users className="w-6 h-6" />,
    category: 'automation',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    tags: ['Leads', 'AI', 'Qualification']
  },
  {
    id: 'data-backup',
    name: 'Data Backup System',
    description: 'Automated daily backup of critical data',
    icon: <Database className="w-6 h-6" />,
    category: 'automation',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    tags: ['Backup', 'Security', 'Data']
  },
  {
    id: 'social-media',
    name: 'Social Media Integration',
    description: 'Sync social media posts across platforms',
    icon: <Globe className="w-6 h-6" />,
    category: 'sync',
    difficulty: 'Intermediate',
    estimatedTime: '35 min',
    tags: ['Social Media', 'Integration', 'Content']
  }
];

const CreateWorkflowPage = () => {
  const router = useRouter();
  const { workspace_id } = useParams();
  const workspaceId = (workspace_id as string) || '';
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, userDisplayName, userEmail, workspaceName, hasAccess } = useUserWorkspace(workspaceId);

  const filteredTemplates = workflowTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateWorkflow = () => {
    if (selectedTemplate && workflowName.trim()) {
      // Generate a random ID for the new workflow
      const newId = Math.floor(Math.random() * 1000000).toString();
      router.push(`/w/${workspaceId}/f/${newId}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-56'} bg-card border-r border-border p-3 flex flex-col transition-all duration-300`}>
        {/* App Branding and Collapse Button */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <Workflow className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{workspaceName || 'Workspace'}</div>
                <div className="text-xs text-muted-foreground">Professional Plan</div>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0 hover:bg-accent"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-3 h-3 text-muted-foreground" />
            ) : (
              <PanelLeftClose className="w-3 h-3 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* User Profile */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} mb-4 p-2 bg-card rounded-lg border border-border shadow-sm`}>
          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-muted-foreground" />
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{userDisplayName || 'User'}</div>
                  <div className="text-xs text-muted-foreground truncate">{userEmail || ''}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            </>
          )}
        </div>

        {/* Plan Info */}
        {!sidebarCollapsed && (
          <Card className="bg-muted border-border shadow-sm mb-4">
            <CardContent className="p-3">
              <div className="text-xs font-medium text-foreground mb-1">Professional plan (Trial)</div>
              <div className="text-xs text-muted-foreground mb-2">Task 324/1,000</div>
              <div className="w-full bg-muted-foreground/20 rounded-full h-1 mb-2">
                <div className="bg-primary h-1 rounded-full transition-all duration-300" style={{ width: '32.4%' }}></div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">Sync Unlimited</div>
              <Button variant="outline" className="w-full text-xs h-6">Manage Plan</Button>
            </CardContent>
          </Card>
        )}

        {/* Create Button */}
        <Button 
          className={`${sidebarCollapsed ? 'w-6 h-6 p-0' : 'w-full h-8'} bg-primary hover:bg-primary/90 text-primary-foreground mb-4 shadow-sm flex items-center justify-center text-xs`}
          onClick={() => router.push(`/w/${workspaceId}/f/new`)}
        >
          <Plus className="w-3 h-3" />
          {!sidebarCollapsed && <span className="ml-1">Create</span>}
        </Button>

        {/* Navigation */}
        <div className="space-y-1 mb-4">
          <div 
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}
            onClick={() => router.push(`/w/${workspaceId}`)}
          >
            <Gauge className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Dashboard</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Zap className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Sync</span>}
          </div>
          <div 
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 bg-accent text-foreground rounded-lg cursor-pointer`}
            onClick={() => router.push(`/w/${workspaceId}/f`)}
          >
            <Workflow className="w-3 h-3" />
            {!sidebarCollapsed && <span className="font-medium text-xs">Workflow</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Globe className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Discover</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Square className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Interfaces</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Grid3X3 className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Tables</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <MessageSquare className="w-3 h-3" />
            {!sidebarCollapsed && (
              <>
                <span className="text-xs">Chatbots</span>
                <Badge className="bg-orange-500 text-white text-xs px-1 py-0 ml-auto">BETA</Badge>
              </>
            )}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Hexagon className="w-3 h-3" />
            {!sidebarCollapsed && (
              <>
                <span className="text-xs">Canvas</span>
                <Badge className="bg-orange-500 text-white text-xs px-1 py-0 ml-auto">BETA</Badge>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-4 py-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <Workflow className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">zamuri.ai</span>
                  <span className="text-xs text-muted-foreground ml-1">Professional Plan</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SearchDialog>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <Input 
                    placeholder="Search something" 
                    className="pl-7 w-48 bg-muted border-border h-7 text-xs cursor-pointer"
                    readOnly
                  />
                </div>
              </SearchDialog>
              
              <Button variant="outline" className="text-muted-foreground border-border h-7 text-xs">
                Contact Sales
              </Button>
              
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent">
                  <Grid3X3 className="w-3 h-3 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent">
                  <Bell className="w-3 h-3 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent">
                  <Settings className="w-3 h-3 text-muted-foreground" />
                </Button>
                <ThemeToggle />
              </div>
              
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
              
              <Button variant="outline" className="text-muted-foreground border-border h-7 text-xs">
                Customize Widget
              </Button>
              
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-7 shadow-sm text-xs">
                <Star className="w-3 h-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => router.push(`/w/${workspaceId}/f`)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Create New Workflow</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose a template or start from scratch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hard block for restricted */}
        {!isLoading && !hasAccess ? (
          <div className="px-6 py-12">
            <div className="max-w-lg w-full mx-auto border border-border rounded-lg bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <div className="text-lg font-semibold text-foreground">Restricted access</div>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                You don’t have permission to view this workspace.
              </div>
              <div className="mb-4 text-xs text-muted-foreground">
                Workspace ID: <span className="font-mono text-foreground">{workspaceId}</span>
              </div>
              <div className="rounded-md border border-amber-200/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5" />
                  <div>
                    - Check you’re logged in with the right account<br />
                    - Ask the workspace owner to grant you access
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={async () => {
                  try {
                    const preferred = typeof window !== 'undefined' ? localStorage.getItem('zero_ws_preferred') : null;
                    if (preferred) { router.push(`/w/${preferred}`); return; }
                    if (workspaceId) { router.push(`/w/${workspaceId}`); return; }
                    router.push('/');
                  } catch { router.push('/'); }
                }}>Home</Button>
                <Button onClick={() => router.push('/login')}>Login</Button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Content */}
        {(hasAccess && !isLoading) && (
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Workflow Details Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Workflow Name
                    </label>
                    <Input
                      placeholder="Enter workflow name..."
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="sync">Sync</SelectItem>
                        <SelectItem value="automation">Automation</SelectItem>
                        <SelectItem value="pipeline">Pipeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your workflow..."
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Choose a Template</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>

              {filteredTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or category filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTemplate === template.id 
                          ? 'ring-2 ring-primary border-primary' 
                          : 'border-border hover:border-primary/20'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              {template.icon}
                            </div>
                            <div>
                              <CardTitle className="text-sm font-semibold text-foreground">
                                {template.name}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(template.difficulty)}`}></div>
                                <span className="text-xs text-muted-foreground">
                                  {template.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          {selectedTemplate === template.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{template.estimatedTime}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => router.push(`/w/${workspaceId}/f`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Workflows
              </Button>
              
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!selectedTemplate || !workflowName.trim()}
                onClick={handleCreateWorkflow}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CreateWorkflowPage;
