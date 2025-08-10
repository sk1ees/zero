'use client';

import React, { useState } from 'react';
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
  PanelLeftOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ThemeToggle } from '../components/theme-toggle';

const Dashboard = () => {
  const [appsExpanded, setAppsExpanded] = useState(true);
  const [syncHistoryExpanded, setSyncHistoryExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('most-popular');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-14' : 'w-56'} bg-card border-r border-border p-3 flex flex-col transition-all duration-300`}>
        {/* App Branding and Collapse Button */}
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <Gauge className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Automake</div>
                <div className="text-xs text-muted-foreground">Professional Plan</div>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
              <Gauge className="w-4 h-4 text-muted-foreground" />
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

        {/* Create Button */}
        <Button className={`${sidebarCollapsed ? 'w-6 h-6 p-0' : 'w-full h-8'} bg-primary hover:bg-primary/90 text-primary-foreground mb-4 shadow-sm flex items-center justify-center text-xs`}>
          <Plus className="w-3 h-3" />
          {!sidebarCollapsed && <span className="ml-1">Create</span>}
        </Button>

        {/* Navigation */}
        <div className="space-y-1 mb-4">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 bg-accent text-foreground rounded-lg`}>
            <Gauge className="w-3 h-3" />
            {!sidebarCollapsed && <span className="font-medium text-xs">Dashboard</span>}
          </div>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} p-2 text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors`}>
            <Zap className="w-3 h-3" />
            {!sidebarCollapsed && <span className="text-xs">Sync</span>}
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

        {/* Plan Info */}
        <div className="mt-auto">
          {!sidebarCollapsed && (
            <Card className="bg-muted border-border shadow-sm">
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

          {/* User Profile */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'} mt-3 p-2 bg-card rounded-lg border border-border shadow-sm`}>
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
                  <Gauge className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">Automake</span>
                  <span className="text-xs text-muted-foreground ml-1">Professional Plan</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <Input 
                  placeholder="Search something" 
                  className="pl-7 w-48 bg-muted border-border h-7 text-xs"
                />
              </div>
              
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

        {/* Main Content Area */}
        <div className="flex-1 p-4 bg-background">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="space-y-4">
              {/* What would you like to automate? */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">What would you like to automate?</CardTitle>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400 text-xs">
                      <Check className="w-3 h-3" />
                      <span>Last updated now</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Button variant="outline" className="text-muted-foreground border-border h-7 text-xs">
                      Show Automation Ideas
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Zap className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input 
                      placeholder="Example: When I add a reaction to a Slack message, create a card in Trello."
                      className="pl-8 pr-10 bg-muted border-border h-9 text-xs"
                    />
                    <Send className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { icon: Zap, title: 'Sync', desc: 'Automated workflows', color: 'text-primary' },
                      { icon: Grid3X3, title: 'Table', desc: 'Automated data', color: 'text-cyan-500' },
                      { icon: Square, title: 'Interface', desc: 'Apps, forms, and pages', color: 'text-primary' },
                      { icon: MessageSquare, title: 'Chatbot', desc: 'AI-powered chatbot', color: 'text-cyan-500' },
                      { icon: Hexagon, title: 'Canvas', desc: 'Process visualization', color: 'text-primary' }
                    ].map((item, index) => (
                      <div key={index} className="text-center p-2 border border-border rounded-lg hover:bg-accent cursor-pointer transition-all duration-200 hover:shadow-sm">
                        <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                        <div className="text-xs font-medium text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                        <ChevronRight className="w-3 h-3 text-muted-foreground mx-auto mt-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recently updated */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">Recently updated</CardTitle>
                    <Button variant="outline" className="text-muted-foreground border-border h-7 text-xs">
                      All recently updated
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {[
                      { icon: Zap, title: 'Notify on Form Submission', time: 'Published 13 minutes ago' },
                      { icon: Grid3X3, title: 'LeadGen CRM Interface', time: 'Updated 39 minutes ago' },
                      { icon: 'circle', title: 'Leads', time: 'Updated 39 minutes ago' },
                      { icon: Grid3X3, title: 'SLMobbin', time: 'Updated 58 minutes ago' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 p-1.5 hover:bg-accent rounded cursor-pointer transition-colors">
                        {item.icon === 'circle' ? (
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        ) : (
                          <item.icon className="w-4 h-4 text-primary" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-foreground truncate">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Popular Templates */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">Popular Templates</CardTitle>
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent">
                      <MoreVertical className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex space-x-1">
                    {['most-popular', 'trending', 'top-role'].map((tab) => (
                      <Button 
                        key={tab}
                        variant={activeTab === tab ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs h-6 ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
                      >
                        {tab === 'most-popular' ? 'Most popular' : 
                         tab === 'trending' ? 'Trending this week' : 'Top by role'}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="border border-border rounded-lg p-3 bg-muted">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">M</div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white">
                        <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-4 border-b-white"></div>
                      </div>
                    </div>
                    <div className="text-xs text-foreground mb-1">
                      Save new Gmail emails matching certain traits to a Google Drive
                    </div>
                    <div className="text-xs text-muted-foreground">Used by 8k</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="text-muted-foreground border-border h-6 text-xs">
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground border-border h-6 text-xs">
                      Next
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Unfinished Sync */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">Unfinished Sync</CardTitle>
                    <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent">
                      <MoreVertical className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { icon: FileText, title: 'Missing authorization', desc: 'Create an entry button is clicked', time: 'Edited 22 minutes ago' },
                      { icon: Grid3X3, title: 'Missing authorization', desc: 'When new idea added in Table, create AI-generated ideas', time: 'Edited 3 days ago' },
                      { icon: Hexagon, title: 'Incomplete action', desc: '', time: '' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border border-border rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center space-x-2">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs font-medium text-foreground">{item.title}</div>
                            {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
                            {item.time && <div className="text-xs text-muted-foreground">{item.time}</div>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
