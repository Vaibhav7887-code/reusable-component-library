"use client";

import * as React from "react";
import { StatsCard } from "@/components/molecules/stats-card";
import { ChartCard } from "@/components/molecules/chart-card";
import { Calendar } from "@/components/molecules/calendar";
import { TaskCard } from "@/components/molecules/task-card";

export function Dashboard() {
  // Sample data for stats cards
  const statsData = [
    {
      title: "Total Revenue",
      value: "$24,532",
      trend: { value: 12.5, isPositive: true },
      color: "blue" as const,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "New Users",
      value: "1,482",
      trend: { value: 8.2, isPositive: true },
      color: "green" as const,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-green-500"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Active Sessions",
      value: "842",
      trend: { value: 3.1, isPositive: false },
      color: "purple" as const,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-purple-500"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      title: "Bounce Rate",
      value: "24.8%",
      trend: { value: 5.7, isPositive: true },
      color: "orange" as const,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-orange-500"
        >
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-6" />
        </svg>
      )
    }
  ];
  
  // Sample data for chart
  const chartData = {
    title: "Weekly Revenue",
    description: "Revenue trends for the past week",
    data: [12500, 14000, 13200, 15600, 16800, 14300, 18200],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    type: "area" as const
  };
  
  // Sample data for tasks
  const tasksData = {
    title: "Today's Tasks",
    tasks: [
      {
        id: "1",
        title: "Review new design proposals",
        completed: true,
        priority: "high" as const,
        dueDate: new Date().toISOString()
      },
      {
        id: "2",
        title: "Meeting with product team",
        completed: false,
        priority: "medium" as const,
        dueDate: new Date().toISOString()
      },
      {
        id: "3",
        title: "Update documentation",
        completed: false,
        priority: "low" as const,
        dueDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
      },
      {
        id: "4",
        title: "Prepare quarterly report",
        completed: false,
        priority: "high" as const,
        dueDate: new Date(Date.now() + 172800000).toISOString() // Day after tomorrow
      }
    ]
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Charts and Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2" style={{ minHeight: "300px" }}>
          <ChartCard
            title="Weekly Revenue"
            description="Revenue trends over time"
            type="line"
            className="h-full"
            chartHeight={300}
          />
        </div>
        <div className="h-full">
          <Calendar className="h-full" />
        </div>
      </div>
      
      {/* Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskCard
          title={tasksData.title}
          tasks={tasksData.tasks}
        />
        
        <ChartCard
          title="Monthly Visitors"
          type="bar"
          color="rgba(124, 58, 237, 0.8)" // Purple
          chartHeight={300}
        />
      </div>
    </div>
  );
} 