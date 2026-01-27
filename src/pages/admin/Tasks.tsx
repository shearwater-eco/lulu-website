import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderKanban, Pencil, Trash2 } from 'lucide-react';
import { useProjects, Project } from '@/hooks/useProjects';
import { useClients } from '@/hooks/useClients';
import KanbanBoard from '@/components/tasks/KanbanBoard';
import TaskListView from '@/components/tasks/TaskListView';
import CalendarView from '@/components/tasks/CalendarView';
import GanttView from '@/components/tasks/GanttView';
import ProjectDialog from '@/components/projects/ProjectDialog';
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

export default function Tasks() {
  const { projects, isLoading, deleteProject } = useProjects();
  const { clients } = useClients();
  const [selectedProject, setSelectedProject] = useState<string | undefined>();
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleAddProject = () => {
    setEditingProject(undefined);
    setProjectDialogOpen(true);
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setProjectDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProject.mutate(projectToDelete.id);
      if (selectedProject === projectToDelete.id) {
        setSelectedProject(undefined);
      }
    }
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const getClientName = (clientId: string | null) => {
    if (!clientId) return null;
    const client = clients.find(c => c.id === clientId);
    return client?.name;
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    on_hold: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tasks & Projects</h1>
            <p className="text-muted-foreground">Manage your projects and tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Projects Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderKanban className="h-5 w-5" />
                  Projects
                </CardTitle>
                <Button size="icon" variant="ghost" onClick={handleAddProject}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  !selectedProject ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedProject(undefined)}
              >
                <p className="font-medium">All Tasks</p>
                <p className="text-sm opacity-70">View all tasks</p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                      selectedProject === project.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <p className="font-medium truncate">{project.name}</p>
                        </div>
                        {getClientName(project.client_id) && (
                          <p className="text-sm opacity-70 truncate">
                            {getClientName(project.client_id)}
                          </p>
                        )}
                        <Badge className={`mt-1 text-xs ${statusColors[project.status]}`}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={(e) => handleEditProject(e, project)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive"
                          onClick={(e) => handleDeleteClick(e, project)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Tasks Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="kanban" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="kanban">Kanban</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="gantt">Gantt</TabsTrigger>
                  </TabsList>

                  <TabsContent value="kanban">
                    <KanbanBoard projectId={selectedProject} />
                  </TabsContent>

                  <TabsContent value="list">
                    <TaskListView projectId={selectedProject} />
                  </TabsContent>

                  <TabsContent value="calendar">
                    <CalendarView projectId={selectedProject} />
                  </TabsContent>

                  <TabsContent value="gantt">
                    <GanttView projectId={selectedProject} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        project={editingProject}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{projectToDelete?.name}"? All tasks in this project will also be deleted.
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
    </AdminLayout>
  );
}
