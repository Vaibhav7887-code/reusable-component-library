"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  date: Date;
  title: string;
  type?: 'meeting' | 'reminder' | 'deadline' | 'birthday';
}

interface CalendarProps {
  className?: string;
  month?: number;
  year?: number;
  events?: CalendarEvent[];
  onSelectDate?: (date: Date) => void;
}

export function Calendar({ 
  className, 
  month = new Date().getMonth(), 
  year = new Date().getFullYear(),
  events = [],
  onSelectDate
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month);
  const [currentYear, setCurrentYear] = React.useState(year);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = React.useState<number | null>(null);
  const [showEventTooltip, setShowEventTooltip] = React.useState<{day: number, events: CalendarEvent[]} | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState<{top: number, left: number} | null>(null);
  const calendarGridRef = React.useRef<HTMLDivElement>(null);
  const dayRefs = React.useRef<{[key: number]: HTMLDivElement | null}>({});
  const calendarRef = React.useRef<HTMLDivElement>(null);
  
  // Sample events if none provided
  const defaultEvents = React.useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    if (events.length > 0) return events;
    
    return [
      {
        date: new Date(thisYear, thisMonth, 5),
        title: 'Team Meeting',
        type: 'meeting'
      },
      {
        date: new Date(thisYear, thisMonth, 12),
        title: 'Project Deadline',
        type: 'deadline'
      },
      {
        date: new Date(thisYear, thisMonth, 15),
        title: 'Sarah\'s Birthday',
        type: 'birthday'
      },
      {
        date: new Date(thisYear, thisMonth, 20),
        title: 'Quarterly Review',
        type: 'meeting'
      },
      {
        date: new Date(thisYear, thisMonth, 25),
        title: 'Submit Report',
        type: 'reminder'
      }
    ] as CalendarEvent[];
  }, [events]);
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };
  
  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    // If clicking the same date, toggle selection off
    if (selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear) {
      setSelectedDate(null);
      if (onSelectDate) {
        onSelectDate(null as any);
      }
    } else {
      setSelectedDate(newDate);
      if (onSelectDate) {
        onSelectDate(newDate);
      }
    }
  };
  
  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };
  
  const isSelected = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };
  
  const getEventsForDay = (day: number) => {
    return defaultEvents.filter(event => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth &&
        event.date.getFullYear() === currentYear
      );
    });
  };
  
  const hasEvents = (day: number) => {
    return getEventsForDay(day).length > 0;
  };
  
  const getEventColor = (type?: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'reminder': return 'bg-yellow-500';
      case 'deadline': return 'bg-red-500';
      case 'birthday': return 'bg-green-500';
      default: return 'bg-purple-500';
    }
  };
  
  const handleShowTooltip = (day: number) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setShowEventTooltip({ day, events: dayEvents });
      
      // Calculate tooltip position based on the day element
      const dayElement = dayRefs.current[day];
      const gridElement = calendarGridRef.current;
      
      if (dayElement && gridElement) {
        const dayRect = dayElement.getBoundingClientRect();
        const gridRect = gridElement.getBoundingClientRect();
        
        setTooltipPosition({
          top: dayRect.top - gridRect.top,
          left: dayRect.left - gridRect.left + (dayRect.width / 2)
        });
      }
    }
  };
  
  const handleHideTooltip = () => {
    setShowEventTooltip(null);
    setTooltipPosition(null);
  };
  
  const renderDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasEvent = dayEvents.length > 0;
      
      days.push(
        <div
          key={day}
          ref={(el) => { dayRefs.current[day] = el; }}
          className={cn(
            "h-10 w-10 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-all duration-200",
            isToday(day) 
              ? "bg-white/30 backdrop-filter backdrop-blur-sm font-bold" 
              : hoveredDate === day
                ? "bg-white/20"
                : "hover:bg-white/10",
            isSelected(day) && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
          onClick={() => handleSelectDate(day)}
          onMouseEnter={() => {
            setHoveredDate(day);
            if (hasEvent) handleShowTooltip(day);
          }}
          onMouseLeave={() => {
            setHoveredDate(null);
            handleHideTooltip();
          }}
        >
          <span className={cn(
            "text-sm",
            isSelected(day) && "font-bold"
          )}>
            {day}
          </span>
          {hasEvent && (
            <div className="flex gap-0.5 mt-0.5">
              {dayEvents.slice(0, 3).map((event, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 w-1 rounded-full",
                    getEventColor(event.type)
                  )}
                />
              ))}
              {dayEvents.length > 3 && (
                <div className="h-1 w-1 rounded-full bg-white/50" />
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const renderEventTooltip = () => {
    if (!showEventTooltip || !tooltipPosition) return null;
    
    return (
      <div 
        className="absolute z-50 bg-black/80 backdrop-blur-sm rounded-lg p-2 shadow-lg max-w-[200px] text-xs text-white pointer-events-none"
        style={{
          top: `${tooltipPosition.top - 5}px`,
          left: `${tooltipPosition.left}px`,
          transform: 'translate(-50%, -100%)'
        }}
      >
        <div className="font-medium mb-1">
          {monthNames[currentMonth]} {showEventTooltip.day}, {currentYear}
        </div>
        <div className="space-y-1">
          {showEventTooltip.events.map((event, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={cn(
                "h-2 w-2 rounded-full",
                getEventColor(event.type)
              )} />
              <span>{event.title}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black/80 transform translate-y-1/2 rotate-45 -translate-x-1/2"></div>
      </div>
    );
  };
  
  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setSelectedDate(now);
    if (onSelectDate) {
      onSelectDate(now);
    }
  };
  
  // Handle clicks outside the calendar days to close the details panel
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedDate && calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setSelectedDate(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDate]);
  
  // Format time to 12-hour format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  // Get event time if available
  const getEventTime = (event: CalendarEvent) => {
    if (event.date.getHours() === 0 && event.date.getMinutes() === 0) {
      return null; // All-day event
    }
    return formatTime(event.date);
  };
  
  // Get event type label
  const getEventTypeLabel = (type?: string) => {
    switch (type) {
      case 'meeting': return 'Meeting';
      case 'reminder': return 'Reminder';
      case 'deadline': return 'Deadline';
      case 'birthday': return 'Birthday';
      default: return 'Event';
    }
  };
  
  return (
    <Card className={cn("w-full max-w-md h-full flex flex-col", className)} ref={calendarRef}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {monthNames[currentMonth]} {currentYear}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="sr-only">Previous month</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
            className="h-8 text-xs"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="grid grid-cols-7 gap-1 text-center">
          {dayNames.map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>
        <div ref={calendarGridRef} className="grid grid-cols-7 gap-1 mt-1 relative flex-1">
          {renderDays()}
          {showEventTooltip && renderEventTooltip()}
        </div>
        
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">
                {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>
              <div className="flex items-center gap-2">
                {getEventsForDay(selectedDate.getDate()).length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {getEventsForDay(selectedDate.getDate()).length} event{getEventsForDay(selectedDate.getDate()).length !== 1 ? 's' : ''}
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => setSelectedDate(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {getEventsForDay(selectedDate.getDate()).length > 0 ? (
                getEventsForDay(selectedDate.getDate()).map((event, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                    <div className={cn(
                      "h-3 w-3 rounded-full mt-1",
                      getEventColor(event.type)
                    )} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{event.title}</span>
                        {getEventTime(event) && (
                          <span className="text-xs text-muted-foreground">{getEventTime(event)}</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getEventTypeLabel(event.type)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No events scheduled for this day
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 