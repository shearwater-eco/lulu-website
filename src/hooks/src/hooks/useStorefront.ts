import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProductCategory {
  id: string;
  name: string;
  description: string | null;
  parent_id: string | null;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category_id: string | null;
  unit_price: number;
  cost_price: number;
  unit_of_measure: string;
  image_url: string | null;
  is_active: boolean;
  category?: ProductCategory;
  totalStock: number;
  inStock: boolean;
}

export function useStorefront() {
  // Fetch public products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['storefront-products'],
    queryFn: async () => {
      // Fetch active products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (productsError) throw productsError;

      // Fetch inventory to check stock
      const { data: inventoryData, error: inventoryError } = await supabase
        .from('inventory')
        .select('product_id, quantity_on_hand');

      if (inventoryError) throw inventoryError;

      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('product_categories')
        .select('*');

      const categories = (categoriesData || []) as ProductCategory[];
      const inventory = (inventoryData || []) as { product_id: string; quantity_on_hand: number }[];

      return (productsData || []).map((product: any): Product => {
        const productInventory = inventory.filter(inv => inv.product_id === product.id);
        const totalStock = productInventory.reduce((sum, inv) => sum + Number(inv.quantity_on_hand), 0);
        const category = categories.find(c => c.id === product.category_id);

        return {
          ...product,
          category,
          totalStock,
          inStock: totalStock > 0,
        };
      });
    },
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['storefront-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as ProductCategory[];
    },
  });

  // Get single product by ID
  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  // Filter products by category
  const getProductsByCategory = (categoryId: string | null) => {
    if (!categoryId) return products;
    return products.filter(p => p.category_id === categoryId);
  };

  // Search products
  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.sku.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    products,
    categories,
    isLoading: productsLoading || categoriesLoading,
    getProduct,
    getProductsByCategory,
    searchProducts,
  };
}
