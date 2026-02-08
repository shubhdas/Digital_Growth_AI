import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
interface Invoice {
  invoiceId: string;
  project_name: string;
  amount: number;
  status: string;
  receivedAt: string;
}

const ERP = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Function to fetch data from our local server
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/api/invoices`);
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error("Error fetching ERP data:", err);
      }
    };

    fetchData();
    // Poll every 2 seconds for real-time updates
    const interval = window.setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [setInvoices]);

  return (
    <PageLayout>
      <section className="py-20 bg-secondary/30 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">ERP Dashboard</h1>
            <p className="text-muted-foreground mb-8">Real-time Invoices from Salesforce</p>

            <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="p-4 font-semibold text-foreground">Invoice ID</th>
                      <th className="p-4 font-semibold text-foreground">Project Name</th>
                      <th className="p-4 font-semibold text-foreground">Amount</th>
                      <th className="p-4 font-semibold text-foreground">Status</th>
                      <th className="p-4 font-semibold text-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No invoices received yet. Click "Trigger Billing" in Salesforce!
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv, idx) => (
                        <tr key={idx} className="border-t border-border/10 hover:bg-secondary/20 transition-colors">
                          <td className="p-4 font-mono text-primary font-medium">{inv.invoiceId}</td>
                          <td className="p-4 text-foreground">{inv.project_name}</td>
                          <td className="p-4 font-bold text-foreground">${inv.amount}</td>
                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium border border-green-500/20">
                              {inv.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(inv.receivedAt).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ERP;