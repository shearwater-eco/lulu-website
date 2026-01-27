import { useState } from 'react';
import { Task, TaskStatus, TaskPriority, useTasks } from '@/hooks/useTasks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import TaskDialog from './TaskDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TaskListViewProps {
  projectId?: string;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: 'To Do', color: 'bg-slate-100 text-slate-700' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  review: { label: 'Review', color: 'bg-amber-100 text-amber-700' },
  done: { label: 'Done', color: 'bg-green-100 text-green-700' },
};

const priorityConfig: Record<TaskPriority, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  low: { label: 'Low', variant: 'outline' },
  medium: { label: 'Medium', variant: 'secondary' },
  high: { label: 'High', variant: 'default' },
  urgent: { label: 'Urgent', variant: 'destructive' },
};

export default function TaskListView({ projectId }: TaskListViewProps) {
  const { tasks, isLoading, updateTaskStatus, deleteTask } = useTasks(projectId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete.id);
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleToggleComplete = (task: Task) => {
    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    updateTaskStatus.mutate({ id: task.id, status: newStatus });
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
        <div className="flex justify-end">
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Est. Hours</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No tasks yet. Click "Add Task" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleEditTask(task)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={task.status === 'done'}
                        onCheckedChange={() => handleToggleComplete(task)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className={task.status === 'done' ? 'line-through text-muted-foreground' : 'font-medium'}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-muted-foreground truncate max-w-md">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[task.status].color}>
                        {statusConfig[task.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityConfig[task.priority].variant}>
                        {priorityConfig[task.priority].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.due_date ? (
                        <span className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(task.due_date), 'MMM d, yyyy')}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {task.estimated_hours ? (
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          {task.estimated_hours}h
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTask(task);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => handleDeleteClick(e, task)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        projectId={projectId}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
