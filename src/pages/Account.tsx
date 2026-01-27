import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  FileText,
  HelpCircle,
  Package,
  Plus,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import {
  useCustomerProfile,
  useCustomerSubscriptions,
  useCustomerInvoices,
  useCustomerTickets,
  useTicketMessages,
  useCreateTicket,
  useAddTicketMessage,
} from '@/hooks/useCustomerPortal';
import { format } from 'date-fns';

export default function Account() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { data: customer, isLoading: customerLoading } = useCustomerProfile();
  const { data: subscriptions = [], isLoading: subsLoading } = useCustomerSubscriptions();
  const { data: invoices = [], isLoading: invoicesLoading } = useCustomerInvoices();
  const { data: tickets = [], isLoading: ticketsLoading } = useCustomerTickets();

  // Dialog states
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isTicketViewOpen, setIsTicketViewOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Form states
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [newMessage, setNewMessage] = useState('');

  // Queries & Mutations
  const { data: messages = [] } = useTicketMessages(selectedTicketId);
  const createTicket = useCreateTicket();
  const addMessage = useAddTicketMessage();

  // Redirect if not logged in
  if (!authLoading && !user) {
    navigate('/auth');
    return null;
  }

  const isLoading = authLoading || customerLoading;

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      active: { variant: 'default', icon: CheckCircle },
      trial: { variant: 'outline', icon: Clock },
      cancelled: { variant: 'destructive', icon: XCircle },
      paused: { variant: 'secondary', icon: AlertCircle },
      pending: { variant: 'secondary', icon: Clock },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'secondary' as const, icon: Clock };
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getTicketStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      open: { variant: 'default' },
      'in-progress': { variant: 'outline' },
      resolved: { variant: 'secondary' },
      closed: { variant: 'secondary' },
    };
    const { variant } = config[status] || { variant: 'secondary' as const };
    return <Badge variant={variant}>{status}</Badge>;
  };

  const handleCreateTicket = () => {
    if (!ticketSubject.trim()) return;
    createTicket.mutate(
      {
        subject: ticketSubject,
        description: ticketDescription,
        category: ticketCategory || undefined,
        priority: ticketPriority,
      },
      {
        onSuccess: () => {
          setIsNewTicketOpen(false);
          setTicketSubject('');
          setTicketDescription('');
          setTicketCategory('');
          setTicketPriority('medium');
        },
      }
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicketId) return;
    addMessage.mutate(
      { ticketId: selectedTicketId, message: newMessage },
      {
        onSuccess: () => setNewMessage(''),
      }
    );
  };

  const openTicketView = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsTicketViewOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container max-w-4xl py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              No Account Found
            </CardTitle>
            <CardDescription>
              We couldn't find a customer account linked to your login. Please contact support if you believe this is an error.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/contact')}>Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-muted-foreground">
          Welcome back, {customer.first_name || customer.email}
        </p>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Subscriptions</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Subscriptions</CardTitle>
              <CardDescription>Manage your active subscriptions and plans</CardDescription>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You don't have any active subscriptions</p>
                  <Button className="mt-4" onClick={() => navigate('/shop')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((sub: any) => (
                    <Card key={sub.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{sub.plan?.name}</h3>
                              {getStatusBadge(sub.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {sub.plan?.description}
                            </p>
                            {sub.current_period_end && (
                              <p className="text-sm">
                                {sub.auto_renew ? 'Renews' : 'Expires'} on{' '}
                                {format(new Date(sub.current_period_end), 'MMM d, yyyy')}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">
                              £{Number(sub.plan?.price || 0).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              /{sub.plan?.billing_period || 'month'}
                            </p>
                          </div>
                        </div>

                        {sub.addons && sub.addons.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium mb-2">Add-ons:</p>
                            <div className="flex flex-wrap gap-2">
                              {sub.addons.map((addon: any) => (
                                <Badge key={addon.id} variant="outline">
                                  {addon.addon?.name} (+£{Number(addon.addon?.price || 0).toFixed(2)})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {invoicesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No invoices yet</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice: any) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                          <TableCell>
                            {format(new Date(invoice.issue_date), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>£{Number(invoice.total_amount || 0).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                invoice.status === 'paid'
                                  ? 'default'
                                  : invoice.status === 'overdue'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Get help from our team</CardDescription>
              </div>
              <Button onClick={() => setIsNewTicketOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </CardHeader>
            <CardContent>
              {ticketsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No support tickets</p>
                  <Button className="mt-4" onClick={() => setIsNewTicketOpen(true)}>
                    Create Your First Ticket
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket: any) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.ticket_number}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{getTicketStatusBadge(ticket.status)}</TableCell>
                          <TableCell>
                            {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openTicketView(ticket.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Ticket Dialog */}
      <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>Describe your issue and we'll get back to you</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="product">Product Issue</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={ticketPriority} onValueChange={setTicketPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Please describe your issue in detail..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTicket} disabled={!ticketSubject.trim() || createTicket.isPending}>
              {createTicket.isPending ? 'Creating...' : 'Create Ticket'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket View Dialog */}
      <Dialog open={isTicketViewOpen} onOpenChange={setIsTicketViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Ticket: {tickets.find((t: any) => t.id === selectedTicketId)?.ticket_number}
            </DialogTitle>
            <DialogDescription>
              {tickets.find((t: any) => t.id === selectedTicketId)?.subject}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 min-h-[300px] max-h-[400px] border rounded-lg p-4">
            <div className="space-y-4">
              {/* Original ticket description */}
              {selectedTicketId && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Original Description:</p>
                  <p className="text-sm">
                    {tickets.find((t: any) => t.id === selectedTicketId)?.description || 'No description provided'}
                  </p>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`rounded-lg p-3 ${
                    msg.sender_id === user?.id ? 'bg-primary/10 ml-8' : 'bg-muted mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium">
                      {msg.sender_id === user?.id ? 'You' : 'Support Team'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}

              {messages.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No messages yet</p>
              )}
            </div>
          </ScrollArea>

          {/* Reply form */}
          <div className="flex gap-2 pt-4 border-t">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || addMessage.isPending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
