-- Add RLS policies for customer-facing portal

-- Customers can view their own subscriptions
CREATE POLICY "Customers can view their own subscriptions"
ON public.subscriptions
FOR SELECT
USING (
  customer_id IN (
    SELECT id FROM public.customers 
    WHERE user_id = auth.uid()
  )
);

-- Customers can view their own invoices
CREATE POLICY "Customers can view their own invoices"
ON public.invoices
FOR SELECT
USING (
  customer_id IN (
    SELECT id FROM public.customers 
    WHERE user_id = auth.uid()
  )
);

-- Customers can view invoice items for their invoices
CREATE POLICY "Customers can view their invoice items"
ON public.invoice_items
FOR SELECT
USING (
  invoice_id IN (
    SELECT id FROM public.invoices
    WHERE customer_id IN (
      SELECT id FROM public.customers 
      WHERE user_id = auth.uid()
    )
  )
);

-- Customers can view their own support tickets
CREATE POLICY "Customers can view their own tickets"
ON public.support_tickets
FOR SELECT
USING (
  customer_id IN (
    SELECT id FROM public.customers 
    WHERE user_id = auth.uid()
  )
);

-- Customers can create support tickets
CREATE POLICY "Customers can create tickets"
ON public.support_tickets
FOR INSERT
WITH CHECK (
  customer_id IN (
    SELECT id FROM public.customers 
    WHERE user_id = auth.uid()
  )
);

-- Customers can view ticket messages for their tickets
CREATE POLICY "Customers can view their ticket messages"
ON public.ticket_messages
FOR SELECT
USING (
  ticket_id IN (
    SELECT id FROM public.support_tickets
    WHERE customer_id IN (
      SELECT id FROM public.customers 
      WHERE user_id = auth.uid()
    )
  )
);

-- Customers can add messages to their tickets
CREATE POLICY "Customers can add messages to their tickets"
ON public.ticket_messages
FOR INSERT
WITH CHECK (
  ticket_id IN (
    SELECT id FROM public.support_tickets
    WHERE customer_id IN (
      SELECT id FROM public.customers 
      WHERE user_id = auth.uid()
    )
  ) AND sender_id = auth.uid()
);

-- Customers can view subscription plans (public ones)
-- Already have: "Anyone can view public plans" policy