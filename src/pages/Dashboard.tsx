import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, AlertCircle, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceOrder {
  id: string;
  service_name: string;
  price: number;
  status: string;
  created_at: string;
}

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-600 bg-yellow-100" },
  in_progress: { icon: AlertCircle, label: "In Progress", color: "text-blue-600 bg-blue-100" },
  completed: { icon: CheckCircle, label: "Completed", color: "text-green-600 bg-green-100" },
};

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("service_orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!user) return null;

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Your Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user.email}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>

            {/* Orders Section */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Your Service Orders</h2>
                    <p className="text-sm text-muted-foreground">Track the status of your projects</p>
                  </div>
                </div>
              </div>

              {loadingOrders ? (
                <div className="p-12 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Once you order a service, it will appear here.
                  </p>
                  <Button variant="hero" onClick={() => navigate("/services")}>
                    Browse Services
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {orders.map((order) => {
                    const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{order.service_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-accent">${order.price}</span>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                            <StatusIcon size={14} />
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Dashboard;
