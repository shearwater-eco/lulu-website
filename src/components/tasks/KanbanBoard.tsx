import { useState } from 'react';
import { Task, TaskStatus, TaskPriority, useTasks } from '@/hooks/useTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, GripVertical, Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import TaskDialog from './TaskDialog';

interface KanbanBoardProps {
  projectId?: string;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: 'To Do', color: 'bg-slate-100 border-slate-300' },
  in_progress: { label: 'In Progress', color: 'bg-blue-50 border-blue-300' },
  review: { label: 'Review', color: 'bg-amber-50 border-amber-300' },
  done: { label: 'Done', color: 'bg-green-50 border-green-300' },
};

const priorityConfig: Record<TaskPriority, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  low: { label: 'Low', variant: 'outline' },
  medium: { label: 'Medium', variant: 'secondary' },
  high: { label: 'High', variant: 'default' },
  urgent: { label: 'Urgent', variant: 'destructive' },
};

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { tasksByStatus, isLoading, updateTaskStatus } = useTasks(projectId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      updateTaskStatus.mutate({ id: draggedTask.id, status });
    }
    setDraggedTask(null);
  };

  const handleAddTask = (status: TaskStatus) => {
    setSelectedTask(undefined);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {(Object.keys(statusConfig) as TaskStatus[]).map((status) => (
          <div
            key={status}
            className={cn(
              "flex-shrink-0 w-80 rounded-lg border-2 min-h-[500px]",
              statusConfig[status].color
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="p-3 border-b bg-background/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">
                  {statusConfig[status].label}
                  <span className="ml-2 text-muted-foreground">
                    ({tasksByStatus[status].length})
                  </span>
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleAddTask(status)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-2 space-y-2">
              {tasksByStatus[status].map((task) => (
                <Card
                  key={task.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow bg-background",
                    draggedTask?.id === task.id && "opacity-50"
                  )}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onClick={() => handleEditTask(task)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant={priorityConfig[task.priority].variant} className="text-xs">
                            {priorityConfig[task.priority].label}
                          </Badge>
                          {task.due_date && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(task.due_date), 'MMM d')}
                            </span>
                          )}
                          {task.estimated_hours && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {task.estimated_hours}h
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        defaultStatus={defaultStatus}
        projectId={projectId}
      />
    </>
  );
}
