import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_sku: string;
  product_image_url: string | null;
  quantity: number;
  unit_price: number;
  tax_amount: number;
  discount_amount: number;
  line_total: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  user_id: string | null;
  status: OrderStatus;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_city: string;
  shipping_state: string | null;
  shipping_postal_code: string;
  shipping_country: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total: number;
  payment_status: string;
  payment_reference: string | null;
  payment_method: string | null;
  paid_at: string | null;
  shipping_method: string | null;
  tracking_number: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  customer_notes: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface CreateOrderInput {
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  shipping_address_line1: string;
  shipping_address_line2?: string;
  shipping_city: string;
  shipping_state?: string;
  shipping_postal_code: string;
  shipping_country: string;
  customer_notes?: string;
  items: {
    product_id: string;
    product_name: string;
    product_sku: string;
    product_image_url?: string;
    quantity: number;
    unit_price: number;
  }[];
}

export function useOrders() {
  const queryClient = useQueryClient();
  const { user, isManager } = useAuth();

  // Fetch orders (admin/manager see all, users see own)
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return (data || []).map((order: any) => ({
        ...order,
        items: order.order_items,
      })) as Order[];
    },
    enabled: !!user,
  });

  // Create order
  const createOrder = useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      // Generate order number
      const { data: orderNumber, error: numError } = await supabase
        .rpc('generate_order_number');
      
      if (numError) throw numError;

      // Calculate totals
      const subtotal = input.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );
      const total = subtotal; // Add tax/shipping later

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user?.id || null,
          customer_email: input.customer_email,
          customer_name: input.customer_name,
          customer_phone: input.customer_phone,
          shipping_address_line1: input.shipping_address_line1,
          shipping_address_line2: input.shipping_address_line2,
          shipping_city: input.shipping_city,
          shipping_state: input.shipping_state,
          shipping_postal_code: input.shipping_postal_code,
          shipping_country: input.shipping_country,
          customer_notes: input.customer_notes,
          subtotal,
          total,
          status: 'pending',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = input.items.map((item, index) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_sku: item.product_sku,
        product_image_url: item.product_image_url,
        quantity: item.quantity,
        unit_price: item.unit_price,
        line_total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const updates: any = { status };
      
      if (status === 'shipped') {
        updates.shipped_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updates.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated');
    },
    onError: (error) => {
      toast.error('Failed to update order');
      console.error(error);
    },
  });

  // Update tracking info
  const updateTracking = useMutation({
    mutationFn: async ({ orderId, trackingNumber, shippingMethod }: { 
      orderId: string; 
      trackingNumber: string;
      shippingMethod?: string;
    }) => {
      const { error } = await supabase
        .from('orders')
        .update({ 
          tracking_number: trackingNumber,
          shipping_method: shippingMethod,
          status: 'shipped',
          shipped_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Tracking updated');
    },
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + Number(o.total), 0),
  };

  return {
    orders,
    isLoading,
    stats,
    canManage: isManager,
    createOrder,
    updateOrderStatus,
    updateTracking,
  };
}
