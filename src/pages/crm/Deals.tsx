import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CRMLayout } from '@/components/crm/CRMLayout';
import { DealForm } from '@/components/crm/DealForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { Deal, Customer, DealStage } from '@/types/crm';
import { cn } from '@/lib/utils';

const stageConfig: Record<DealStage, { label: string; color: string }> = {
  discovery: { label: 'Discovery', color: 'bg-blue-100 text-blue-800' },
  proposal: { label: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
  negotiation: { label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  closed_won: { label: 'Closed Won', color: 'bg-green-100 text-green-800' },
  closed_lost: { label: 'Closed Lost', color: 'bg-gray-100 text-gray-800' },
};

export default function Deals() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [dealsRes, customersRes] = await Promise.all([
        supabase
          .from('deals')
          .select('*, customer:customers(id, name, email, company)')
          .order('created_at', { ascending: false }),
        supabase.from('customers').select('*').order('name'),
      ]);

      if (dealsRes.error) throw dealsRes.error;
      if (customersRes.error) throw customersRes.error;

      setDeals(
        (dealsRes.data || []).map((d) => ({
          ...d,
          stage: d.stage as DealStage,
          customer: d.customer as Customer | undefined,
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
    title: string;
    value: number;
    stage: DealStage;
    expected_close_date?: string;
    notes?: string;
  }) {
    setSaving(true);
    try {
      if (editingDeal) {
        const { error } = await supabase
          .from('deals')
          .update({
            customer_id: data.customer_id,
            title: data.title,
            value: data.value,
            stage: data.stage,
            expected_close_date: data.expected_close_date || null,
            notes: data.notes || null,
          })
          .eq('id', editingDeal.id);

        if (error) throw error;
        toast.success('Deal updated');
      } else {
        const { error } = await supabase.from('deals').insert({
          customer_id: data.customer_id,
          title: data.title,
          value: data.value,
          stage: data.stage,
          expected_close_date: data.expected_close_date || null,
          notes: data.notes || null,
          assigned_to: user?.id,
        });

        if (error) throw error;
        toast.success('Deal created');
      }

      setFormOpen(false);
      setEditingDeal(null);
      fetchData();
    } catch (error) {
      console.error('Error saving deal:', error);
      toast.error('Failed to save deal');
    } finally {
      setSaving(false);
    }
  }

  const filteredDeals = deals.filter(
    (deal) =>
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CRMLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Deals</h1>
            <p className="text-muted-foreground">Track your sales opportunities</p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No deals found' : 'No deals yet'}
                </p>
                {!searchQuery && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setFormOpen(true)}
                  >
                    Create your first deal
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deal</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Close Date</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeals.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">{deal.title}</TableCell>
                        <TableCell>{deal.customer?.name || 'Unknown'}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(Number(deal.value))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(stageConfig[deal.stage].color)}
                          >
                            {stageConfig[deal.stage].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {deal.expected_close_date
                            ? format(new Date(deal.expected_close_date), 'MMM d, yyyy')
                            : '-'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingDeal(deal);
                              setFormOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DealForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingDeal(null);
        }}
        onSubmit={handleSubmit}
        deal={editingDeal}
        customers={customers}
        loading={saving}
      />
    </CRMLayout>
  );
}
