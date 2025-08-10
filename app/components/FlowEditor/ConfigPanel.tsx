import React from 'react';
import { Settings, X, Plus, Trash2, AlertTriangle, Info } from 'lucide-react';
import { useAutomationStore, generateNodeId, NodeConfig } from '../../stores/automationStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const ConfigPanel: React.FC = () => {
  const { selectedNode, updateNode, setSelectedNode, showConfigPanel, setShowConfigPanel } = useAutomationStore();

  if (!showConfigPanel) {
    return null;
  }

  if (!selectedNode) {
    return (
      <div className="w-64 bg-card border-l border-border flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-3 h-3 text-primary" />
            <h2 className="font-semibold text-foreground text-xs">Configuration</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfigPanel(false)}
            className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
          >
            <X className="w-2.5 h-2.5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-2">Configure Node</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Select a node on the canvas to configure its properties
          </p>
          <div className="space-y-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs"
              onClick={() => {
                // Add a new node when Add button is clicked
                const { addNode } = useAutomationStore.getState();
                const newNode = {
                  id: generateNodeId(),
                  type: 'automation',
                  position: { x: 200, y: 200 },
                  data: {
                    id: generateNodeId(),
                    type: 'action' as const,
                    label: 'New Node',
                    icon: 'Zap',
                    config: {
                      method: 'GET',
                      url: '',
                      queryParams: [],
                      description: ''
                    }
                  }
                };
                addNode(newNode);
              }}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add New Node
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const config: NodeConfig = selectedNode.data.config || {};

  const updateConfig = (key: keyof NodeConfig, value: NodeConfig[keyof NodeConfig]) => {
    updateNode(selectedNode.id, {
      config: {
        ...config,
        [key]: value
      }
    });
  };

  const addQueryParam = () => {
    const queryParams = config.queryParams || [];
    updateConfig('queryParams', [...queryParams, { key: '', value: '' }]);
  };

  const updateQueryParam = (index: number, field: 'key' | 'value', value: string) => {
    const queryParams = [...(config.queryParams || [])];
    queryParams[index] = { ...queryParams[index], [field]: value };
    updateConfig('queryParams', queryParams);
  };

  const removeQueryParam = (index: number) => {
    const queryParams = [...(config.queryParams || [])];
    queryParams.splice(index, 1);
    updateConfig('queryParams', queryParams);
  };

  return (
    <div className="w-64 bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between sticky top-0 z-10 bg-card">
        <div className="flex items-center gap-2">
          <Settings className="w-3 h-3 text-primary" />
          <h2 className="font-semibold text-foreground text-xs">Configuration</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedNode(null)}
          className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
        >
          <X className="w-2.5 h-2.5" />
        </Button>
      </div>

      {/* Content (scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Node Info */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{selectedNode.data.label}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground capitalize">
              {selectedNode.data.type} • {selectedNode.data.icon}
            </div>
          </CardContent>
        </Card>

        {/* HTTP Method */}
        <div className="space-y-2">
          <Label htmlFor="method" className="text-xs font-medium">
            HTTP Method
          </Label>
          <Select
            value={config.method || 'GET'}
            onValueChange={(value) => updateConfig('method', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* URL */}
        <div className="space-y-2">
          <Label htmlFor="url" className="text-xs font-medium">
            URL
          </Label>
          <Input
            id="url"
            value={config.url || ''}
            onChange={(e) => updateConfig('url', e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="font-mono text-xs h-8"
          />
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-2">
            <div className="flex items-start gap-2">
              <Info className="w-3 h-3 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                API documentation is available in the sidebar
              </p>
            </div>
          </div>
        </div>

        {/* Query Parameters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Query String Parameters</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={addQueryParam}
              className="h-7 text-xs"
              title="Add parameter"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {(config.queryParams || []).map((param, index: number) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="key"
                value={param.key}
                onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
                className="flex-1 text-xs h-7"
              />
              <Input
                placeholder="value"
                value={param.value}
                onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
                className="flex-1 text-xs h-7"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQueryParam(index)}
                className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}

          {(!config.queryParams || config.queryParams.length === 0) && (
            <div className="text-xs text-muted-foreground italic text-center py-3 bg-muted/30 rounded-lg">
              No query parameters added
            </div>
          )}
          <button
            type="button"
            onClick={addQueryParam}
            className="text-[11px] text-primary hover:underline"
          >
            Add value set
          </button>
        </div>

        <Separator />

        {/* Authentication Info */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-xs text-green-700 dark:text-green-300">
              Authentication headers are automatically included
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={config.description || ''}
            onChange={(e) => updateConfig('description', e.target.value)}
            placeholder="Enter a description for this node..."
            className="min-h-[80px] text-xs resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {(config.description || '').length}/200
          </div>
        </div>
      </div>

      {/* Footer Actions (sticky) */}
      <div className="p-3 border-t border-border flex gap-2 sticky bottom-0 z-10 bg-card">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (selectedNode) {
              const { removeNode, setSelectedNode } = useAutomationStore.getState();
              removeNode(selectedNode.id);
              setSelectedNode(null);
            }
          }}
          className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20 h-7 text-xs"
        >
          <Trash2 className="w-2.5 h-2.5 mr-1" />
          Delete Block
        </Button>
        <Button size="sm" className="flex-1 h-7 text-xs">
          Continue
        </Button>
      </div>
    </div>
  );
};