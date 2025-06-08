'use client';

import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Policy } from '../data/mock-tech-data';
import { Trash2, PlusCircle, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PolicyEditorV2({ policy: initialPolicy }: { policy: Policy }) {
  const [editedPolicy, setEditedPolicy] = useState(initialPolicy);
  const [activeTab, setActiveTab] = useState("visual");
  const [view, setView] = useState<'editing' | 'diffing' | 'saved'>('editing');

  useEffect(() => {
    setEditedPolicy(initialPolicy);
    setView('editing');
  }, [initialPolicy]);
  
  const handleFieldChange = (field: keyof Omit<Policy, 'conditions' | 'effect'>, value: string) => {
    setEditedPolicy(prev => ({ ...prev, [field]: value }));
  };

  const handleEffectChange = (value: 'allow' | 'deny') => {
    setEditedPolicy(prev => ({ ...prev, effect: value }));
  };

  const handleConditionChange = (index: number, field: 'attribute' | 'operator' | 'value', value: string) => {
    const newConditions = [...editedPolicy.conditions];
    const conditionToUpdate = { ...newConditions[index] };
    
    if (field === 'operator') {
      conditionToUpdate.operator = value as Policy['conditions'][0]['operator'];
    } else {
      (conditionToUpdate as any)[field] = value;
    }
    
    newConditions[index] = conditionToUpdate;
    setEditedPolicy(prev => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    const newCondition: Policy['conditions'][0] = { attribute: '', operator: 'equals', value: '' };
    const newConditions = [...editedPolicy.conditions, newCondition];
    setEditedPolicy(prev => ({ ...prev, conditions: newConditions }));
  };

  const removeCondition = (index: number) => {
    const newConditions = editedPolicy.conditions.filter((_, i) => i !== index);
    setEditedPolicy(prev => ({ ...prev, conditions: newConditions }));
  };

  const handleSave = () => {
    setView('diffing');
  };

  const handleCancel = () => {
    setEditedPolicy(initialPolicy);
    setView('editing');
  };

  const handleConfirm = () => {
    // Here you would typically make an API call to save the policy.
    // For this prototype, we'll simulate success.
    console.log("Policy committed:", editedPolicy);
    setView('saved');
  };
  
  const handleOkay = () => {
    // In a real app, the parent component would refetch the policy list.
    // For now, we'll just go back to editing the newly "saved" state.
    // To make this work, we'd need to update what `initialPolicy` is.
    // A simple way is to just go back to the editor.
    setView('editing');
  }

  const renderContent = () => {
    switch (view) {
      case 'saved':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold">Policy Saved</h3>
            <p className="text-muted-foreground">Your changes have been successfully committed.</p>
          </div>
        );
      case 'diffing':
        return (
          <ScrollArea className="h-full">
            <div className="p-4">
              <ReactDiffViewer
                oldValue={JSON.stringify(initialPolicy, null, 2)}
                newValue={JSON.stringify(editedPolicy, null, 2)}
                splitView={false}
                hideLineNumbers={true}
                useDarkTheme={true}
              />
            </div>
          </ScrollArea>
        );
      case 'editing':
      default:
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <TabsList className="grid w-full grid-cols-2 mt-2">
                <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                <TabsTrigger value="code">Code Editor</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="flex-grow relative">
                <TabsContent value="visual" className="absolute inset-0 overflow-y-auto">
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Policy Name</Label>
                            <Input value={editedPolicy.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Input value={editedPolicy.description} onChange={(e) => handleFieldChange('description', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Effect</Label>
                            <Select value={editedPolicy.effect} onValueChange={(value: "allow" | "deny") => handleEffectChange(value)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="allow">Allow</SelectItem>
                                    <SelectItem value="deny">Deny</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-4">
                        <Label>Conditions</Label>
                        {editedPolicy.conditions.map((cond, i) => (
                            <div key={i} className="p-3 rounded-lg border bg-black/10 space-y-2">
                            <div className="grid grid-cols-1 gap-2">
                                <div>
                                <Label className="text-xs">Attribute</Label>
                                <Input value={cond.attribute} onChange={(e) => handleConditionChange(i, 'attribute', e.target.value)} />
                                </div>
                                <div>
                                    <Label className="text-xs">Operator</Label>
                                    <Select value={cond.operator} onValueChange={(val) => handleConditionChange(i, 'operator', val)}>
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="equals">equals</SelectItem>
                                        <SelectItem value="not_equals">not equals</SelectItem>
                                        <SelectItem value="contains">contains</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs">Value</Label>
                                <Input value={cond.value as string} onChange={(e) => handleConditionChange(i, 'value', e.target.value)} />
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="w-full text-red-500 hover:text-red-500" onClick={() => removeCondition(i)}>
                                <Trash2 className="h-4 w-4 mr-2"/>Remove Condition
                            </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addCondition} className="w-full"><PlusCircle className="h-4 w-4 mr-2" />Add Condition</Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="code" className="absolute inset-0 overflow-y-auto">
                    <div className="p-4">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
                        {JSON.stringify(editedPolicy, null, 2)}
                    </SyntaxHighlighter>
                    </div>
                </TabsContent>
            </CardContent>
          </Tabs>
        );
    }
  };
  
  const renderFooter = () => {
    switch (view) {
      case 'saved':
        return <Button className="w-full" onClick={handleOkay}>Okay</Button>;
      case 'diffing':
        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm & Commit</Button>
          </div>
        );
      case 'editing':
      default:
        return <Button className="w-full" onClick={handleSave}>Save Changes</Button>;
    }
  };

  return (
    <Card className="h-full flex flex-col glass-card">
        {renderContent()}
      <CardFooter className="flex-shrink-0 p-4 border-t">
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}