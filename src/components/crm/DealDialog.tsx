import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Deal, Contact, Company, Pipeline, PipelineStage } from '@/hooks/useCRM';
import { format } from 'date-fns';

interface DealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal?: Deal | null;
  contacts: Contact[];
  companies: Company[];
  pipelines: Pipeline[];
  selectedPipelineId?: string;
  onSave: (data: Partial<Deal>) => void;
  isPending?: boolean;
}

export function DealDialog({
  open,
  onOpenChange,
  deal,
  contacts,
  companies,
  pipelines,
  selectedPipelineId,
  onSave,
  isPending,
}: DealDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    currency: 'GBP',
    pipeline_id: '',
    stage_id: '',
    contact_id: '',
    company_id: '',
    expected_close_date: '',
    notes: '',
  });

  const selectedPipeline = pipelines.find((p) => p.id === formData.pipeline_id);
  const stages = selectedPipeline?.stages || [];

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name || '',
        value: deal.value?.toString() || '',
        currency: deal.currency || 'GBP',
        pipeline_id: deal.pipeline_id || '',
        stage_id: deal.stage_id || '',
        contact_id: deal.contact_id || '',
        company_id: deal.company_id || '',
        expected_close_date: deal.expected_close_date || '',
        notes: deal.notes || '',
      });
    } else {
      const defaultPipeline = selectedPipelineId || pipelines.find((p) => p.is_default)?.id || pipelines[0]?.id || '';
      const defaultStage = pipelines.find((p) => p.id === defaultPipeline)?.stages?.[0]?.id || '';
      
      setFormData({
        name: '',
        value: '',
        currency: 'GBP',
        pipeline_id: defaultPipeline,
        stage_id: defaultStage,
        contact_id: '',
        company_id: '',
        expected_close_date: '',
        notes: '',
      });
    }
  }, [deal, open, pipelines, selectedPipelineId]);

  // Update stage when pipeline changes
  useEffect(() => {
    if (formData.pipeline_id && !deal) {
      const pipeline = pipelines.find((p) => p.id === formData.pipeline_id);
      const firstStage = pipeline?.stages?.[0]?.id || '';
      setFormData((prev) => ({ ...prev, stage_id: firstStage }));
    }
  }, [formData.pipeline_id, pipelines, deal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      value: parseFloat(formData.value) || 0,
      contact_id: formData.contact_id || null,
      company_id: formData.company_id || null,
      expected_close_date: formData.expected_close_date || null,
      id: deal?.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{deal ? 'Edit Deal' : 'Add Deal'}</DialogTitle>
          <DialogDescription>
            {deal ? 'Update deal details' : 'Create a new deal in your pipeline'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deal Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Annual contract renewal"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">£ GBP</SelectItem>
                    <SelectItem value="USD">$ USD</SelectItem>
                    <SelectItem value="EUR">€ EUR</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="0.00"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_close_date">Expected Close Date</Label>
              <Input
                id="expected_close_date"
                type="date"
                value={formData.expected_close_date}
                onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pipeline_id">Pipeline *</Label>
              <Select
                value={formData.pipeline_id}
                onValueChange={(value) => setFormData({ ...formData, pipeline_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pipeline" />
                </SelectTrigger>
                <SelectContent>
                  {pipelines.map((pipeline) => (
                    <SelectItem key={pipeline.id} value={pipeline.id}>
                      {pipeline.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage_id">Stage *</Label>
              <Select
                value={formData.stage_id}
                onValueChange={(value) => setFormData({ ...formData, stage_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_id">Contact</Label>
              <Select
                value={formData.contact_id}
                onValueChange={(value) => setFormData({ ...formData, contact_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.first_name} {contact.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_id">Company</Label>
              <Select
                value={formData.company_id}
                onValueChange={(value) => setFormData({ ...formData, company_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
