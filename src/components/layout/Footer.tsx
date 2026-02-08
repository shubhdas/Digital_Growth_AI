import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Website Development", href: "/services" },
    { label: "Portfolio Websites", href: "/services" },
    { label: "AI Chatbots", href: "/services" },
    { label: "AI Agents", href: "/services" },
    { label: "Voice Assistants", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">SkillFull InnoVations</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Helping small businesses grow online with affordable, reliable digital solutions.
            </p>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <a href="mailto:richikd68@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} />
                richikd68@gmail.com
              </a>
              <a href="tel:+919560176878" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} />
                +91 9560176878
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-base mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-base mb-4">Stay Updated</h4>
            <p className="text-sm text-background/70 mb-4">
              Get tips on growing your business online.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-accent transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} SkillFull InnoVations. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
