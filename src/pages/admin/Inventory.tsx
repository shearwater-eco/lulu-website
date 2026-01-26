import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Plus, AlertTriangle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminInventory() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [editingInventory, setEditingInventory] = useState<any>(null);

  const { data: inventory = [], isLoading } = useQuery({
    queryKey: ['admin-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*, products(*)');

      if (error) throw error;
      return data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['admin-products-for-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, sku')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data;
    },
  });

  const saveInventory = useMutation({
    mutationFn: async (data: { product_id: string; quantity_on_hand: number; warehouse_location: string; id?: string }) => {
      if (data.id) {
        const { error } = await supabase
          .from('inventory')
          .update({
            quantity_on_hand: data.quantity_on_hand,
            warehouse_location: data.warehouse_location,
          })
          .eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('inventory')
          .insert({
            product_id: data.product_id,
            quantity_on_hand: data.quantity_on_hand,
            warehouse_location: data.warehouse_location,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
      toast.success(editingInventory ? 'Inventory updated' : 'Inventory added');
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save inventory');
    },
  });

  const handleOpenDialog = (inv?: any) => {
    if (inv) {
      setEditingInventory(inv);
      setSelectedProductId(inv.product_id);
      setQuantity(inv.quantity_on_hand?.toString() || '0');
      setLocation(inv.warehouse_location || '');
    } else {
      setEditingInventory(null);
      setSelectedProductId('');
      setQuantity('');
      setLocation('');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingInventory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveInventory.mutate({
      product_id: selectedProductId,
      quantity_on_hand: parseInt(quantity) || 0,
      warehouse_location: location,
      id: editingInventory?.id,
    });
  };

  const filteredInventory = inventory.filter((inv: any) =>
    inv.products?.name?.toLowerCase().includes(search.toLowerCase()) ||
    inv.products?.sku?.toLowerCase().includes(search.toLowerCase()) ||
    inv.warehouse_location?.toLowerCase().includes(search.toLowerCase())
  );

  const getStockStatus = (qty: number) => {
    if (qty === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (qty < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Inventory</h1>
            <p className="text-muted-foreground">Track stock levels and locations</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Total SKUs</p>
            <p className="text-2xl font-bold">{inventory.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Low Stock Items
            </p>
            <p className="text-2xl font-bold text-destructive">
              {inventory.filter((i: any) => i.quantity_on_hand < 10).length}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-bold">
              {inventory.filter((i: any) => i.quantity_on_hand === 0).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Inventory Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
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
              ) : filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No inventory found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((inv: any) => {
                  const status = getStockStatus(inv.quantity_on_hand);
                  return (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.products?.name}</TableCell>
                      <TableCell>{inv.products?.sku}</TableCell>
                      <TableCell>{inv.quantity_on_hand}</TableCell>
                      <TableCell>{inv.warehouse_location || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(inv)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Inventory Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingInventory ? 'Update Inventory' : 'Add Inventory'}
              </DialogTitle>
              <DialogDescription>
                {editingInventory ? 'Update stock quantity and location' : 'Add inventory for a product'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingInventory && (
                <div className="space-y-2">
                  <Label htmlFor="product">Product *</Label>
                  <Select value={selectedProductId} onValueChange={setSelectedProductId} required>
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
              )}

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Warehouse Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., A1-B2"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveInventory.isPending}>
                  {saveInventory.isPending ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
