import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Lead, LeadStatus } from '@/types/crm';
import { cn } from '@/lib/utils';

interface LeadKanbanProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  loading?: boolean;
}

const columns: { status: LeadStatus; title: string; color: string }[] = [
  { status: 'new', title: 'New', color: 'bg-blue-500' },
  { status: 'contacted', title: 'Contacted', color: 'bg-yellow-500' },
  { status: 'qualified', title: 'Qualified', color: 'bg-purple-500' },
  { status: 'proposal', title: 'Proposal', color: 'bg-orange-500' },
  { status: 'negotiation', title: 'Negotiation', color: 'bg-pink-500' },
  { status: 'won', title: 'Won', color: 'bg-green-500' },
  { status: 'lost', title: 'Lost', color: 'bg-gray-500' },
];

const sourceColors: Record<string, string> = {
  website: 'bg-blue-100 text-blue-800',
  referral: 'bg-green-100 text-green-800',
  manual: 'bg-gray-100 text-gray-800',
  social: 'bg-purple-100 text-purple-800',
  other: 'bg-yellow-100 text-yellow-800',
};

export function LeadKanban({ leads, onLeadClick, loading }: LeadKanbanProps) {
  const leadsByStatus = useMemo(() => {
    const grouped: Record<LeadStatus, Lead[]> = {
      new: [],
      contacted: [],
      qualified: [],
      proposal: [],
      negotiation: [],
      won: [],
      lost: [],
    };
    leads.forEach((lead) => {
      grouped[lead.status].push(lead);
    });
    return grouped;
  }, [leads]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {columns.map((column) => (
          <div key={column.status} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', column.color)} />
              <span className="font-medium text-sm">{column.title}</span>
            </div>
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-3">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 overflow-x-auto">
      {columns.map((column) => (
        <div key={column.status} className="min-w-[200px] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', column.color)} />
              <span className="font-medium text-sm">{column.title}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {leadsByStatus[column.status].length}
            </Badge>
          </div>
          <div className="space-y-2 min-h-[200px]">
            {leadsByStatus[column.status].map((lead) => (
              <Card
                key={lead.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onLeadClick?.(lead)}
              >
                <CardContent className="p-3">
                  <p className="font-medium text-sm truncate">
                    {lead.customer?.name || 'Unknown Customer'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={cn('text-xs capitalize', sourceColors[lead.source])}
                    >
                      {lead.source}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(new Date(lead.created_at), 'MMM d, yyyy')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
