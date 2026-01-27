import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreVertical, Edit, Trash2, Building2, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Deal, PipelineStage, useDeals, usePipelines, useContacts, useCompanies } from '@/hooks/useCRM';
import { DealDialog } from './DealDialog';
import { cn } from '@/lib/utils';

interface DealsPipelineProps {
  pipelineId: string;
}

export function DealsPipeline({ pipelineId }: DealsPipelineProps) {
  const { deals, isLoading, createDeal, updateDeal, deleteDeal, moveDeal } = useDeals(pipelineId);
  const { pipelines } = usePipelines();
  const { contacts } = useContacts();
  const { companies } = useCompanies();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const pipeline = pipelines.find((p) => p.id === pipelineId);
  const stages = pipeline?.stages || [];

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage_id === stageId);
  };

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.stage_id !== stageId) {
      moveDeal.mutate({
        dealId: draggedDeal.id,
        stageId,
        position: getDealsByStage(stageId).length,
      });
    }
    setDraggedDeal(null);
  };

  const handleSaveDeal = (data: Partial<Deal>) => {
    if (data.id) {
      updateDeal.mutate(data as Deal & { id: string }, {
        onSuccess: () => setDialogOpen(false),
      });
    } else {
      createDeal.mutate(data, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const openEditDialog = (deal: Deal) => {
    setEditingDeal(deal);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingDeal(null);
    setDialogOpen(true);
  };

  const formatCurrency = (value: number, currency: string) => {
    const symbols: Record<string, string> = { GBP: '£', USD: '$', EUR: '€' };
    return `${symbols[currency] || currency}${value.toLocaleString()}`;
  };

  const calculateStageTotal = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + (deal.value || 0), 0);
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading pipeline...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{pipeline?.name}</h2>
          <p className="text-sm text-muted-foreground">{pipeline?.description}</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageTotal = calculateStageTotal(stage.id);

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {stageDeals.length}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    £{stageTotal.toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <Card
                      key={deal.id}
                      className={cn(
                        'cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md',
                        draggedDeal?.id === deal.id && 'opacity-50'
                      )}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm line-clamp-2">{deal.name}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(deal)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (confirm('Delete this deal?')) {
                                    deleteDeal.mutate(deal.id);
                                  }
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <p className="text-lg font-semibold">
                          {formatCurrency(deal.value, deal.currency)}
                        </p>

                        {(deal.company || deal.contact) && (
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            {deal.company && (
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {deal.company.name}
                              </div>
                            )}
                            {deal.contact && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {deal.contact.first_name} {deal.contact.last_name}
                              </div>
                            )}
                          </div>
                        )}

                        {deal.expected_close_date && (
                          <p className="text-xs text-muted-foreground">
                            Close: {new Date(deal.expected_close_date).toLocaleDateString()}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {stageDeals.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No deals in this stage
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <DealDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        deal={editingDeal}
        contacts={contacts}
        companies={companies}
        pipelines={pipelines}
        selectedPipelineId={pipelineId}
        onSave={handleSaveDeal}
        isPending={createDeal.isPending || updateDeal.isPending}
      />
    </div>
  );
}
