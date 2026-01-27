import { useMemo, useState } from 'react';
import { Task, useTasks } from '@/hooks/useTasks';
import { format, differenceInDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isWithinInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import TaskDialog from './TaskDialog';

interface GanttViewProps {
  projectId?: string;
}

export default function GanttView({ projectId }: GanttViewProps) {
  const { tasks, isLoading } = useTasks(projectId);
  const [startDate, setStartDate] = useState(() => startOfWeek(new Date()));
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Show 4 weeks at a time
  const endDate = addDays(startDate, 27);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevPeriod = () => setStartDate(addDays(startDate, -14));
  const handleNextPeriod = () => setStartDate(addDays(startDate, 14));
  const handleToday = () => setStartDate(startOfWeek(new Date()));

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  // Filter tasks that have dates and sort by start date
  const tasksWithDates = useMemo(() => {
    return tasks
      .filter(task => task.start_date || task.due_date)
      .sort((a, b) => {
        const aDate = new Date(a.start_date || a.due_date || '');
        const bDate = new Date(b.start_date || b.due_date || '');
        return aDate.getTime() - bDate.getTime();
      });
  }, [tasks]);

  const getTaskPosition = (task: Task) => {
    const taskStart = task.start_date ? new Date(task.start_date) : new Date(task.due_date!);
    const taskEnd = task.due_date ? new Date(task.due_date) : taskStart;

    const startOffset = differenceInDays(taskStart, startDate);
    const duration = differenceInDays(taskEnd, taskStart) + 1;

    // Calculate left and width as percentages
    const left = Math.max(0, (startOffset / 28) * 100);
    const width = Math.min(100 - left, (duration / 28) * 100);

    return { left: `${left}%`, width: `${Math.max(width, 3)}%` };
  };

  const getTaskColor = (task: Task) => {
    if (task.status === 'done') return 'bg-green-500';
    if (task.priority === 'urgent') return 'bg-red-500';
    if (task.priority === 'high') return 'bg-amber-500';
    if (task.status === 'in_progress') return 'bg-blue-500';
    return 'bg-slate-400';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrevPeriod}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextPeriod}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Gantt Chart */}
        <div className="border rounded-lg overflow-hidden">
          {/* Date headers */}
          <div className="flex border-b bg-muted">
            <div className="w-48 shrink-0 p-2 font-medium text-sm border-r">Task</div>
            <div className="flex-1 flex">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex-1 p-1 text-center text-xs border-r last:border-r-0",
                    isSameDay(day, new Date()) && "bg-primary/10 font-bold"
                  )}
                >
                  <div>{format(day, 'EEE')}</div>
                  <div className={cn(
                    "font-medium",
                    isSameDay(day, new Date()) && "text-primary"
                  )}>
                    {format(day, 'd')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task rows */}
          {tasksWithDates.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No tasks with dates. Add start/due dates to see them here.
            </div>
          ) : (
            tasksWithDates.map((task) => {
              const position = getTaskPosition(task);
              return (
                <div key={task.id} className="flex border-b last:border-b-0 hover:bg-muted/50">
                  <div 
                    className="w-48 shrink-0 p-2 border-r cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <p className={cn(
                      "text-sm font-medium truncate",
                      task.status === 'done' && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.start_date && format(new Date(task.start_date), 'MMM d')}
                      {task.start_date && task.due_date && ' - '}
                      {task.due_date && format(new Date(task.due_date), 'MMM d')}
                    </p>
                  </div>
                  <div className="flex-1 relative h-14">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {days.map((day, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "flex-1 border-r last:border-r-0",
                            isSameDay(day, new Date()) && "bg-primary/5"
                          )}
                        />
                      ))}
                    </div>
                    {/* Task bar */}
                    <div
                      className={cn(
                        "absolute top-3 h-8 rounded cursor-pointer hover:opacity-80 transition-opacity flex items-center px-2",
                        getTaskColor(task)
                      )}
                      style={{ left: position.left, width: position.width }}
                      onClick={() => handleTaskClick(task)}
                    >
                      <span className="text-xs text-white truncate">
                        {task.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-slate-400" />
            <span>To Do</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>Urgent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Done</span>
          </div>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        projectId={projectId}
      />
    </>
  );
}
