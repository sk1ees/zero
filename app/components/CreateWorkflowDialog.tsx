'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Plus, 
  Zap, 
  Sparkles, 
  Workflow, 
  FileText, 
  Clock,
  Users,
  Mail,
  Database,
  Globe,
  MessageSquare,
  BarChart3,
  Settings,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from './ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CreateWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId?: string;
}

const workflowTemplates = [
  {
    id: 'email-automation',
    name: 'Email Automation',
    description: 'Send automated emails based on triggers',
    icon: Mail,
    category: 'automation',
    popular: true
  },
  {
    id: 'data-sync',
    name: 'Data Sync',
    description: 'Synchronize data between different systems',
    icon: Database,
    category: 'sync',
    popular: true
  },
  {
    id: 'lead-qualification',
    name: 'Lead Qualification',
    description: 'Automatically qualify leads based on criteria',
    icon: Users,
    category: 'automation'
  },
  {
    id: 'social-media',
    name: 'Social Media Integration',
    description: 'Manage social media posts across platforms',
    icon: Globe,
    category: 'sync'
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    description: 'Create intelligent customer support chatbot',
    icon: MessageSquare,
    category: 'automation'
  },
  {
    id: 'analytics',
    name: 'Analytics Pipeline',
    description: 'Process and analyze data automatically',
    icon: BarChart3,
    category: 'pipeline'
  },
  {
    id: 'blank',
    name: 'Blank Workflow',
    description: 'Start from scratch with a blank canvas',
    icon: Plus,
    category: 'custom'
  }
];

export const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({
  open,
  onOpenChange,
  workspaceId,
}) => {
  const router = useRouter();
  const [workflowName, setWorkflowName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [step, setStep] = useState<'details' | 'template'>('details');

  const handleCreate = () => {
    if (!workflowName.trim()) return;
    
    // Generate a random ID for the new workflow
    const newWorkflowId = Math.random().toString(36).substr(2, 9);
    
    // Close the dialog
    onOpenChange(false);
    
    // Navigate to the new workflow (workspace-aware if provided)
    if (workspaceId) {
      router.push(`/w/${workspaceId}/f/${newWorkflowId}`);
    } else {
      router.push(`/flow/${newWorkflowId}`);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = workflowTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedType(template.category);
      if (!workflowName) {
        setWorkflowName(template.name);
      }
      if (!description) {
        setDescription(template.description);
      }
    }
  };

  const resetForm = () => {
    setWorkflowName('');
    setDescription('');
    setSelectedType('');
    setSelectedTemplate('');
    setStep('details');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Workflow
          </DialogTitle>
          <DialogDescription>
            Set up a new automation workflow to streamline your processes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'details' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className={`text-sm ${step === 'details' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Basic Details
              </span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'template' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className={`text-sm ${step === 'template' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Choose Template
              </span>
            </div>
          </div>

          {step === 'details' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Workflow Name</label>
                <Input
                  placeholder="Enter workflow name..."
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  placeholder="Describe what this workflow does..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Workflow Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workflow type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automation">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Automation
                      </div>
                    </SelectItem>
                    <SelectItem value="sync">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Sync
                      </div>
                    </SelectItem>
                    <SelectItem value="pipeline">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4" />
                        Pipeline
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Custom
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {workflowTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedTemplate === template.id
                          ? 'ring-2 ring-primary border-primary'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground">{template.name}</h4>
                              {template.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(step === 'details' ? 'template' : 'details')}
              disabled={step === 'details'}
            >
              {step === 'details' ? 'Skip Template' : 'Back'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              {step === 'details' ? (
                <Button
                  onClick={() => setStep('template')}
                  disabled={!workflowName.trim()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  disabled={!workflowName.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
