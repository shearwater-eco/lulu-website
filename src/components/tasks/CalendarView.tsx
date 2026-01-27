import { useMemo } from 'react';
import { Task, useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import TaskDialog from './TaskDialog';

interface CalendarViewProps {
  projectId?: string;
}

export default function CalendarView({ projectId }: CalendarViewProps) {
  const { tasks, isLoading } = useTasks(projectId);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the starting day of the week (0 = Sunday)
  const startingDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startingDayOfWeek).fill(null);

  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};
    tasks.forEach((task) => {
      if (task.due_date) {
        const dateKey = format(new Date(task.due_date), 'yyyy-MM-dd');
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(task);
      }
    });
    return map;
  }, [tasks]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTask(undefined);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden">
          {/* Week day headers */}
          <div className="grid grid-cols-7 bg-muted">
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium border-b">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {/* Padding for days before month starts */}
            {paddingDays.map((_, index) => (
              <div key={`padding-${index}`} className="min-h-24 p-2 border-b border-r bg-muted/30" />
            ))}

            {/* Actual days */}
            {daysInMonth.map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const dayTasks = tasksByDate[dateKey] || [];
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={dateKey}
                  className={cn(
                    "min-h-24 p-2 border-b border-r cursor-pointer hover:bg-muted/50 transition-colors",
                    isCurrentDay && "bg-primary/5"
                  )}
                  onClick={() => handleDateClick(day)}
                >
                  <div className={cn(
                    "text-sm font-medium mb-1",
                    isCurrentDay && "text-primary"
                  )}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer",
                          task.status === 'done' 
                            ? "bg-green-100 text-green-700 line-through" 
                            : task.priority === 'urgent'
                            ? "bg-red-100 text-red-700"
                            : task.priority === 'high'
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskClick(task);
                        }}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        projectId={projectId}
        defaultDueDate={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined}
      />
    </>
  );
}
