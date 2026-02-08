import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Target, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "We treat every client like a partner, not a transaction. Your success is our success.",
  },
  {
    icon: Target,
    title: "Results Focused",
    description: "We don't just build pretty websites — we create solutions that actually help your business grow.",
  },
  {
    icon: Users,
    title: "Always Available",
    description: "Have a question? Need a change? We're here to help, even after the project is done.",
  },
  {
    icon: Lightbulb,
    title: "Keep It Simple",
    description: "No confusing tech talk. We explain everything in plain language you can understand.",
  },
];

const About = () => {
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
              About SkillFull InnoVations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a small team with a big mission: making digital solutions accessible to every business, regardless of size or budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for small businesses, by people who understand them
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We started SkillFull InnoVations because we saw a problem: small businesses were being left behind in the digital world. Big agencies charged too much. DIY tools were too complicated. And freelancers were often unreliable.
                </p>
                <p>
                  So we decided to do things differently. We focus on what small businesses actually need — not what sounds impressive. Our solutions are practical, affordable, and built to last.
                </p>
                <p>
                  Whether you're a bakery owner who needs a simple website, or a salon looking to automate bookings, we're here to help. We speak your language, respect your budget, and deliver work we're proud of.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.3),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.3),transparent_50%)]" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-3xl">S</span>
                    </div>
                    <p className="text-xl font-semibold text-foreground">SkillFull InnoVations</p>
                    <p className="text-muted-foreground mt-2">Est. 2023</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              To make technology affordable and simple for small businesses, so they can compete online and build lasting relationships with their customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What we believe in
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These aren't just words on a wall — they guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Let's work together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to bring your business online? We'd love to hear from you.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
