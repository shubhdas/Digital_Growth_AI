import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CRMLayout } from '@/components/crm/CRMLayout';
import { StatCard } from '@/components/crm/StatCard';
import { RecentActivities } from '@/components/crm/RecentActivities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, DollarSign, Activity as ActivityIcon, ArrowRight } from 'lucide-react';
import type { Activity, Deal, Customer, Lead } from '@/types/crm';

export default function CRMDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeLeads: 0,
    openDealsValue: 0,
    openDealsCount: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [recentDeals, setRecentDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch customers count
        const { count: customersCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        // Fetch active leads count
        const { count: leadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .not('status', 'in', '("won","lost")');

        // Fetch open deals
        const { data: openDeals } = await supabase
          .from('deals')
          .select('value')
          .not('stage', 'in', '("closed_won","closed_lost")');

        const openDealsValue = openDeals?.reduce((sum, deal) => sum + Number(deal.value), 0) || 0;

        setStats({
          totalCustomers: customersCount || 0,
          activeLeads: leadsCount || 0,
          openDealsValue,
          openDealsCount: openDeals?.length || 0,
        });

        // Fetch recent activities with customer info
        const { data: activities } = await supabase
          .from('activities')
          .select('*, customer:customers(name)')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentActivities(
          (activities || []).map((a) => ({
            ...a,
            type: a.type as Activity['type'],
            customer: a.customer as Customer | undefined,
          }))
        );

        // Fetch recent deals
        const { data: deals } = await supabase
          .from('deals')
          .select('*, customer:customers(name)')
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentDeals(
          (deals || []).map((d) => ({
            ...d,
            stage: d.stage as Deal['stage'],
            customer: d.customer as Customer | undefined,
          }))
        );
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CRMLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your CRM performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Customers"
            value={loading ? '...' : stats.totalCustomers}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Active Leads"
            value={loading ? '...' : stats.activeLeads}
            icon={<Target className="h-5 w-5" />}
          />
          <StatCard
            title="Open Deals"
            value={loading ? '...' : stats.openDealsCount}
            description={loading ? '' : `${formatCurrency(stats.openDealsValue)} total value`}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="Activities Today"
            value={loading ? '...' : recentActivities.length}
            icon={<ActivityIcon className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <RecentActivities activities={recentActivities} loading={loading} />

          {/* Recent Deals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Deals</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/crm/deals" className="gap-1">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between animate-pulse">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-32" />
                        <div className="h-3 bg-muted rounded w-24" />
                      </div>
                      <div className="h-4 bg-muted rounded w-16" />
                    </div>
                  ))}
                </div>
              ) : recentDeals.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No deals yet
                </p>
              ) : (
                <div className="space-y-4">
                  {recentDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{deal.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {deal.customer?.name || 'Unknown'}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        {formatCurrency(Number(deal.value))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
}
