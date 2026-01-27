import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
export interface Supplier {
  id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  notes: string | null;
  is_active: boolean;
}

export interface PurchaseOrder {
  id: string;
  order_number: string;
  supplier_id: string | null;
  status: string;
  expected_delivery_date: string | null;
  received_date: string | null;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  supplier?: Supplier;
  items?: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  product_id: string | null;
  product_name: string;
  product_sku: string;
  quantity: number;
  quantity_received: number;
  unit_cost: number;
  line_total: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  unit_price: number;
  cost_price: number;
  is_active: boolean;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  quantity_on_hand: number;
  warehouse_location: string | null;
  product?: Product;
}

// Hooks
export function usePurchaseOrders() {
  return useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PurchaseOrder[];
    },
  });
}

export function usePurchaseOrder(id: string | null) {
  return useQuery({
    queryKey: ['purchase-order', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(*),
          items:purchase_order_items(*)
        `)
        .eq('id', id!)
        .single();

      if (error) throw error;
      return data as PurchaseOrder;
    },
  });
}

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      supplier_id: string;
      expected_delivery_date?: string;
      notes?: string;
      items: Array<{
        product_id: string;
        product_name: string;
        product_sku: string;
        quantity: number;
        unit_cost: number;
      }>;
    }) => {
      // Generate PO number
      const { data: poNumber } = await supabase.rpc('generate_po_number');

      // Calculate totals
      const subtotal = data.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_cost,
        0
      );
      const taxAmount = subtotal * 0.2; // 20% VAT
      const totalAmount = subtotal + taxAmount;

      // Create PO
      const { data: po, error: poError } = await supabase
        .from('purchase_orders')
        .insert({
          order_number: poNumber,
          supplier_id: data.supplier_id,
          expected_delivery_date: data.expected_delivery_date || null,
          notes: data.notes || null,
          subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          status: 'draft',
        })
        .select()
        .single();

      if (poError) throw poError;

      // Create items
      const items = data.items.map((item) => ({
        purchase_order_id: po.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_sku: item.product_sku,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        line_total: item.quantity * item.unit_cost,
      }));

      const { error: itemsError } = await supabase
        .from('purchase_order_items')
        .insert(items);

      if (itemsError) throw itemsError;

      return po;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast.success('Purchase order created');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create purchase order');
    },
  });
}

export function useUpdatePurchaseOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      receivedDate,
    }: {
      id: string;
      status: string;
      receivedDate?: string;
    }) => {
      const { error } = await supabase
        .from('purchase_orders')
        .update({
          status,
          received_date: receivedDate || null,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast.success('Purchase order updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update purchase order');
    },
  });
}

export function useReceivePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      poId,
      items,
    }: {
      poId: string;
      items: Array<{ id: string; quantityReceived: number; productId: string }>;
    }) => {
      // Update PO items with received quantities
      for (const item of items) {
        const { error: itemError } = await supabase
          .from('purchase_order_items')
          .update({ quantity_received: item.quantityReceived })
          .eq('id', item.id);

        if (itemError) throw itemError;

        // Update inventory
        if (item.quantityReceived > 0) {
          // Check if inventory record exists
          const { data: existingInventory } = await supabase
            .from('inventory')
            .select('id, quantity_on_hand')
            .eq('product_id', item.productId)
            .maybeSingle();

          if (existingInventory) {
            // Update existing inventory
            const { error: invError } = await supabase
              .from('inventory')
              .update({
                quantity_on_hand:
                  existingInventory.quantity_on_hand + item.quantityReceived,
              })
              .eq('id', existingInventory.id);

            if (invError) throw invError;
          } else {
            // Create new inventory record
            const { error: invError } = await supabase.from('inventory').insert({
              product_id: item.productId,
              quantity_on_hand: item.quantityReceived,
            });

            if (invError) throw invError;
          }
        }
      }

      // Update PO status
      const { error: poError } = await supabase
        .from('purchase_orders')
        .update({
          status: 'received',
          received_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', poId);

      if (poError) throw poError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
      toast.success('Stock received and inventory updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to receive stock');
    },
  });
}

export function useInventoryValuation() {
  return useQuery({
    queryKey: ['inventory-valuation'],
    queryFn: async () => {
      // Get inventory with product cost data
      const { data: inventory, error: invError } = await supabase
        .from('inventory')
        .select('*, products(*)');

      if (invError) throw invError;

      // Calculate valuation
      let totalCostValue = 0;
      let totalRetailValue = 0;
      let itemCount = 0;

      const items = (inventory || []).map((inv: any) => {
        const costValue = inv.quantity_on_hand * (inv.products?.cost_price || 0);
        const retailValue = inv.quantity_on_hand * (inv.products?.unit_price || 0);
        const potentialProfit = retailValue - costValue;
        const margin = retailValue > 0 ? (potentialProfit / retailValue) * 100 : 0;

        totalCostValue += costValue;
        totalRetailValue += retailValue;
        itemCount += inv.quantity_on_hand;

        return {
          id: inv.id,
          productId: inv.product_id,
          productName: inv.products?.name || 'Unknown',
          productSku: inv.products?.sku || '',
          quantity: inv.quantity_on_hand,
          costPrice: inv.products?.cost_price || 0,
          unitPrice: inv.products?.unit_price || 0,
          costValue,
          retailValue,
          potentialProfit,
          margin,
          location: inv.warehouse_location,
        };
      });

      return {
        items,
        summary: {
          totalCostValue,
          totalRetailValue,
          totalPotentialProfit: totalRetailValue - totalCostValue,
          averageMargin:
            totalRetailValue > 0
              ? ((totalRetailValue - totalCostValue) / totalRetailValue) * 100
              : 0,
          totalItems: itemCount,
          totalSKUs: items.length,
        },
      };
    },
  });
}

export function useFinancialSummary(dateRange: { start: Date; end: Date }) {
  return useQuery({
    queryKey: ['financial-summary', dateRange.start.toISOString(), dateRange.end.toISOString()],
    queryFn: async () => {
      // Get orders in date range
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());

      if (ordersError) throw ordersError;

      // Get products for cost lookup
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, cost_price, unit_price');

      if (productsError) throw productsError;

      const productCosts = new Map(
        (products || []).map((p: any) => [p.id, { cost: p.cost_price, price: p.unit_price }])
      );

      // Calculate revenue and COGS
      let totalRevenue = 0;
      let totalCOGS = 0;
      let totalOrders = 0;
      let completedOrders = 0;

      (orders || []).forEach((order: any) => {
        totalOrders++;
        if (['delivered', 'shipped'].includes(order.status)) {
          completedOrders++;
          totalRevenue += Number(order.total_amount) || 0;

          // Calculate COGS for this order
          (order.order_items || []).forEach((item: any) => {
            const productInfo = productCosts.get(item.product_id);
            if (productInfo) {
              totalCOGS += productInfo.cost * item.quantity;
            }
          });
        }
      });

      // Get purchase orders in date range
      const { data: purchaseOrders, error: poError } = await supabase
        .from('purchase_orders')
        .select('*')
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());

      if (poError) throw poError;

      const totalPurchases = (purchaseOrders || []).reduce(
        (sum: number, po: any) => sum + (Number(po.total_amount) || 0),
        0
      );

      const grossProfit = totalRevenue - totalCOGS;
      const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

      return {
        totalRevenue,
        totalCOGS,
        grossProfit,
        grossMargin,
        totalOrders,
        completedOrders,
        totalPurchases,
        netFlow: totalRevenue - totalPurchases,
      };
    },
  });
}
