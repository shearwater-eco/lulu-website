-- Create sequences for order numbers, PO numbers, invoice numbers, and ticket numbers
CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 100000;
CREATE SEQUENCE IF NOT EXISTS public.po_number_seq START 100000;
CREATE SEQUENCE IF NOT EXISTS public.invoice_number_seq START 100000;
CREATE SEQUENCE IF NOT EXISTS public.ticket_number_seq START 100000;

-- Replace generate_order_number with sequence-based approach
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  seq_val BIGINT;
BEGIN
  seq_val := nextval('order_number_seq');
  RETURN 'ORD-' || LPAD(seq_val::TEXT, 8, '0');
END;
$$;

-- Replace generate_po_number with sequence-based approach
CREATE OR REPLACE FUNCTION public.generate_po_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  seq_val BIGINT;
BEGIN
  seq_val := nextval('po_number_seq');
  RETURN 'PO-' || LPAD(seq_val::TEXT, 8, '0');
END;
$$;

-- Replace generate_invoice_number with sequence-based approach
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  seq_val BIGINT;
BEGIN
  seq_val := nextval('invoice_number_seq');
  RETURN 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMM') || '-' || LPAD(seq_val::TEXT, 6, '0');
END;
$$;

-- Replace generate_ticket_number with sequence-based approach
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  seq_val BIGINT;
BEGIN
  seq_val := nextval('ticket_number_seq');
  RETURN 'TKT-' || LPAD(seq_val::TEXT, 8, '0');
END;
$$;