import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Mail,
  Phone,
} from 'lucide-react';
import { useCompanies, useContacts, usePipelines, useDeals } from '@/hooks/useCRM';
import { CompanyDialog } from '@/components/crm/CompanyDialog';
import { ContactDialog } from '@/components/crm/ContactDialog';
import { DealsPipeline } from '@/components/crm/DealsPipeline';
import { format } from 'date-fns';

export default function AdminCRM() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [search, setSearch] = useState('');
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('');
  
  const { companies, isLoading: companiesLoading, createCompany, updateCompany, deleteCompany } = useCompanies();
  const { contacts, isLoading: contactsLoading, createContact, updateContact, deleteContact } = useContacts();
  const { pipelines, isLoading: pipelinesLoading } = usePipelines();
  const { deals } = useDeals();

  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);

  // Set default pipeline
  if (!selectedPipelineId && pipelines.length > 0) {
    const defaultPipeline = pipelines.find((p) => p.is_default) || pipelines[0];
    setSelectedPipelineId(defaultPipeline.id);
  }

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredContacts = contacts.filter(
    (c) =>
      c.first_name.toLowerCase().includes(search.toLowerCase()) ||
      c.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveCompany = (data: any) => {
    if (data.id) {
      updateCompany.mutate(data, { onSuccess: () => setCompanyDialogOpen(false) });
    } else {
      createCompany.mutate(data, { onSuccess: () => setCompanyDialogOpen(false) });
    }
  };

  const handleSaveContact = (data: any) => {
    if (data.id) {
      updateContact.mutate(data, { onSuccess: () => setContactDialogOpen(false) });
    } else {
      createContact.mutate(data, { onSuccess: () => setContactDialogOpen(false) });
    }
  };

  // Stats calculations
  const totalPipelineValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  const openDeals = deals.filter((d) => !d.stage?.is_won && !d.stage?.is_lost).length;
  const wonDeals = deals.filter((d) => d.stage?.is_won).length;

  const getLeadStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      unqualified: 'bg-red-100 text-red-800',
      nurturing: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">CRM & Sales</h1>
            <p className="text-muted-foreground">
              Manage contacts, companies, and sales pipelines
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Companies</p>
            </div>
            <p className="text-2xl font-bold">{companies.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Contacts</p>
            </div>
            <p className="text-2xl font-bold">{contacts.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Open Deals</p>
            </div>
            <p className="text-2xl font-bold">{openDeals}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Pipeline Value</p>
            </div>
            <p className="text-2xl font-bold">£{totalPipelineValue.toLocaleString()}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-4">
            <div className="flex items-center gap-4">
              <Select value={selectedPipelineId} onValueChange={setSelectedPipelineId}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select pipeline" />
                </SelectTrigger>
                <SelectContent>
                  {pipelines.map((pipeline) => (
                    <SelectItem key={pipeline.id} value={pipeline.id}>
                      {pipeline.name} ({pipeline.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPipelineId && <DealsPipeline pipelineId={selectedPipelineId} />}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setEditingContact(null);
                  setContactDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Lead Status</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No contacts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {contact.first_name} {contact.last_name}
                            </p>
                            {contact.job_title && (
                              <p className="text-sm text-muted-foreground">{contact.job_title}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            {contact.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {contact.email}
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {contact.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{contact.company?.name || '-'}</TableCell>
                        <TableCell>
                          <Badge className={getLeadStatusColor(contact.lead_status)}>
                            {contact.lead_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${Math.min(contact.lead_score, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm">{contact.lead_score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(contact.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingContact(contact);
                                setContactDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm('Delete this contact?')) {
                                  deleteContact.mutate(contact.id);
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

          <TabsContent value="companies" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setEditingCompany(null);
                  setCompanyDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Company
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companiesLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredCompanies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No companies found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{company.name}</p>
                            {company.website && (
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {company.website}
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            {company.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {company.email}
                              </div>
                            )}
                            {company.phone && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {company.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{company.industry || '-'}</TableCell>
                        <TableCell>
                          {company.city && company.country
                            ? `${company.city}, ${company.country}`
                            : company.city || company.country || '-'}
                        </TableCell>
                        <TableCell>
                          {company.annual_revenue
                            ? `£${company.annual_revenue.toLocaleString()}`
                            : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingCompany(company);
                                setCompanyDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm('Delete this company?')) {
                                  deleteCompany.mutate(company.id);
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
        </Tabs>

        <CompanyDialog
          open={companyDialogOpen}
          onOpenChange={setCompanyDialogOpen}
          company={editingCompany}
          onSave={handleSaveCompany}
          isPending={createCompany.isPending || updateCompany.isPending}
        />

        <ContactDialog
          open={contactDialogOpen}
          onOpenChange={setContactDialogOpen}
          contact={editingContact}
          companies={companies}
          onSave={handleSaveContact}
          isPending={createContact.isPending || updateContact.isPending}
        />
      </div>
    </AdminLayout>
  );
}
