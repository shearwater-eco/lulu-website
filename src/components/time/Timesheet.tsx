import { useState } from 'react';
import { useTimeEntries, TimeEntry } from '@/hooks/useTimeEntries';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Clock, DollarSign, Calendar } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import TimeEntryDialog from './TimeEntryDialog';
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

type DateRange = 'today' | 'week' | 'month' | 'all';

export default function Timesheet() {
  const { user } = useAuth();
  const { timeEntries, isLoading, totalMinutes, billableMinutes, totalBillable, deleteTimeEntry } = useTimeEntries(undefined, user?.id);
  const { projects } = useProjects();
  const { tasks } = useTasks();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<TimeEntry | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>('week');
  const [projectFilter, setProjectFilter] = useState<string>('all');

  // Filter entries by date range
  const filteredEntries = timeEntries.filter((entry) => {
    const entryDate = parseISO(entry.start_time);
    const now = new Date();

    // Date range filter
    let inRange = true;
    if (dateRange === 'today') {
      inRange = format(entryDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
    } else if (dateRange === 'week') {
      inRange = isWithinInterval(entryDate, { start: startOfWeek(now), end: endOfWeek(now) });
    } else if (dateRange === 'month') {
      inRange = isWithinInterval(entryDate, { start: startOfMonth(now), end: endOfMonth(now) });
    }

    // Project filter
    const matchesProject = projectFilter === 'all' || entry.project_id === projectFilter;

    return inRange && matchesProject;
  });

  // Calculate filtered totals
  const filteredTotalMinutes = filteredEntries.reduce((acc, e) => acc + (e.duration_minutes || 0), 0);
  const filteredBillableMinutes = filteredEntries.filter(e => e.billable).reduce((acc, e) => acc + (e.duration_minutes || 0), 0);
  const filteredTotalBillable = filteredEntries.filter(e => e.billable && e.hourly_rate).reduce((acc, e) => acc + ((e.duration_minutes || 0) / 60) * (e.hourly_rate || 0), 0);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return '-';
    const project = projects.find(p => p.id === projectId);
    return project?.name || '-';
  };

  const getTaskName = (taskId: string | null) => {
    if (!taskId) return '-';
    const task = tasks.find(t => t.id === taskId);
    return task?.title || '-';
  };

  const handleAddEntry = () => {
    setSelectedEntry(undefined);
    setDialogOpen(true);
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setSelectedEntry(entry);
    setDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, entry: TimeEntry) => {
    e.stopPropagation();
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (entryToDelete) {
      deleteTimeEntry.mutate(entryToDelete.id);
    }
    setDeleteDialogOpen(false);
    setEntryToDelete(null);
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
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Total Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatDuration(filteredTotalMinutes)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Billable Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatDuration(filteredBillableMinutes)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Billable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${filteredTotalBillable.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Period:</Label>
            <Select value={dateRange} onValueChange={(value) => setDateRange(value as DateRange)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label>Project:</Label>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1" />

          <Button onClick={handleAddEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Time Entries Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No time entries for this period.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleEditEntry(entry)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(parseISO(entry.start_time), 'MMM d, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-xs truncate">{entry.description || '-'}</p>
                    </TableCell>
                    <TableCell>{getProjectName(entry.project_id)}</TableCell>
                    <TableCell>{getTaskName(entry.task_id)}</TableCell>
                    <TableCell>{formatDuration(entry.duration_minutes || 0)}</TableCell>
                    <TableCell>
                      {entry.billable && entry.hourly_rate ? (
                        <span>${entry.hourly_rate}/hr</span>
                      ) : (
                        <Badge variant="outline">Non-billable</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {entry.billable && entry.hourly_rate ? (
                        <span className="font-medium">
                          ${(((entry.duration_minutes || 0) / 60) * entry.hourly_rate).toFixed(2)}
                        </span>
                      ) : (
                        '-'
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
                            handleEditEntry(entry);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => handleDeleteClick(e, entry)}
                          disabled={entry.invoiced}
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

      <TimeEntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={selectedEntry}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Time Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this time entry? This action cannot be undone.
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
