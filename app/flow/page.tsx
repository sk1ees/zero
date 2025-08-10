'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Filter,
  Calendar,
  FolderOpen,
  Copy,
  Edit3,
  Archive,
  Tag,
  Users,
  BarChart,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ThemeToggle } from '../components/theme-toggle';
import SearchDialog from '../components/SearchDialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { CreateWorkflowDialog } from '../components/CreateWorkflowDialog';

// Mock data for workflows
const mockWorkflows = [
  {
    id: '4875983',
    name: 'Customer Data Sync',
    description: 'Automatically sync customer data from CRM to database',
    status: 'active',
    lastRun: '2 hours ago',
    nextRun: 'In 4 hours',
    runs: 1247,
    successRate: 98.5,
    tags: ['CRM', 'Database', 'Automation'],
    type: 'sync',
    created: '2024-01-15',
    updated: '2024-01-20'
  },
  {
    id: '4875984',
    name: 'Email Marketing Campaign',
    description: 'Send personalized emails based on user behavior',
    status: 'draft',
    lastRun: 'Never',
    nextRun: 'Not scheduled',
    runs: 0,
    successRate: 0,
    tags: ['Email', 'Marketing', 'Personalization'],
    type: 'automation',
    created: '2024-01-18',
    updated: '2024-01-19'
  },
  {
    id: '4875985',
    name: 'Order Processing Pipeline',
    description: 'Process orders and update inventory automatically',
    status: 'active',
    lastRun: '5 minutes ago',
    nextRun: 'In 15 minutes',
    runs: 8923,
    successRate: 99.2,
    tags: ['Orders', 'Inventory', 'E-commerce'],
    type: 'pipeline',
    created: '2024-01-10',
    updated: '2024-01-20'
  },
  {
    id: '4875986',
    name: 'Social Media Integration',
    description: 'Sync social media posts across platforms',
    status: 'paused',
    lastRun: '1 day ago',
    nextRun: 'Paused',
    runs: 456,
    successRate: 95.8,
    tags: ['Social Media', 'Integration', 'Content'],
    type: 'sync',
    created: '2024-01-12',
    updated: '2024-01-18'
  },
  {
    id: '4875987',
    name: 'Data Backup System',
    description: 'Automated daily backup of critical data',
    status: 'active',
    lastRun: '1 hour ago',
    nextRun: 'In 23 hours',
    runs: 365,
    successRate: 100,
    tags: ['Backup', 'Security', 'Data'],
    type: 'automation',
    created: '2024-01-01',
    updated: '2024-01-20'
  },
  {
    id: '4875988',
    name: 'Lead Qualification Bot',
    description: 'Automatically qualify leads based on criteria',
    status: 'draft',
    lastRun: 'Never',
    nextRun: 'Not scheduled',
    runs: 0,
    successRate: 0,
    tags: ['Leads', 'AI', 'Qualification'],
    type: 'automation',
    created: '2024-01-19',
    updated: '2024-01-19'
  }
];

const WorkflowListPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [appsExpanded, setAppsExpanded] = useState(true);
  const [syncHistoryExpanded, setSyncHistoryExpanded] = useState(false);

  const filteredWorkflows = mockWorkflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    const matchesType = typeFilter === 'all' || workflow.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'paused': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Draft';
      case 'paused': return 'Paused';
      default: return 'Unknown';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sync': return <Zap className="w-4 h-4" />;
      case 'automation': return <Sparkles className="w-4 h-4" />;
      case 'pipeline': return <Workflow className="w-4 h-4" />;
      default: return <Workflow className="w-4 h-4" />;
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
                <div className="text-sm font-semibold text-foreground">zamuri.ai</div>
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
                <div className="text-xs font-medium text-foreground truncate">Kristin Watson</div>
                <div className="text-xs text-muted-foreground truncate">watsonkristin@mail.com</div>
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
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="w-3 h-3" />
          {!sidebarCollapsed && <span className="ml-1">Create</span>}
        </Button>

        {/* Navigation */}
        <div className="space-y-1 mb-4">
          <div 
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}
            onClick={() => router.push('/dashboard')}
          >
            <Gauge className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Dashboard</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Zap className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Sync</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 bg-accent text-foreground rounded-lg`}>
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

        {/* Apps Section */}
        <div className="mb-4">
          <div 
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}
            onClick={() => setAppsExpanded(!appsExpanded)}
          >
            {!sidebarCollapsed && <span className="font-medium text-xs">Apps</span>}
            <div className="flex items-center space-x-1">
              <Plus className="w-2 h-2" />
              {!sidebarCollapsed && (
                appsExpanded ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />
              )}
            </div>
          </div>
          {appsExpanded && !sidebarCollapsed && (
            <div className="ml-3 space-y-0.5 mt-1">
              <div className="p-1.5 text-muted-foreground hover:bg-accent rounded cursor-pointer text-xs">All Apps</div>
              <div className="p-1.5 text-muted-foreground hover:bg-accent rounded cursor-pointer text-xs">Other Apps</div>
            </div>
          )}
        </div>

        {/* Sync History Section */}
        <div className="mb-4">
          <div 
            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}
            onClick={() => setSyncHistoryExpanded(!syncHistoryExpanded)}
          >
            {!sidebarCollapsed && <span className="font-medium text-xs">Sync History</span>}
            <div className="flex items-center space-x-1">
              <Plus className="w-2 h-2" />
              {!sidebarCollapsed && (
                syncHistoryExpanded ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />
              )}
            </div>
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
              <div>
                <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your automation workflows and sync processes
                </p>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sync">Sync</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="pipeline">Pipeline</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 border border-border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('list')}
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Workflows Content */}
        <div className="flex-1 p-6">
          {filteredWorkflows.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Workflow className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No workflows found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search or filters.' : 'Get started by creating your first workflow.'}
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkflows.map((workflow) => (
                    <Card 
                      key={workflow.id} 
                      className="hover:shadow-md transition-all duration-200 cursor-pointer border-border hover:border-primary/20"
                      onClick={() => router.push(`/flow/${workflow.id}`)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              {getTypeIcon(workflow.type)}
                            </div>
                            <div>
                              <CardTitle className="text-sm font-semibold text-foreground">
                                {workflow.name}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(workflow.status)}`}></div>
                                <span className="text-xs text-muted-foreground">
                                  {getStatusText(workflow.status)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {workflow.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {workflow.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {workflow.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{workflow.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <BarChart className="w-3 h-3" />
                              <span>{workflow.runs}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>{workflow.successRate}%</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{workflow.lastRun}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredWorkflows.map((workflow) => (
                    <Card 
                      key={workflow.id} 
                      className="hover:shadow-md transition-all duration-200 cursor-pointer border-border hover:border-primary/20"
                      onClick={() => router.push(`/flow/${workflow.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              {getTypeIcon(workflow.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{workflow.name}</h3>
                              <p className="text-sm text-muted-foreground">{workflow.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(workflow.status)}`}></div>
                              <span className="text-sm text-muted-foreground">
                                {getStatusText(workflow.status)}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <BarChart className="w-4 h-4" />
                                <span>{workflow.runs}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="w-4 h-4" />
                                <span>{workflow.successRate}%</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{workflow.lastRun}</span>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Create Workflow Dialog */}
      <CreateWorkflowDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
};

export default WorkflowListPage;
