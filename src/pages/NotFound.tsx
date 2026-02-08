import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <section className="py-32 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page not found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home size={18} />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  <ArrowLeft size={18} />
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
