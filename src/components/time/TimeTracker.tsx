import { useState } from 'react';
import { useTimer, useTimeEntries, TimeEntry } from '@/hooks/useTimeEntries';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import { Play, Square, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TimeTracker() {
  const { isRunning, activeEntry, formatElapsedTime, startTimer, stopTimer } = useTimer();
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const [projectId, setProjectId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [billable, setBillable] = useState(true);

  // Filter tasks by selected project
  const projectTasks = projectId
    ? tasks.filter(t => t.project_id === projectId)
    : tasks;

  const handleStart = () => {
    startTimer({
      projectId: projectId || undefined,
      taskId: taskId || undefined,
      description: description || undefined,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
      billable,
    });
  };

  const handleStop = () => {
    stopTimer();
    // Reset form
    setDescription('');
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      isRunning && "ring-2 ring-primary"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracker
          </CardTitle>
          {isRunning && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Recording</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer Display */}
        <div className="text-center py-4 bg-muted rounded-lg">
          <span className="text-4xl font-mono font-bold">
            {formatElapsedTime()}
          </span>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <Button size="lg" onClick={handleStart} className="gap-2">
              <Play className="h-5 w-5" />
              Start Timer
            </Button>
          ) : (
            <Button size="lg" variant="destructive" onClick={handleStop} className="gap-2">
              <Square className="h-5 w-5" />
              Stop Timer
            </Button>
          )}
        </div>

        {/* Options (only show when not running) */}
        {!isRunning && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="What are you working on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project</Label>
                <Select value={projectId} onValueChange={(value) => {
                  setProjectId(value);
                  setTaskId('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Project</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Task</Label>
                <Select value={taskId} onValueChange={setTaskId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Task</SelectItem>
                    {projectTasks.map((task) => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hourly Rate</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Billable</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    checked={billable}
                    onCheckedChange={setBillable}
                  />
                  <span className="text-sm text-muted-foreground">
                    {billable ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Entry Info */}
        {isRunning && activeEntry && (
          <div className="pt-4 border-t space-y-2 text-sm">
            {activeEntry.description && (
              <p><span className="text-muted-foreground">Working on:</span> {activeEntry.description}</p>
            )}
            {activeEntry.billable && activeEntry.hourly_rate && (
              <p className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-muted-foreground">Rate:</span> ${activeEntry.hourly_rate}/hr
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
