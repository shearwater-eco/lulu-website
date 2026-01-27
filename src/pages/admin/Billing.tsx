import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CreditCard,
  FileText,
  Tag,
  Users,
  TrendingUp,
  Receipt,
  Ticket,
  Send,
  CheckCircle,
} from 'lucide-react';
import {
  useSubscriptionPlans,
  usePromoCodes,
  useSubscriptions,
  useInvoices,
  useSupportTickets,
  SubscriptionPlan,
  PromoCode,
  Subscription,
  Invoice,
  SupportTicket,
} from '@/hooks/useBilling';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';

export default function AdminBilling() {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [search, setSearch] = useState('');

  // Hooks
  const { plans, isLoading: plansLoading, createPlan, updatePlan, deletePlan } = useSubscriptionPlans();
  const { promoCodes, isLoading: promosLoading, createPromoCode, updatePromoCode, deletePromoCode } = usePromoCodes();
  const { subscriptions, isLoading: subsLoading, createSubscription, updateSubscription } = useSubscriptions();
  const { invoices, isLoading: invoicesLoading, createInvoice, updateInvoice } = useInvoices();
  const { tickets, isLoading: ticketsLoading, createTicket, updateTicket, addMessage } = useSupportTickets();

  // Dialog states
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Plan form state
  const [planForm, setPlanForm] = useState({
    name: '',
    description: '',
    type: 'recurring',
    billing_period: 'monthly',
    price: '',
    features: '',
    trial_days: '0',
    is_active: true,
    is_public: true,
  });

  // Promo form state
  const [promoForm, setPromoForm] = useState({
    code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: '',
    min_order_value: '0',
    max_uses: '',
    valid_until: '',
    is_active: true,
  });

  // Stats
  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length;
  const totalMRR = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + (s.plan?.price || 0), 0);
  const pendingInvoices = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').length;
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;

  // Handlers
  const openPlanDialog = (plan?: SubscriptionPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setPlanForm({
        name: plan.name,
        description: plan.description || '',
        type: plan.type,
        billing_period: plan.billing_period,
        price: plan.price.toString(),
        features: (plan.features || []).join('\n'),
        trial_days: plan.trial_days.toString(),
        is_active: plan.is_active,
        is_public: plan.is_public,
      });
    } else {
      setEditingPlan(null);
      setPlanForm({
        name: '',
        description: '',
        type: 'recurring',
        billing_period: 'monthly',
        price: '',
        features: '',
        trial_days: '0',
        is_active: true,
        is_public: true,
      });
    }
    setPlanDialogOpen(true);
  };

  const savePlan = () => {
    const data = {
      name: planForm.name,
      description: planForm.description || null,
      type: planForm.type,
      billing_period: planForm.billing_period,
      price: parseFloat(planForm.price) || 0,
      features: planForm.features.split('\n').filter((f) => f.trim()),
      trial_days: parseInt(planForm.trial_days) || 0,
      is_active: planForm.is_active,
      is_public: planForm.is_public,
    };

    if (editingPlan) {
      updatePlan.mutate({ id: editingPlan.id, ...data }, { onSuccess: () => setPlanDialogOpen(false) });
    } else {
      createPlan.mutate(data, { onSuccess: () => setPlanDialogOpen(false) });
    }
  };

  const openPromoDialog = (promo?: PromoCode) => {
    if (promo) {
      setEditingPromo(promo);
      setPromoForm({
        code: promo.code,
        description: promo.description || '',
        discount_type: promo.discount_type,
        discount_value: promo.discount_value.toString(),
        min_order_value: promo.min_order_value.toString(),
        max_uses: promo.max_uses?.toString() || '',
        valid_until: promo.valid_until ? promo.valid_until.split('T')[0] : '',
        is_active: promo.is_active,
      });
    } else {
      setEditingPromo(null);
      setPromoForm({
        code: '',
        description: '',
        discount_type: 'percentage',
        discount_value: '',
        min_order_value: '0',
        max_uses: '',
        valid_until: '',
        is_active: true,
      });
    }
    setPromoDialogOpen(true);
  };

  const savePromo = () => {
    const data = {
      code: promoForm.code.toUpperCase(),
      description: promoForm.description || null,
      discount_type: promoForm.discount_type,
      discount_value: parseFloat(promoForm.discount_value) || 0,
      min_order_value: parseFloat(promoForm.min_order_value) || 0,
      max_uses: promoForm.max_uses ? parseInt(promoForm.max_uses) : null,
      valid_until: promoForm.valid_until || null,
      is_active: promoForm.is_active,
    };

    if (editingPromo) {
      updatePromoCode.mutate({ id: editingPromo.id, ...data }, { onSuccess: () => setPromoDialogOpen(false) });
    } else {
      createPromoCode.mutate(data, { onSuccess: () => setPromoDialogOpen(false) });
    }
  };

  const handleSendMessage = () => {
    if (selectedTicket && newMessage.trim()) {
      addMessage.mutate(
        { ticketId: selectedTicket.id, message: newMessage },
        { onSuccess: () => setNewMessage('') }
      );
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
      trial: 'bg-purple-100 text-purple-800',
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">Manage plans, subscriptions, invoices, and support</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{activeSubscriptions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">£{totalMRR.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Pending Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingInvoices}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Open Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{openTickets}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="promos">Promo Codes</TabsTrigger>
            <TabsTrigger value="tickets">Support</TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subscriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : subscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No subscriptions yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          {sub.customer?.first_name} {sub.customer?.last_name}
                          <br />
                          <span className="text-sm text-muted-foreground">{sub.customer?.email}</span>
                        </TableCell>
                        <TableCell>{sub.plan?.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {sub.current_period_start && sub.current_period_end && (
                            <>
                              {format(new Date(sub.current_period_start), 'MMM d')} -{' '}
                              {format(new Date(sub.current_period_end), 'MMM d, yyyy')}
                            </>
                          )}
                        </TableCell>
                        <TableCell>£{sub.plan?.price?.toFixed(2)}/{sub.plan?.billing_period}</TableCell>
                        <TableCell>
                          <Badge variant={sub.auto_renew ? 'default' : 'secondary'}>
                            {sub.auto_renew ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openPlanDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Plan
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {plansLoading ? (
                <p>Loading...</p>
              ) : plans.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center py-8">
                  No plans created yet
                </p>
              ) : (
                plans.map((plan) => (
                  <Card key={plan.id} className={!plan.is_active ? 'opacity-60' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.type} • {plan.billing_period}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openPlanDialog(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Delete this plan?')) {
                                deletePlan.mutate(plan.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-3xl font-bold">
                        £{plan.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{plan.billing_period}
                        </span>
                      </p>
                      {plan.description && (
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      )}
                      {plan.features && plan.features.length > 0 && (
                        <ul className="space-y-1 text-sm">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        {!plan.is_active && <Badge variant="secondary">Inactive</Badge>}
                        {!plan.is_public && <Badge variant="outline">Hidden</Badge>}
                        {plan.trial_days > 0 && <Badge>{plan.trial_days} day trial</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : invoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No invoices yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                        <TableCell>
                          {invoice.customer?.first_name} {invoice.customer?.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(invoice.issue_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(new Date(invoice.due_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>£{invoice.total_amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            {invoice.status === 'draft' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateInvoice.mutate({ id: invoice.id, status: 'sent' })
                                }
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                            {invoice.status === 'sent' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateInvoice.mutate({
                                    id: invoice.id,
                                    status: 'paid',
                                    paid_date: new Date().toISOString().split('T')[0],
                                  })
                                }
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Promo Codes Tab */}
          <TabsContent value="promos" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openPromoDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Promo Code
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promosLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : promoCodes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No promo codes yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    promoCodes.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell className="font-mono font-bold">{promo.code}</TableCell>
                        <TableCell>
                          {promo.discount_type === 'percentage'
                            ? `${promo.discount_value}%`
                            : `£${promo.discount_value}`}
                        </TableCell>
                        <TableCell>
                          {promo.uses_count} / {promo.max_uses ?? '∞'}
                        </TableCell>
                        <TableCell>
                          {promo.valid_until
                            ? format(new Date(promo.valid_until), 'MMM d, yyyy')
                            : 'No expiry'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={promo.is_active ? 'default' : 'secondary'}>
                            {promo.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openPromoDialog(promo)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm('Delete this promo code?')) {
                                  deletePromoCode.mutate(promo.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : tickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No support tickets yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono">{ticket.ticket_number}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          {ticket.customer?.first_name} {ticket.customer?.last_name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ticket.priority === 'urgent'
                                ? 'destructive'
                                : ticket.priority === 'high'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(ticket.created_at), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setTicketDetailOpen(true);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Plan Dialog */}
        <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingPlan ? 'Edit Plan' : 'Create Plan'}</DialogTitle>
              <DialogDescription>Configure subscription plan details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input
                  value={planForm.name}
                  onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={planForm.type}
                    onValueChange={(v) => setPlanForm({ ...planForm, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recurring">Recurring</SelectItem>
                      <SelectItem value="one_time">One-time</SelectItem>
                      <SelectItem value="usage_based">Usage-based</SelectItem>
                      <SelectItem value="product_box">Product Box</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Billing Period</Label>
                  <Select
                    value={planForm.billing_period}
                    onValueChange={(v) => setPlanForm({ ...planForm, billing_period: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Price (£)</Label>
                  <Input
                    type="number"
                    value={planForm.price}
                    onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Trial Days</Label>
                  <Input
                    type="number"
                    value={planForm.trial_days}
                    onChange={(e) => setPlanForm({ ...planForm, trial_days: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={planForm.description}
                  onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={planForm.features}
                  onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
                  rows={4}
                  placeholder="Unlimited access&#10;Priority support&#10;Custom branding"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={planForm.is_active}
                    onCheckedChange={(v) => setPlanForm({ ...planForm, is_active: v })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={planForm.is_public}
                    onCheckedChange={(v) => setPlanForm({ ...planForm, is_public: v })}
                  />
                  <Label>Public</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={savePlan} disabled={createPlan.isPending || updatePlan.isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Promo Code Dialog */}
        <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPromo ? 'Edit Promo Code' : 'Create Promo Code'}</DialogTitle>
              <DialogDescription>Configure discount code details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                  placeholder="SUMMER20"
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select
                    value={promoForm.discount_type}
                    onValueChange={(v) => setPromoForm({ ...promoForm, discount_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    value={promoForm.discount_value}
                    onChange={(e) => setPromoForm({ ...promoForm, discount_value: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Min Order Value (£)</Label>
                  <Input
                    type="number"
                    value={promoForm.min_order_value}
                    onChange={(e) => setPromoForm({ ...promoForm, min_order_value: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Uses</Label>
                  <Input
                    type="number"
                    value={promoForm.max_uses}
                    onChange={(e) => setPromoForm({ ...promoForm, max_uses: e.target.value })}
                    placeholder="Unlimited"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Valid Until</Label>
                <Input
                  type="date"
                  value={promoForm.valid_until}
                  onChange={(e) => setPromoForm({ ...promoForm, valid_until: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={promoForm.is_active}
                  onCheckedChange={(v) => setPromoForm({ ...promoForm, is_active: v })}
                />
                <Label>Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPromoDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={savePromo} disabled={createPromoCode.isPending || updatePromoCode.isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Ticket Detail Dialog */}
        <Dialog open={ticketDetailOpen} onOpenChange={setTicketDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ticket {selectedTicket?.ticket_number}</DialogTitle>
              <DialogDescription>{selectedTicket?.subject}</DialogDescription>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select
                    value={selectedTicket.status}
                    onValueChange={(v) =>
                      updateTicket.mutate({ id: selectedTicket.id, status: v })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="waiting_on_customer">Waiting on Customer</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedTicket.priority}
                    onValueChange={(v) =>
                      updateTicket.mutate({ id: selectedTicket.id, priority: v })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTicket.description && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{selectedTicket.description}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-medium">Messages</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedTicket.messages?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-lg ${
                          msg.sender_type === 'staff'
                            ? 'bg-primary/10 ml-8'
                            : 'bg-muted mr-8'
                        } ${msg.is_internal ? 'border-2 border-yellow-400' : ''}`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {msg.sender_type} • {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                          {msg.is_internal && ' • Internal note'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your response..."
                      rows={2}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={addMessage.isPending}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
