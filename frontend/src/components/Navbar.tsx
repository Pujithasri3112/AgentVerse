import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">AgentVerse</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && (
            <>
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </>
          )}
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 p-6">
            {isHome && (
              <>
                <a href="#about" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">About</a>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Contact</a>
              </>
            )}
            <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Log in</Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)} className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground text-center">Get Started</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
