import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  Plus,
  Eye,
  Truck,
  FileText,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import {
  usePurchaseOrders,
  usePurchaseOrder,
  useCreatePurchaseOrder,
  useUpdatePurchaseOrderStatus,
  useReceivePurchaseOrder,
} from '@/hooks/useInventory';
import { format } from 'date-fns';

export default function AdminPurchaseOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false);
  const [selectedPOId, setSelectedPOId] = useState<string | null>(null);

  // Form state
  const [supplierId, setSupplierId] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [poItems, setPoItems] = useState<
    Array<{
      product_id: string;
      product_name: string;
      product_sku: string;
      quantity: number;
      unit_cost: number;
    }>
  >([]);
  const [receiveQuantities, setReceiveQuantities] = useState<Record<string, number>>({});

  // Queries
  const { data: purchaseOrders = [], isLoading } = usePurchaseOrders();
  const { data: selectedPO } = usePurchaseOrder(selectedPOId);

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers-active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products-for-po'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, sku, cost_price')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Mutations
  const createPO = useCreatePurchaseOrder();
  const updateStatus = useUpdatePurchaseOrderStatus();
  const receivePO = useReceivePurchaseOrder();

  const filteredPOs = purchaseOrders.filter((po: any) => {
    const matchesSearch =
      po.order_number?.toLowerCase().includes(search.toLowerCase()) ||
      po.supplier?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      draft: { variant: 'secondary', icon: FileText },
      sent: { variant: 'outline', icon: Send },
      confirmed: { variant: 'default', icon: CheckCircle },
      shipped: { variant: 'default', icon: Truck },
      received: { variant: 'default', icon: Package },
      cancelled: { variant: 'destructive', icon: XCircle },
    };
    const { variant, icon: Icon } = config[status] || { variant: 'secondary' as const, icon: Clock };
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleAddItem = () => {
    setPoItems([...poItems, { product_id: '', product_name: '', product_sku: '', quantity: 1, unit_cost: 0 }]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...poItems];
    if (field === 'product_id') {
      const product = products.find((p: any) => p.id === value);
      if (product) {
        updated[index] = {
          ...updated[index],
          product_id: value,
          product_name: product.name,
          product_sku: product.sku,
          unit_cost: product.cost_price,
        };
      }
    } else {
      (updated[index] as any)[field] = value;
    }
    setPoItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setPoItems(poItems.filter((_, i) => i !== index));
  };

  const handleCreatePO = () => {
    if (!supplierId || poItems.length === 0) return;
    createPO.mutate(
      {
        supplier_id: supplierId,
        expected_delivery_date: expectedDeliveryDate || undefined,
        notes: notes || undefined,
        items: poItems.filter((item) => item.product_id),
      },
      {
        onSuccess: () => {
          setIsCreateDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  const handleReceive = () => {
    if (!selectedPO) return;
    const items = (selectedPO.items || []).map((item: any) => ({
      id: item.id,
      quantityReceived: receiveQuantities[item.id] ?? item.quantity,
      productId: item.product_id,
    }));
    receivePO.mutate(
      { poId: selectedPO.id, items },
      {
        onSuccess: () => {
          setIsReceiveDialogOpen(false);
          setSelectedPOId(null);
          setReceiveQuantities({});
        },
      }
    );
  };

  const resetForm = () => {
    setSupplierId('');
    setExpectedDeliveryDate('');
    setNotes('');
    setPoItems([]);
  };

  const calculateTotal = () => {
    const subtotal = poItems.reduce((sum, item) => sum + item.quantity * item.unit_cost, 0);
    return { subtotal, tax: subtotal * 0.2, total: subtotal * 1.2 };
  };

  // Stats
  const stats = {
    total: purchaseOrders.length,
    draft: purchaseOrders.filter((po: any) => po.status === 'draft').length,
    pending: purchaseOrders.filter((po: any) => ['sent', 'confirmed', 'shipped'].includes(po.status)).length,
    received: purchaseOrders.filter((po: any) => po.status === 'received').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Purchase Orders</h1>
            <p className="text-muted-foreground">Manage supplier orders and receive stock</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create PO
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total POs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draft}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.received}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search PO# or supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredPOs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No purchase orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPOs.map((po: any) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.order_number}</TableCell>
                    <TableCell>{po.supplier?.name || '-'}</TableCell>
                    <TableCell>{getStatusBadge(po.status)}</TableCell>
                    <TableCell>
                      {po.expected_delivery_date
                        ? format(new Date(po.expected_delivery_date), 'MMM d, yyyy')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">£{Number(po.total_amount || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPOId(po.id);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {po.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateStatus.mutate({ id: po.id, status: 'sent' })}
                            title="Send to supplier"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {['sent', 'confirmed', 'shipped'].includes(po.status) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedPOId(po.id);
                              setIsReceiveDialogOpen(true);
                            }}
                            title="Receive stock"
                          >
                            <Package className="h-4 w-4" />
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

        {/* Create PO Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
              <DialogDescription>Order stock from a supplier</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Supplier *</Label>
                  <Select value={supplierId} onValueChange={setSupplierId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s: any) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Expected Delivery</Label>
                  <Input
                    type="date"
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
              </div>

              {/* Items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Items</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                    <Plus className="mr-1 h-3 w-3" /> Add Item
                  </Button>
                </div>

                {poItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No items added yet</p>
                ) : (
                  <div className="space-y-2">
                    {poItems.map((item, index) => (
                      <div key={index} className="grid gap-2 md:grid-cols-5 items-end border p-3 rounded-lg">
                        <div className="md:col-span-2">
                          <Label className="text-xs">Product</Label>
                          <Select
                            value={item.product_id}
                            onValueChange={(v) => handleItemChange(index, 'product_id', v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((p: any) => (
                                <SelectItem key={p.id} value={p.id}>
                                  {p.name} ({p.sku})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Unit Cost (£)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.unit_cost}
                            onChange={(e) => handleItemChange(index, 'unit_cost', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">£{(item.quantity * item.unit_cost).toFixed(2)}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals */}
              {poItems.length > 0 && (
                <div className="border-t pt-4 space-y-1 text-right">
                  <p className="text-sm">Subtotal: £{calculateTotal().subtotal.toFixed(2)}</p>
                  <p className="text-sm">VAT (20%): £{calculateTotal().tax.toFixed(2)}</p>
                  <p className="text-lg font-bold">Total: £{calculateTotal().total.toFixed(2)}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreatePO}
                disabled={!supplierId || poItems.length === 0 || createPO.isPending}
              >
                {createPO.isPending ? 'Creating...' : 'Create PO'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View PO Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Purchase Order: {selectedPO?.order_number}</DialogTitle>
              <DialogDescription>View purchase order details</DialogDescription>
            </DialogHeader>

            {selectedPO && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Supplier</p>
                    <p className="font-medium">{selectedPO.supplier?.name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(selectedPO.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium">
                      {selectedPO.expected_delivery_date
                        ? format(new Date(selectedPO.expected_delivery_date), 'MMM d, yyyy')
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Received Date</p>
                    <p className="font-medium">
                      {selectedPO.received_date
                        ? format(new Date(selectedPO.received_date), 'MMM d, yyyy')
                        : '-'}
                    </p>
                  </div>
                </div>

                {selectedPO.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedPO.notes}</p>
                  </div>
                )}

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Received</TableHead>
                        <TableHead className="text-right">Unit Cost</TableHead>
                        <TableHead className="text-right">Line Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedPO.items || []).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell>{item.product_sku}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.quantity_received || 0}</TableCell>
                          <TableCell className="text-right">£{Number(item.unit_cost).toFixed(2)}</TableCell>
                          <TableCell className="text-right">£{Number(item.line_total).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm">Subtotal: £{Number(selectedPO.subtotal || 0).toFixed(2)}</p>
                  <p className="text-sm">VAT: £{Number(selectedPO.tax_amount || 0).toFixed(2)}</p>
                  <p className="text-lg font-bold">Total: £{Number(selectedPO.total_amount || 0).toFixed(2)}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Receive Stock Dialog */}
        <Dialog open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Receive Stock: {selectedPO?.order_number}</DialogTitle>
              <DialogDescription>Enter quantities received to update inventory</DialogDescription>
            </DialogHeader>

            {selectedPO && (
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Ordered</TableHead>
                        <TableHead className="text-right">Receiving</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedPO.items || []).map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">{item.product_sku}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="0"
                              max={item.quantity}
                              className="w-24 ml-auto"
                              value={receiveQuantities[item.id] ?? item.quantity}
                              onChange={(e) =>
                                setReceiveQuantities({
                                  ...receiveQuantities,
                                  [item.id]: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReceiveDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReceive} disabled={receivePO.isPending}>
                {receivePO.isPending ? 'Receiving...' : 'Receive Stock'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
