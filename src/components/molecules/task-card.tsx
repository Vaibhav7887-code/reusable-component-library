"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface TaskCardProps {
  className?: string;
  title: string;
  tasks: Task[];
  onTaskToggle?: (id: string, completed: boolean) => void;
}

export function TaskCard({
  className,
  title,
  tasks,
  onTaskToggle
}: TaskCardProps) {
  const [localTasks, setLocalTasks] = React.useState<Task[]>(tasks);
  
  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);
  
  const handleTaskToggle = (id: string) => {
    const updatedTasks = localTasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (onTaskToggle) {
          onTaskToggle(id, updatedTask.completed);
        }
        return updatedTask;
      }
      return task;
    });
    
    setLocalTasks(updatedTasks);
  };
  
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-700 dark:text-red-300";
      case "medium":
        return "bg-orange-500/20 text-orange-700 dark:text-orange-300";
      case "low":
        return "bg-green-500/20 text-green-700 dark:text-green-300";
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    // Check if date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    
    // Otherwise, return formatted date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };
  
  const completedTasks = localTasks.filter(task => task.completed);
  const progress = localTasks.length > 0 
    ? Math.round((completedTasks.length / localTasks.length) * 100) 
    : 0;
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            View All
          </Button>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
            <div 
              className="h-full rounded-full bg-white/30" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ul className="space-y-2">
          {localTasks.map(task => (
            <li 
              key={task.id}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              <div 
                className={cn(
                  "mt-0.5 h-5 w-5 rounded-full border border-white/30 flex items-center justify-center cursor-pointer transition-colors",
                  task.completed && "bg-white/30 border-white/50"
                )}
                onClick={() => handleTaskToggle(task.id)}
              >
                {task.completed && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    getPriorityColor(task.priority)
                  )}>
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 