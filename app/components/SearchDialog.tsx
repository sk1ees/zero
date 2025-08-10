'use client';

import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ExternalLink,
  Mail,
  Calendar,
  Folder,
  Clock,
  MessageSquare,
  Grid3X3,
  Square,
  Zap
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SearchDialogProps {
  children: React.ReactNode;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'apps', label: 'Apps' },
    { id: 'synca', label: 'Synca products' },
    { id: 'builtin', label: 'Built-in tools' },
    { id: 'ai', label: 'AI' }
  ];

  const topApps = [
    { name: 'Gmail', icon: Mail, color: 'bg-red-500' },
    { name: 'Google Drive', icon: Folder, color: 'bg-blue-500' },
    { name: 'Google Calendar', icon: Calendar, color: 'bg-blue-600' }
  ];

  const builtinTools = [
    { name: 'Schedule', icon: Clock, color: 'bg-green-500' },
    { name: 'Email', icon: Mail, color: 'bg-blue-500' },
    { name: 'Sub-Sync', icon: Zap, color: 'bg-yellow-500' }
  ];

  const syncaProducts = [
    { name: 'Chatbots', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Tables', icon: Grid3X3, color: 'bg-indigo-500' },
    { name: 'Interfaces', icon: Square, color: 'bg-pink-500' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[70vh] overflow-hidden flex flex-col p-4">
        <DialogTitle className="text-base font-medium mb-3">Search</DialogTitle>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
            autoFocus
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-0.5 mb-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs px-2 py-1 h-7 ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Your top apps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-muted-foreground">Your top apps</h3>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {topApps.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className={`w-6 h-6 ${app.color} rounded-md flex items-center justify-center text-white`}>
                    <app.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular built-in tools */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-muted-foreground">Popular built-in tools</h3>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {builtinTools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className={`w-6 h-6 ${tool.color} rounded-md flex items-center justify-center text-white`}>
                    <tool.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New Synca products */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-muted-foreground">New Synca products</h3>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {syncaProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className={`w-6 h-6 ${product.color} rounded-md flex items-center justify-center text-white`}>
                    <product.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{product.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
          <span>↑ ↓ to navigate</span>
          <span>⌘ to toggle</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
