import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, DollarSign } from 'lucide-react';
import TimeTracker from '@/components/time/TimeTracker';
import Timesheet from '@/components/time/Timesheet';
import { useTimeEntries } from '@/hooks/useTimeEntries';
import { useAuth } from '@/hooks/useAuth';

export default function TimeTracking() {
  const { user } = useAuth();
  const { totalMinutes, billableMinutes, totalBillable } = useTimeEntries(undefined, user?.id);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">Track time and manage timesheets</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Total Hours (All Time)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatDuration(totalMinutes)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Billable Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatDuration(billableMinutes)}</p>
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
              <p className="text-2xl font-bold">${totalBillable.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {totalMinutes > 0 ? Math.round((billableMinutes / totalMinutes) * 100) : 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <div className="lg:col-span-1">
            <TimeTracker />
          </div>

          {/* Timesheet */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Timesheet</CardTitle>
              </CardHeader>
              <CardContent>
                <Timesheet />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
