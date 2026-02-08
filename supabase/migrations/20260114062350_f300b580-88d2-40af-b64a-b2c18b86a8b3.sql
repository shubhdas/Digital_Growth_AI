
-- Fix overly permissive INSERT policies for leads and deals
-- Drop the existing policies and create more restrictive ones

DROP POLICY IF EXISTS "Staff can create leads" ON public.leads;
DROP POLICY IF EXISTS "Staff can create deals" ON public.deals;

-- Leads: Staff can only create leads assigned to themselves
CREATE POLICY "Staff can create leads"
  ON public.leads FOR INSERT
  TO authenticated
  WITH CHECK (assigned_to = auth.uid() OR assigned_to IS NULL);

-- Deals: Staff can only create deals assigned to themselves  
CREATE POLICY "Staff can create deals"
  ON public.deals FOR INSERT
  TO authenticated
  WITH CHECK (assigned_to = auth.uid() OR assigned_to IS NULL);
