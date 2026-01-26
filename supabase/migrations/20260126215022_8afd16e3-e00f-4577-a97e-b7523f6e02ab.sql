-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'staff', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or manager
CREATE OR REPLACE FUNCTION public.is_admin_or_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'manager')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create customers table for customer management
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  company TEXT,
  notes TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create purchase_orders table
CREATE TABLE public.purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  expected_delivery_date DATE,
  received_date DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create purchase_order_items table
CREATE TABLE public.purchase_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID REFERENCES public.purchase_orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  line_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantity_received INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;

-- Customers RLS: Admin/Manager can manage
CREATE POLICY "Admin/Manager can view customers"
ON public.customers FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage customers"
ON public.customers FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

-- Suppliers RLS: Admin/Manager can manage
CREATE POLICY "Admin/Manager can view suppliers"
ON public.suppliers FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage suppliers"
ON public.suppliers FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

-- Purchase Orders RLS: Admin/Manager can manage
CREATE POLICY "Admin/Manager can view purchase orders"
ON public.purchase_orders FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage purchase orders"
ON public.purchase_orders FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

-- Purchase Order Items RLS
CREATE POLICY "Admin/Manager can view purchase order items"
ON public.purchase_order_items FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage purchase order items"
ON public.purchase_order_items FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

-- Add admin write policies for existing tables
CREATE POLICY "Admin/Manager can manage products"
ON public.products FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage categories"
ON public.product_categories FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage inventory"
ON public.inventory FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can view all orders"
ON public.orders FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can manage orders"
ON public.orders FOR ALL
USING (public.is_admin_or_manager(auth.uid()));

CREATE POLICY "Admin/Manager can view all order items"
ON public.order_items FOR SELECT
USING (public.is_admin_or_manager(auth.uid()));

-- Create function to generate purchase order numbers
CREATE OR REPLACE FUNCTION public.generate_po_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.purchase_orders;
  new_number := 'PO-' || LPAD(counter::TEXT, 6, '0');
  RETURN new_number;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_purchase_orders_updated_at BEFORE UPDATE ON public.purchase_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_purchase_order_items_updated_at BEFORE UPDATE ON public.purchase_order_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();