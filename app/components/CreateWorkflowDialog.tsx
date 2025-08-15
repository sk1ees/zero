'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkflows, CreateWorkflowData } from '../hooks/useWorkflows';
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
  Star,
  Tag,
  Check
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
    popular: true,
    tags: ['Email', 'Marketing', 'Automation']
  },
  {
    id: 'data-sync',
    name: 'Data Sync',
    description: 'Synchronize data between different systems',
    icon: Database,
    category: 'sync',
    popular: true,
    tags: ['Sync', 'Database', 'ETL']
  },
  {
    id: 'lead-qualification',
    name: 'Lead Qualification',
    description: 'Automatically qualify leads based on criteria',
    icon: Users,
    category: 'automation',
    tags: ['Leads', 'AI', 'Qualification']
  },
  {
    id: 'social-media',
    name: 'Social Media Integration',
    description: 'Manage social media posts across platforms',
    icon: Globe,
    category: 'sync',
    tags: ['Social', 'Content', 'Integration']
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    description: 'Create intelligent customer support chatbot',
    icon: MessageSquare,
    category: 'automation',
    tags: ['Chatbot', 'Support', 'AI']
  },
  {
    id: 'analytics',
    name: 'Analytics Pipeline',
    description: 'Process and analyze data automatically',
    icon: BarChart3,
    category: 'pipeline',
    tags: ['Analytics', 'Pipeline', 'Data']
  },
  {
    id: 'blank',
    name: 'Blank Workflow',
    description: 'Start from scratch with a blank canvas',
    icon: Plus,
    category: 'custom',
    tags: []
  }
];

export const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({
  open,
  onOpenChange,
  workspaceId,
}) => {
  const router = useRouter();
  const { createWorkflow } = useWorkflows();
  const [workflowName, setWorkflowName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [step, setStep] = useState<'details' | 'template'>('details');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const allSuggestedTags = useMemo(() => {
    const base = workflowTemplates.flatMap(t => t.tags || []);
    const extras = ['Automation', 'Sync', 'Pipeline', 'Custom'];
    return Array.from(new Set([...base, ...extras]))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredSuggestions = useMemo(() => {
    const query = tagInput.trim().toLowerCase();
    const remaining = allSuggestedTags.filter(t => !tags.includes(t));
    if (!query) return remaining.slice(0, 6);
    return remaining.filter(t => t.toLowerCase().includes(query)).slice(0, 6);
  }, [allSuggestedTags, tagInput, tags]);

  const handleCreate = async () => {
    if (!workflowName.trim() || !workspaceId) return;
    
    try {
      const workflowData: CreateWorkflowData = {
        name: workflowName.trim(),
        description: description.trim(),
        type: selectedType as 'sync' | 'automation' | 'pipeline' | 'custom',
        tags: tags,
        config: {}
      };
      
      const newWorkflow = await createWorkflow(workflowData);
      
      if (newWorkflow) {
        // Close the dialog
        onOpenChange(false);
        
        // Navigate to the new workflow
        router.push(`/w/${workspaceId}/f/${newWorkflow.id}`);
      }
    } catch (error) {
      console.error('Failed to create workflow:', error);
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
      if (template.tags && template.tags.length > 0) {
        // Pre-fill a couple of recommended tags without duplicating existing
        const toAdd = template.tags.filter(t => !tags.includes(t)).slice(0, 2);
        if (toAdd.length) setTags(prev => [...prev, ...toAdd]);
      }
    }
  };

  const resetForm = () => {
    setWorkflowName('');
    setDescription('');
    setSelectedType('');
    setSelectedTemplate('');
    setStep('details');
    setTags([]);
    setTagInput('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    if (tags.includes(value)) return;
    // optional: limit number of tags
    if (tags.length >= 8) return;
    setTags(prev => [...prev, value]);
  };

  const removeTag = (value: string) => {
    setTags(prev => prev.filter(t => t !== value));
  };

  const onTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput) {
      // quick remove last
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Workflow
          </DialogTitle>
          <DialogDescription>
            Set up a new automation workflow to streamline your processes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Step Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step === 'details' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className={`text-xs ${step === 'details' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Basic Details
              </span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step === 'template' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className={`text-xs ${step === 'template' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Choose Template
              </span>
            </div>
          </div>

          {step === 'details' ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Workflow Name</label>
                <Input
                  placeholder="Enter workflow name..."
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Describe what this workflow does..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Workflow Type</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
                <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5">
                  {tags.map((t) => (
                    <Badge key={t} variant="secondary" className="px-2 py-0.5 text-xs flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {t}
                      <button
                        type="button"
                        className="ml-1 rounded hover:bg-muted/70"
                        onClick={() => removeTag(t)}
                        aria-label={`Remove tag ${t}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={onTagKeyDown}
                    placeholder={tags.length ? 'Add tag' : 'Add tags (press Enter)'}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm px-1 py-1"
                  />
                </div>
                {filteredSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {filteredSuggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => addTag(s)}
                        className="text-xs px-2 py-1 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="max-h-80 overflow-y-auto rounded-md border border-border">
                                 {/* Table Header */}
                 <div className="sticky top-0 bg-background border-b border-border px-3 py-2">
                   <div className="grid grid-cols-[auto_1fr] gap-3 text-xs font-medium text-muted-foreground">
                     <div className="w-8"></div>
                     <div>Template</div>
                   </div>
                 </div>
                 
                 {/* Table Rows */}
                 <div className="divide-y divide-border">
                   {workflowTemplates.map((template) => {
                     const Icon = template.icon;
                     const isSelected = selectedTemplate === template.id;
                     return (
                       <button
                         type="button"
                         key={template.id}
                         onClick={() => handleTemplateSelect(template.id)}
                         className={`w-full text-left focus:outline-none transition-colors ${
                           isSelected ? 'bg-accent/60' : 'hover:bg-accent'
                         }`}
                       >
                         <div className="grid grid-cols-[auto_1fr] gap-3 px-3 py-2.5 items-center">
                           {/* Selection + Icon */}
                           <div className="flex items-center gap-2">
                             <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                               isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40'
                             }`}>
                               {isSelected ? <Check className="w-3 h-3" /> : null}
                             </div>
                             <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                               <Icon className="w-3 h-3 text-primary" />
                             </div>
                           </div>
                           
                           {/* Name + Description */}
                           <div className="min-w-0">
                             <div className="flex items-center gap-2">
                               <h4 className="font-medium text-sm text-foreground truncate">{template.name}</h4>
                               {template.popular && (
                                 <Badge variant="secondary" className="text-[10px]">
                                   <Star className="w-2 h-2 mr-1" />
                                   Popular
                                 </Badge>
                               )}
                             </div>
                             <p className="text-xs text-muted-foreground truncate">{template.description}</p>
                           </div>
                         </div>
                       </button>
                     );
                   })}
                 </div>
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
