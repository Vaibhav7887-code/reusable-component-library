"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChartDataPoint {
  value: number;
  label: string;
}

interface ChartCardProps {
  className?: string;
  title: string;
  description?: string;
  type?: "line" | "bar";
  color?: string;
  chartHeight?: number;
}

export function ChartCard({
  className,
  title,
  description,
  type = "line",
  color = "hsl(var(--primary))",
  chartHeight = 200,
}: ChartCardProps) {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null);
  const [activePeriod, setActivePeriod] = React.useState<'day' | 'week' | 'month'>('day');
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const chartRef = React.useRef<HTMLDivElement>(null);

  // Update dimensions when component mounts and on window resize
  React.useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const width = chartRef.current.clientWidth;
        const height = chartHeight - 20; // Account for padding
        setDimensions({ width, height });
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);

    // Force an update after a short delay to handle any layout shifts
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [chartHeight]);

  // Update dimensions when period changes
  React.useEffect(() => {
    if (chartRef.current) {
      const width = chartRef.current.clientWidth;
      const height = chartHeight - 20;
      setDimensions({ width, height });
    }
  }, [activePeriod, chartHeight]);

  // Force a re-render on mount to ensure dimensions are set
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (chartRef.current) {
        const width = chartRef.current.clientWidth;
        const height = chartHeight - 20;
        setDimensions({ width, height });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Hardcoded data for each period
  const data = {
    day: [
      { value: 1200, label: "Mon" },
      { value: 1400, label: "Tue" },
      { value: 1100, label: "Wed" },
      { value: 1600, label: "Thu" },
      { value: 1800, label: "Fri" },
      { value: 1300, label: "Sat" },
      { value: 1500, label: "Sun" },
    ],
    week: [
      { value: 5200, label: "Week 1" },
      { value: 6100, label: "Week 2" },
      { value: 4800, label: "Week 3" },
      { value: 5700, label: "Week 4" },
    ],
    month: [
      { value: 12500, label: "Jan" },
      { value: 14000, label: "Feb" },
      { value: 13200, label: "Mar" },
      { value: 15600, label: "Apr" },
      { value: 16800, label: "May" },
      { value: 14300, label: "Jun" },
      { value: 18200, label: "Jul" },
      { value: 17500, label: "Aug" },
      { value: 19200, label: "Sep" },
      { value: 18400, label: "Oct" },
      { value: 20100, label: "Nov" },
      { value: 21500, label: "Dec" },
    ],
  };

  const currentData = data[activePeriod];
  const maxValue = Math.max(...currentData.map(d => d.value));

  // Render tooltip
  const renderTooltip = () => {
    if (hoveredPoint === null) return null;
    
    const point = currentData[hoveredPoint];
    const { width, height } = dimensions;
    const effectiveWidth = width || 300;
    const effectiveHeight = height || chartHeight - 20;
    
    let x, y;
    if (type === "bar") {
      const barWidth = (effectiveWidth / currentData.length) * 0.8;
      x = (effectiveWidth / currentData.length) * hoveredPoint + (effectiveWidth / currentData.length - barWidth) / 2 + (barWidth / 2);
      y = effectiveHeight - (point.value / maxValue * (effectiveHeight - 40));
    } else {
      x = (effectiveWidth / (currentData.length - 1)) * hoveredPoint;
      y = effectiveHeight - (point.value / maxValue * (effectiveHeight - 40));
    }

    // Calculate tooltip position
    let tooltipX = x - 40; // Center the tooltip (80px width / 2)
    let tooltipY = y - 60; // Position above the point with more offset

    // Adjust if too close to edges
    if (tooltipX < 0) tooltipX = 0;
    if (tooltipX > effectiveWidth - 80) tooltipX = effectiveWidth - 80;
    if (tooltipY < 0) tooltipY = 0;
    
    return (
      <div
        className="absolute pointer-events-none bg-background/80 backdrop-blur-md rounded text-xs shadow-md px-3 py-2"
        style={{
          left: tooltipX,
          top: tooltipY,
          width: '80px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: 'translateY(-100%)'
        }}
      >
        <div className="font-medium">{point.label}</div>
        <div className="text-muted-foreground">{point.value.toLocaleString()}</div>
      </div>
    );
  };
  
  // Render chart
  const renderChart = () => {
    const { width, height } = dimensions;
    const effectiveWidth = width || 300; // Use minimum width if dimensions not set
    const effectiveHeight = height || chartHeight - 20;

    if (type === "bar") {
      const barWidth = (effectiveWidth / currentData.length) * 0.8;
      return (
        <div className="relative h-full">
          {currentData.map((point, i) => {
            const barHeight = (point.value / maxValue) * (effectiveHeight - 40);
            const x = (effectiveWidth / currentData.length) * i + (effectiveWidth / currentData.length - barWidth) / 2;
            const y = effectiveHeight - barHeight;
            
            return (
              <div 
                key={i}
                className="absolute transition-all duration-200"
                style={{
                  left: x,
                  top: y,
                  width: barWidth,
                  height: barHeight,
                  background: color,
                  opacity: hoveredPoint === i ? 1 : 0.7,
                  borderRadius: '4px',
                }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
          {hoveredPoint !== null && renderTooltip()}
        </div>
      );
    }
    
    // Line chart
    const points = currentData.map((point, i) => {
      const x = (effectiveWidth / (currentData.length - 1)) * i;
      const y = effectiveHeight - (point.value / maxValue) * (effectiveHeight - 40);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative h-full">
        <svg width="100%" height="100%" className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeOpacity={0.8}
            className="transition-all duration-200"
          />
          {currentData.map((point, i) => {
            const x = (effectiveWidth / (currentData.length - 1)) * i;
            const y = effectiveHeight - (point.value / maxValue * (effectiveHeight - 40));

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredPoint === i ? 5 : 4}
                fill={color}
                stroke={color}
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>
        {hoveredPoint !== null && renderTooltip()}
      </div>
    );
  };
  
  return (
    <Card className={cn("w-full overflow-hidden flex flex-col bg-background/40 backdrop-blur-md border-white/5 shadow-xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <div className="flex items-center p-1 bg-background/60 backdrop-blur-sm rounded-lg border border-white/10">
          <Button 
            variant="segmented" 
            size="sm" 
            className={cn(
              "h-8 px-3 text-xs rounded-md",
              activePeriod === 'day' && "state-active"
            )}
            data-state={activePeriod === 'day' ? "active" : "inactive"}
            onClick={() => setActivePeriod('day')}
          >
            Day
          </Button>
          <Button 
            variant="segmented" 
            size="sm" 
            className={cn(
              "h-8 px-3 text-xs rounded-md",
              activePeriod === 'week' && "state-active"
            )}
            data-state={activePeriod === 'week' ? "active" : "inactive"}
            onClick={() => setActivePeriod('week')}
          >
            Week
          </Button>
          <Button 
            variant="segmented" 
            size="sm" 
            className={cn(
              "h-8 px-3 text-xs rounded-md",
              activePeriod === 'month' && "state-active"
            )}
            data-state={activePeriod === 'month' ? "active" : "inactive"}
            onClick={() => setActivePeriod('month')}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div 
          ref={chartRef} 
          className="relative flex-1 w-full"
          style={{ 
            minWidth: "300px",
            minHeight: `${chartHeight}px`
          }}
        >
          {renderChart()}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {currentData.map((point, i) => (
            <div
              key={i}
              className={cn(
                "transition-colors",
                hoveredPoint === i && "text-primary font-medium"
              )}
            >
              {point.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 