-- Fix 1: Create a public view for products that excludes cost_price
CREATE OR REPLACE VIEW public.products_public
WITH (security_invoker=on) AS
SELECT 
  id, 
  sku, 
  name, 
  description, 
  category_id, 
  unit_price, 
  unit_of_measure, 
  image_url, 
  is_active, 
  created_at, 
  updated_at
FROM public.products
WHERE is_active = true;

-- Grant access to the public view
GRANT SELECT ON public.products_public TO anon, authenticated;

-- Fix 2: Drop existing permissive policies on product_categories if they conflict
-- and recreate with proper permissive mode
DROP POLICY IF EXISTS "Admin/Manager can manage categories" ON public.product_categories;

-- Create explicit PERMISSIVE policies for product_categories write operations
CREATE POLICY "Admin/Manager can insert categories" 
ON public.product_categories 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can update categories" 
ON public.product_categories 
FOR UPDATE 
TO authenticated
USING (public.is_admin_or_manager(auth.uid()))
WITH CHECK (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can delete categories" 
ON public.product_categories 
FOR DELETE 
TO authenticated
USING (public.is_admin_or_manager(auth.uid()));