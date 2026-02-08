import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Pencil, TestTube, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "We Talk",
    subtitle: "Understand Your Business",
    description: "First, we have a conversation. We learn about your business, your customers, and what you're trying to achieve. No forms, no surveys — just a friendly chat to understand your needs.",
    details: [
      "Free consultation call",
      "Discuss your goals and challenges",
      "Answer all your questions",
      "Provide honest recommendations",
    ],
  },
  {
    number: "02",
    icon: Pencil,
    title: "We Design & Build",
    subtitle: "Create Your Solution",
    description: "Based on what you told us, we design and build your solution. You'll see progress along the way and have the chance to share feedback. We don't disappear — we keep you involved.",
    details: [
      "Custom design for your brand",
      "Regular progress updates",
      "Unlimited revision rounds",
      "No technical knowledge needed from you",
    ],
  },
  {
    number: "03",
    icon: TestTube,
    title: "We Test & Deliver",
    subtitle: "Launch with Confidence",
    description: "Before we hand anything over, we test everything thoroughly. We make sure it works perfectly on all devices and fix any issues. Then we help you launch and train you on how to use it.",
    details: [
      "Comprehensive testing",
      "Mobile optimization",
      "Training session included",
      "Launch support",
    ],
  },
  {
    number: "04",
    icon: Headphones,
    title: "We Support",
    subtitle: "Ongoing Help",
    description: "Our relationship doesn't end at delivery. Need changes? Have questions? Want to add something new? We're here to help. You'll always have someone to call.",
    details: [
      "30 days of free support",
      "Quick response times",
      "Easy update requests",
      "Fair pricing for additions",
    ],
  },
];

const HowItWorks = () => {
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
              How It Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A simple, transparent process designed to make working with us easy and stress-free. No surprises, no confusion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pb-16 last:pb-0"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent" />
                )}

                <div className="flex gap-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-accent">{step.number}</span>
                      <span className="text-sm text-muted-foreground">{step.subtitle}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="bg-secondary/50 rounded-xl p-6">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Typical Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-2xl p-6 text-center border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">1-2</div>
                <div className="text-sm text-muted-foreground">Days for initial consultation</div>
              </div>
              <div className="bg-card rounded-2xl p-6 text-center border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">5-10</div>
                <div className="text-sm text-muted-foreground">Days for design & development</div>
              </div>
              <div className="bg-card rounded-2xl p-6 text-center border border-border/50">
                <div className="text-3xl font-bold text-primary mb-2">1-2</div>
                <div className="text-sm text-muted-foreground">Days for testing & launch</div>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 text-sm">
              * Timelines vary based on project complexity. Simple projects may be faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              The first step is easy — just reach out and say hello. We'll take it from there.
            </p>
            <Button
              size="xl"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
