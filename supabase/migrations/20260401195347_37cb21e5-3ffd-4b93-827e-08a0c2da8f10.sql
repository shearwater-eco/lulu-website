-- 1. Fix shopping_carts session_id bypass
DROP POLICY IF EXISTS "Users can view their own cart" ON shopping_carts;
DROP POLICY IF EXISTS "Users can update their own cart" ON shopping_carts;
DROP POLICY IF EXISTS "Users can delete their own cart" ON shopping_carts;

CREATE POLICY "Users can view their own cart" ON shopping_carts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart" ON shopping_carts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart" ON shopping_carts
  FOR DELETE USING (auth.uid() = user_id);

-- Fix cart_items policies
DROP POLICY IF EXISTS "Users can view their cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can add cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can delete cart items" ON cart_items;

CREATE POLICY "Users can view their cart items" ON cart_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM shopping_carts
    WHERE shopping_carts.id = cart_items.cart_id AND shopping_carts.user_id = auth.uid()
  ));
CREATE POLICY "Users can add cart items" ON cart_items
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM shopping_carts
    WHERE shopping_carts.id = cart_items.cart_id AND shopping_carts.user_id = auth.uid()
  ));
CREATE POLICY "Users can update cart items" ON cart_items
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM shopping_carts
    WHERE shopping_carts.id = cart_items.cart_id AND shopping_carts.user_id = auth.uid()
  ));
CREATE POLICY "Users can delete cart items" ON cart_items
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM shopping_carts
    WHERE shopping_carts.id = cart_items.cart_id AND shopping_carts.user_id = auth.uid()
  ));

-- 2. Fix inventory public exposure
DROP POLICY IF EXISTS "Anyone can view inventory" ON inventory;
CREATE POLICY "Staff can view inventory" ON inventory
  FOR SELECT USING (has_role(auth.uid(), 'staff'::app_role) OR is_admin_or_manager(auth.uid()));

-- 3. Add restrictive policy on user_roles
CREATE POLICY "Deny non-admin role mutations" ON user_roles
  AS RESTRICTIVE FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));