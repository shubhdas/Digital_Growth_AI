import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Palette, Bot, Cpu, Mic, CheckCircle, Users, Clock, Heart, Database, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  link?: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Custom, mobile-friendly websites that help your business stand out.",
    price: "$120",
  },
  {
    icon: Palette,
    title: "Portfolio Websites",
    description: "Showcase your work beautifully. Perfect for freelancers and creators.",
    price: "$80",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Smart assistants that handle customer questions 24/7.",
    price: "$60",
  },
  {
    icon: Cpu,
    title: "AI Agents",
    description: "Automated helpers that streamline your daily business tasks.",
    price: "$100",
  },
  {
    icon: Mic,
    title: "Voice Assistants",
    description: "Voice-enabled solutions for hands-free customer interaction.",
    price: "$180",
  },
  {
    icon: Database,
    title: "CRM & ERP Solutions",
    description: "Automate your business with Qwerty CRM and custom ERP integrations.",
    price: "$250",
    link: "https://orgfarm-0dd970bf31-dev-ed.develop.lightning.force.com/one/one.app",
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Affordable Pricing",
    description: "Quality solutions designed for small business budgets. No hidden fees.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Most projects delivered within 1-2 weeks. We value your time.",
  },
  {
    icon: Users,
    title: "Personal Support",
    description: "Real people who understand your business. Not automated responses.",
  },
  {
    icon: CheckCircle,
    title: "Custom Solutions",
    description: "Every project is tailored to your specific needs and goals.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Digital solutions for small businesses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Grow your business online.{" "}
              <span className="text-primary">Without the complexity.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              We help local shops, freelancers, and small businesses build their online presence with websites, chatbots, and smart automation — all at prices that make sense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What we can build for you
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple websites to smart automation — we have the tools to help your business thrive online.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  <span className="text-accent font-bold text-lg">{service.price}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                {service.link && (
                  <div className="mt-6 pt-4 border-t border-border/10">
                    <Button className="w-full" asChild>
                      <a href={service.link} target="_blank" rel="noopener noreferrer">Launch Qwerty CRM 🚀</a>
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="default" size="lg" asChild>
              <Link to="/services">
                See All Services & Pricing
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why small businesses choose us
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We're not a big agency with big prices. We're a small team that understands what local businesses need — reliable solutions that work, delivered by people who care about your success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.3),transparent_50%)]" />
                <div className="relative h-full flex flex-col justify-center items-center text-center">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-4">100+</div>
                  <p className="text-xl text-foreground font-medium mb-2">Happy Clients</p>
                  <p className="text-muted-foreground">Trusted by local businesses</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to take your business online?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Let's chat about what you need. No pressure, no confusing jargon — just a friendly conversation about how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                asChild
              >
                <Link to="/contact">
                  Talk to Us
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
