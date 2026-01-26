import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    sku: string;
    unit_price: number;
    image_url: string | null;
    unit_of_measure: string;
  };
}

interface Cart {
  id: string;
  user_id: string | null;
  session_id: string | null;
  items: CartItem[];
}

const SESSION_KEY = 'lulu_cart_session';

function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function useCart() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [sessionId] = useState(getSessionId);

  // Get or create cart
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', user?.id, sessionId],
    queryFn: async () => {
      // First try to find existing cart
      let query = supabase
        .from('shopping_carts')
        .select(`
          id,
          user_id,
          session_id,
          cart_items (
            id,
            cart_id,
            product_id,
            quantity,
            products (
              id,
              name,
              sku,
              unit_price,
              image_url,
              unit_of_measure
            )
          )
        `);

      if (user?.id) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { data: existingCarts, error: fetchError } = await query.limit(1);

      if (fetchError) throw fetchError;

      if (existingCarts && existingCarts.length > 0) {
        const cartData = existingCarts[0] as any;
        return {
          id: cartData.id,
          user_id: cartData.user_id,
          session_id: cartData.session_id,
          items: (cartData.cart_items || []).map((item: any) => ({
            ...item,
            product: item.products,
          })),
        } as Cart;
      }

      // Create new cart
      const { data: newCart, error: createError } = await supabase
        .from('shopping_carts')
        .insert({
          user_id: user?.id || null,
          session_id: user?.id ? null : sessionId,
        })
        .select()
        .single();

      if (createError) throw createError;

      return {
        id: newCart.id,
        user_id: newCart.user_id,
        session_id: newCart.session_id,
        items: [],
      } as Cart;
    },
  });

  // Add item to cart
  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (!cart) throw new Error('Cart not found');

      // Check if item already exists
      const existingItem = cart.items.find(item => item.product_id === productId);

      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart');
    },
    onError: (error) => {
      toast.error('Failed to add to cart');
      console.error(error);
    },
  });

  // Update item quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (quantity <= 0) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error('Failed to update cart');
      console.error(error);
    },
  });

  // Remove item from cart
  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Removed from cart');
    },
    onError: (error) => {
      toast.error('Failed to remove from cart');
      console.error(error);
    },
  });

  // Clear cart
  const clearCart = useMutation({
    mutationFn: async () => {
      if (!cart) return;
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Calculate totals
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart?.items.reduce(
    (sum, item) => sum + item.quantity * Number(item.product.unit_price),
    0
  ) || 0;

  return {
    cart,
    isLoading,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}
