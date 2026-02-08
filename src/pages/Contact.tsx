import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().max(20, "Phone number is too long").optional(),
  message: z.string().trim().min(10, "Please tell us a bit more about your project").max(2000, "Message is too long"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("contact_requests").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        service_type: formData.phone ? `Phone: ${formData.phone}` : null,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "+919560176878";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your digital services.");

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind? Questions about our services? We'd love to hear from you. No pressure, just a friendly conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number (optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your project *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What kind of business do you have? What are you looking for?"
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Other ways to reach us</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Prefer a quick chat? Send us a WhatsApp message or email directly. We're friendly people who are happy to help.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border/50 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      WhatsApp
                    </h3>
                    <p className="text-sm text-muted-foreground">Chat with us directly</p>
                  </div>
                </a>

                <a
                  href="mailto:richikd68@gmail.com"
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border/50 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Email
                    </h3>
                    <p className="text-sm text-muted-foreground">richikd68@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919560176878"
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border/50 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Phone
                    </h3>
                    <p className="text-sm text-muted-foreground">+91 9560176878</p>
                  </div>
                </a>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Response Time</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We usually reply within 24 hours, often much sooner. If it's urgent, WhatsApp is the fastest way to reach us.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">How long does a project take?</h4>
                <p className="text-sm text-muted-foreground">
                  Most projects are completed within 1-2 weeks, depending on complexity.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Do you offer payment plans?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! We understand budgets can be tight. Let's discuss what works for you.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">What if I need changes later?</h4>
                <p className="text-sm text-muted-foreground">
                  No problem. We offer ongoing support and can make updates as needed.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Do I need to provide content?</h4>
                <p className="text-sm text-muted-foreground">
                  We can help with that too. Many clients provide basic info and we handle the rest.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
