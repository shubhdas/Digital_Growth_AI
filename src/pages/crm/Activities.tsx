import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CRMLayout } from '@/components/crm/CRMLayout';
import { ActivityForm } from '@/components/crm/ActivityForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Search, Phone, Mail, Calendar, FileText, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { Activity, Customer, ActivityType } from '@/types/crm';
import { cn } from '@/lib/utils';

const typeConfig: Record<ActivityType, { icon: typeof Phone; label: string; color: string }> = {
  call: { icon: Phone, label: 'Call', color: 'bg-blue-100 text-blue-600' },
  email: { icon: Mail, label: 'Email', color: 'bg-green-100 text-green-600' },
  meeting: { icon: Calendar, label: 'Meeting', color: 'bg-purple-100 text-purple-600' },
  note: { icon: FileText, label: 'Note', color: 'bg-yellow-100 text-yellow-600' },
  task: { icon: CheckSquare, label: 'Task', color: 'bg-orange-100 text-orange-600' },
};

export default function Activities() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [activitiesRes, customersRes] = await Promise.all([
        supabase
          .from('activities')
          .select('*, customer:customers(id, name)')
          .order('created_at', { ascending: false }),
        supabase.from('customers').select('*').order('name'),
      ]);

      if (activitiesRes.error) throw activitiesRes.error;
      if (customersRes.error) throw customersRes.error;

      setActivities(
        (activitiesRes.data || []).map((a) => ({
          ...a,
          type: a.type as ActivityType,
          customer: a.customer as Customer | undefined,
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
    type: ActivityType;
    description: string;
  }) {
    setSaving(true);
    try {
      const { error } = await supabase.from('activities').insert({
        customer_id: data.customer_id,
        type: data.type,
        description: data.description,
        created_by: user?.id,
      });

      if (error) throw error;
      toast.success('Activity logged');

      setFormOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving activity:', error);
      toast.error('Failed to log activity');
    } finally {
      setSaving(false);
    }
  }

  const filteredActivities = activities.filter(
    (activity) =>
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CRMLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Activities</h1>
            <p className="text-muted-foreground">Track all customer interactions</p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
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
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-10 h-10 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? 'No activities found' : 'No activities yet'}
                </p>
                {!searchQuery && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setFormOpen(true)}
                  >
                    Log your first activity
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => {
                  const config = typeConfig[activity.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                    >
                      <div
                        className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                          config.color
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {config.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {activity.customer?.name || 'Unknown Customer'}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(activity.created_at), 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ActivityForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        customers={customers}
        loading={saving}
      />
    </CRMLayout>
  );
}
