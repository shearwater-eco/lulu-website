import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from './useCart';
import { useToast } from './use-toast';
import { Address } from '@/lib/ecommerce-types';

interface CheckoutResult {
  success: boolean;
  orderNumber?: string;
  orderId?: string;
  error?: string;
}

export function useCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();

  const processCheckout = async (
    shippingAddress: Address,
    billingAddress: Address
  ): Promise<CheckoutResult> => {
    if (items.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    setIsProcessing(true);

    try {
      // Get current user (optional - guest checkout allowed)
      const { data: { user } } = await supabase.auth.getUser();

      // Generate order number
      const { data: orderNumberData, error: orderNumError } = await supabase
        .rpc('generate_order_number');
      
      if (orderNumError) throw orderNumError;
      const orderNumber = orderNumberData as string;

      // Calculate totals
      const subtotal = total;
      const shippingAmount = 4.99;
      const taxAmount = 0; // Can add VAT calculation here
      const totalAmount = subtotal + shippingAmount + taxAmount;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user?.id || null,
          status: 'pending',
          subtotal,
          tax_amount: taxAmount,
          shipping_amount: shippingAmount,
          total_amount: totalAmount,
          // Shipping address
          shipping_first_name: shippingAddress.firstName,
          shipping_last_name: shippingAddress.lastName,
          shipping_email: shippingAddress.email,
          shipping_phone: shippingAddress.phone || null,
          shipping_address_line1: shippingAddress.addressLine1,
          shipping_address_line2: shippingAddress.addressLine2 || null,
          shipping_city: shippingAddress.city,
          shipping_state: shippingAddress.state,
          shipping_postal_code: shippingAddress.postalCode,
          shipping_country: shippingAddress.country,
          // Billing address
          billing_first_name: billingAddress.firstName,
          billing_last_name: billingAddress.lastName,
          billing_email: billingAddress.email,
          billing_phone: billingAddress.phone || null,
          billing_address_line1: billingAddress.addressLine1,
          billing_address_line2: billingAddress.addressLine2 || null,
          billing_city: billingAddress.city,
          billing_state: billingAddress.state,
          billing_postal_code: billingAddress.postalCode,
          billing_country: billingAddress.country,
        })
        .select('id, order_number')
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_sku: item.product.sku,
        product_image_url: item.product.image.startsWith('http') ? item.product.image : null,
        quantity: item.quantity,
        unit_price: item.product.price,
        line_total: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Deduct inventory for each item
      for (const item of items) {
        // Get current inventory
        const { data: inventoryRecords, error: invError } = await supabase
          .from('inventory')
          .select('id, quantity_on_hand')
          .eq('product_id', item.product.id)
          .gt('quantity_on_hand', 0)
          .order('quantity_on_hand', { ascending: false });

        if (invError) {
          console.error('Inventory lookup error:', invError);
          continue;
        }

        let remainingQty = item.quantity;
        for (const inv of inventoryRecords || []) {
          if (remainingQty <= 0) break;
          
          const deduction = Math.min(remainingQty, inv.quantity_on_hand);
          const newQty = inv.quantity_on_hand - deduction;
          
          await supabase
            .from('inventory')
            .update({ quantity_on_hand: newQty })
            .eq('id', inv.id);
          
          remainingQty -= deduction;
        }
      }

      // Clear the cart
      clearCart();

      // Store order info for confirmation page
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderNumber: order.order_number,
        orderId: order.id,
        total: totalAmount,
        itemCount: items.length,
      }));

      return {
        success: true,
        orderNumber: order.order_number,
        orderId: order.id,
      };
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: error.message || 'There was an error processing your order.',
        variant: 'destructive',
      });
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing,
  };
}
