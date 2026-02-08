import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Palette, Bot, Cpu, Mic, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const services = [
  {
    icon: Globe,
    title: "Business Website Development",
    price: "$120",
    description: "A professional, mobile-friendly website that represents your business beautifully online. Perfect for shops, clinics, salons, restaurants, and local service providers.",
    features: [
      "Custom design tailored to your brand",
      "Mobile-responsive layout",
      "Fast loading speeds",
      "Contact forms and maps",
      "Social media integration",
      "Basic SEO setup",
    ],
    popular: true,
  },
  {
    icon: Palette,
    title: "Portfolio Websites",
    price: "$80",
    description: "Showcase your work and skills with a stunning portfolio. Ideal for photographers, designers, artists, freelancers, and students entering the job market.",
    features: [
      "Beautiful gallery layouts",
      "Project case studies",
      "About & contact pages",
      "Resume/CV section",
      "Mobile-optimized",
      "Easy to update",
    ],
    popular: false,
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    price: "$60",
    description: "A smart chatbot that answers customer questions, collects leads, and provides support — even when you're not available. Works 24/7 on your website.",
    features: [
      "Answers common questions",
      "Collects contact information",
      "Books appointments",
      "Multilingual support",
      "Easy to customize",
      "Monthly analytics",
    ],
    popular: false,
  },
  {
    icon: Cpu,
    title: "AI Agents",
    price: "$100",
    description: "Automated assistants that handle repetitive business tasks like scheduling, data entry, email responses, and more. Save hours every week.",
    features: [
      "Task automation",
      "Email management",
      "Data processing",
      "Calendar scheduling",
      "Custom workflows",
      "Integration with your tools",
    ],
    popular: false,
  },
  {
    icon: Mic,
    title: "Voice Assistants",
    price: "$180",
    description: "Voice-enabled technology for phone systems, smart speakers, or in-store kiosks. Let customers interact with your business using natural speech.",
    features: [
      "Natural voice interaction",
      "Phone system integration",
      "Custom voice & personality",
      "Order taking capability",
      "FAQ handling",
      "Call analytics",
    ],
    popular: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Services = () => {
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
              Our Services & Pricing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Clear pricing, no surprises. Every service is designed to help small businesses succeed online without breaking the bank.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 ${
                  service.popular ? "ring-2 ring-accent" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{service.title}</h3>
                        <p className="text-3xl font-bold text-accent">{service.price}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
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
              Flexible pricing for every budget
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We understand that every business is different. That's why we offer flexible payment options and bundle discounts. Need multiple services? Let's talk about a custom package that works for you.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get a Custom Quote
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
