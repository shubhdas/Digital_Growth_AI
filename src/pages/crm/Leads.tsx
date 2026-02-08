import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CRMLayout } from '@/components/crm/CRMLayout';
import { LeadForm } from '@/components/crm/LeadForm';
import { LeadKanban } from '@/components/crm/LeadKanban';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { Lead, Customer, LeadSource, LeadStatus } from '@/types/crm';

export default function Leads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [leadsRes, customersRes] = await Promise.all([
        supabase
          .from('leads')
          .select('*, customer:customers(id, name, email, company)')
          .order('created_at', { ascending: false }),
        supabase.from('customers').select('*').order('name'),
      ]);

      if (leadsRes.error) throw leadsRes.error;
      if (customersRes.error) throw customersRes.error;

      setLeads(
        (leadsRes.data || []).map((l) => ({
          ...l,
          source: l.source as LeadSource,
          status: l.status as LeadStatus,
          customer: l.customer as Customer | undefined,
        }))
      );
      setCustomers(customersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: {
    customer_id: string;
    source: LeadSource;
    status: LeadStatus;
    notes?: string;
  }) {
    setSaving(true);
    try {
      if (editingLead) {
        const { error } = await supabase
          .from('leads')
          .update({
            customer_id: data.customer_id,
            source: data.source,
            status: data.status,
            notes: data.notes || null,
          })
          .eq('id', editingLead.id);

        if (error) throw error;
        toast.success('Lead updated');
      } else {
        const { error } = await supabase.from('leads').insert({
          customer_id: data.customer_id,
          source: data.source,
          status: data.status,
          notes: data.notes || null,
          assigned_to: user?.id,
        });

        if (error) throw error;
        toast.success('Lead created');
      }

      setFormOpen(false);
      setEditingLead(null);
      fetchData();
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Failed to save lead');
    } finally {
      setSaving(false);
    }
  }

  async function handleLeadClick(lead: Lead) {
    setEditingLead(lead);
    setFormOpen(true);
  }

  return (
    <CRMLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads Pipeline</h1>
            <p className="text-muted-foreground">
              Track and manage your sales leads
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>

        <LeadKanban leads={leads} onLeadClick={handleLeadClick} loading={loading} />
      </div>

      <LeadForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingLead(null);
        }}
        onSubmit={handleSubmit}
        lead={editingLead}
        customers={customers}
        loading={saving}
      />
    </CRMLayout>
  );
}
