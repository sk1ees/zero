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
  PanelLeftOpen,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ThemeToggle } from '../components/theme-toggle';
import SearchDialog from '../components/SearchDialog';

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

                {/* Analytics Charts */}
        <div className="px-4 py-3 bg-card border-b border-border">
          <div className="grid grid-cols-4 gap-4">
            {/* Execution Trends Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Execution Trends</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Last 7 days</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-20 flex items-end justify-between space-x-1">
                  {[12, 28, 35, 42, 38, 51, 47].map((value, index) => {
                    const maxValue = 51;
                    const maxHeight = 60; // 60px max height
                    const barHeight = Math.max((value / maxValue) * maxHeight, 4);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-500/80 cursor-pointer"
                          style={{ height: `${barHeight}px` }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">Total: 253</span>
                  <span className="text-green-600 dark:text-green-400">+42%</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Success Rate</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>This month</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-20">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-4 border-green-500 border-r-transparent transform -rotate-90 flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">1,856 total</span>
                  <span className="text-green-600 dark:text-green-400">+7.8%</span>
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Error Rate</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>This month</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-20">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-4 border-red-500 border-r-transparent transform -rotate-90 flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground">6%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">186 errors</span>
                  <span className="text-red-600 dark:text-red-400">-2.1%</span>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Avg Response</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>This week</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-20 flex items-end justify-between space-x-1">
                  {[2.1, 1.8, 2.3, 1.9, 2.0, 1.7, 1.6].map((value, index) => {
                    const maxValue = 2.5;
                    const maxHeight = 60; // 60px max height
                    const barHeight = Math.max((value / maxValue) * maxHeight, 4);
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-purple-500 rounded-t-sm transition-all duration-300 hover:bg-purple-500/80 cursor-pointer"
                          style={{ height: `${barHeight}px` }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">1.9s avg</span>
                  <span className="text-green-600 dark:text-green-400">-12%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="px-4 py-3 bg-card border-b border-border">
          <div className="grid grid-cols-3 gap-4">
            {/* Flow Distribution Pie Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Flow Distribution</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>By type</span>
                  </div>
              </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-24">
                  <div className="relative w-20 h-20">
                    {/* Donut chart using SVG for better compatibility */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Sync - 52% */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="15" 
                        strokeDasharray={`${2 * Math.PI * 35 * 0.52} ${2 * Math.PI * 35}`} 
                        strokeDashoffset={0} transform="rotate(-90 50 50)" />
                      {/* Table - 28% */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="15" 
                        strokeDasharray={`${2 * Math.PI * 35 * 0.28} ${2 * Math.PI * 35}`} 
                        strokeDashoffset={`-${2 * Math.PI * 35 * 0.52}`} transform="rotate(-90 50 50)" />
                      {/* Interface - 12% */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f97316" strokeWidth="15" 
                        strokeDasharray={`${2 * Math.PI * 35 * 0.12} ${2 * Math.PI * 35}`} 
                        strokeDashoffset={`-${2 * Math.PI * 35 * 0.8}`} transform="rotate(-90 50 50)" />
                      {/* Other - 8% */}
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="15" 
                        strokeDasharray={`${2 * Math.PI * 35 * 0.08} ${2 * Math.PI * 35}`} 
                        strokeDashoffset={`-${2 * Math.PI * 35 * 0.92}`} transform="rotate(-90 50 50)" />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-muted-foreground">Sync (52%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Table (28%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-muted-foreground">Interface (12%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-muted-foreground">Other (8%)</span>
                  </div>
              </div>
              </CardContent>
            </Card>

            {/* Performance Line Chart */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Performance Trend</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>Last 30 days</span>
              </div>
            </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-24 relative">
                  {/* Line chart */}
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <path
                      d="M0,35 L10,30 L20,25 L30,20 L40,15 L50,10 L60,12 L70,8 L80,5 L90,3 L100,0"
                      stroke="rgb(6 182 212)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,35 L10,30 L20,25 L30,20 L40,15 L50,10 L60,12 L70,8 L80,5 L90,3 L100,0 L100,40 L0,40 Z"
                      fill="url(#gradient)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(6 182 212)" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="rgb(6 182 212)" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">Peak: 98%</span>
                  <span className="text-cyan-600 dark:text-cyan-400">+24% trend</span>
              </div>
              </CardContent>
            </Card>

            {/* Top Apps Usage */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground">Top Apps</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>By usage</span>
              </div>
            </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { name: 'Slack', usage: 92, color: 'bg-blue-500' },
                    { name: 'Gmail', usage: 78, color: 'bg-red-500' },
                    { name: 'Trello', usage: 65, color: 'bg-blue-600' },
                    { name: 'Notion', usage: 53, color: 'bg-gray-500' }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-foreground">{app.name}</span>
                          <span className="text-muted-foreground">{app.usage}%</span>
              </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className={`${app.color} h-1.5 rounded-full transition-all duration-300`}
                            style={{ width: `${app.usage}%` }}
                          ></div>
              </div>
            </div>
          </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Automation Hub */}
              <div className="lg:col-span-2 space-y-6">
                {/* AI Automation Section */}
                <Card className="bg-gradient-to-br from-card to-card/80 border-border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                          <Zap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-foreground">AI Automation Hub</CardTitle>
                          <p className="text-sm text-muted-foreground">Create intelligent workflows with natural language</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">AI Ready</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Enhanced Input Section */}
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-muted/30 to-muted/50 border border-border rounded-xl hover:border-primary/50 transition-all duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
                            <Zap className="w-3 h-3 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <Input 
                              placeholder="Describe your automation: 'When I receive an email, create a task in Notion'"
                              className="border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                          <Button size="sm" className="h-8 px-4 bg-primary hover:bg-primary/90 shadow-sm">
                            <Send className="w-4 h-4 mr-2" />
                            Create
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2 px-1">
                          <span className="text-sm text-muted-foreground">Powered by advanced AI • Natural language processing</span>
                          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
                            Show Examples
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Redesigned Automation Types */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold text-foreground">Choose automation type</h4>
                        <Button variant="ghost" size="sm" className="text-sm text-primary hover:text-primary/80">
                          View All Types
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                        {[
                          { 
                            icon: Zap, 
                            title: 'Sync', 
                            desc: 'Workflows'
                          },
                          { 
                            icon: Grid3X3, 
                            title: 'Table', 
                            desc: 'Data'
                          },
                          { 
                            icon: Square, 
                            title: 'Interface', 
                            desc: 'Apps & Forms'
                          },
                          { 
                            icon: MessageSquare, 
                            title: 'Chatbot', 
                            desc: 'AI Assistant'
                          },
                          { 
                            icon: Hexagon, 
                            title: 'Canvas', 
                            desc: 'Process Flow'
                          }
                        ].map((item, index) => (
                          <div key={index} className="group p-4 bg-card border border-border rounded-xl hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/50">
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-shadow group-hover:bg-primary/10">
                                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                                <div className="text-xs text-muted-foreground">{item.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center pt-2">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>24 templates available</span>
                          <span>•</span>
                          <span>AI suggestions</span>
                          <span>•</span>
                          <span>Custom workflows</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recently Updated Section */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                          <Activity className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground">Recent Activity</CardTitle>
                      </div>
                      <Button variant="outline" className="text-muted-foreground border-border">
                        View All
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { icon: Zap, title: 'Notify on Form Submission', time: 'Published 8 minutes ago', status: 'published' },
                        { icon: Grid3X3, title: 'LeadGen CRM Interface', time: 'Updated 25 minutes ago', status: 'updated' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 hover:bg-accent/50 rounded-lg cursor-pointer transition-all duration-200 group">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <item.icon className="w-4 h-4 text-primary" />
                            </div>
                            {item.status === 'published' && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.time}</div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Templates & Issues */}
              <div className="space-y-6">
                {/* Popular Templates */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground">Popular Templates</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-accent">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
                      {['most-popular', 'trending', 'top-role'].map((tab) => (
                        <Button 
                          key={tab}
                          variant={activeTab === tab ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 text-xs h-8 ${activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {tab === 'most-popular' ? 'Most popular' : 
                           tab === 'trending' ? 'Trending' : 'Top by role'}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="border border-border rounded-xl p-4 bg-gradient-to-br from-muted/20 to-muted/40 hover:from-muted/30 hover:to-muted/50 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm text-foreground mb-2 font-medium">
                        Save new Gmail emails matching certain traits to Google Drive
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">Used by 12.5k users</div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">Popular</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Button variant="outline" size="sm" className="text-muted-foreground border-border">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="text-muted-foreground border-border">
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Unfinished Sync */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground">Issues & Warnings</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-accent">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { icon: FileText, title: 'Missing authorization', desc: 'Create an entry button is clicked', time: '22 min ago', severity: 'warning' },
                        { icon: Grid3X3, title: 'Incomplete workflow', desc: 'When new idea added in Table, create AI-generated ideas', time: '3 days ago', severity: 'warning' },
                        { icon: Hexagon, title: 'Configuration error', desc: 'Canvas setup incomplete', time: '1 week ago', severity: 'error' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-all duration-200 group">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.severity === 'error' ? 'bg-red-500/10' : 'bg-orange-500/10'
                            }`}>
                              <item.icon className={`w-4 h-4 ${
                                item.severity === 'error' ? 'text-red-500' : 'text-orange-500'
                              }`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{item.title}</div>
                              {item.desc && <div className="text-xs text-muted-foreground">{item.desc}</div>}
                              <div className="text-xs text-muted-foreground">{item.time}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
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
    </div>
  );
};

export default Dashboard;
