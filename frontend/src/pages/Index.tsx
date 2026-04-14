import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Cpu, Network, Workflow, Zap, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Grid background */}
    <div className="absolute inset-0 grid-pattern opacity-30" />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

    <div className="container relative z-10 px-6 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl"
      >
        

        <motion.h1 custom={1} variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Build Virtual Company by
          <br />
          <span className="gradient-text">Multi Agent Collaboration</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
          A modular AI orchestration platform that dynamically creates and coordinates specialized agents.
          From intent detection to collaborative execution — all powered by LLMs.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="group flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Start
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#about"
            className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      {/* Terminal preview */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-20 max-w-3xl"
      >
        <div className="rounded-xl border border-border bg-card glow-border overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-xs font-mono text-muted-foreground">AgentVerse — pipeline</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-left">
            <p className="text-muted-foreground">$ AgentVerse run <span className="text-primary">"Analyze this startup idea"</span></p>
            <p className="mt-2 text-muted-foreground">
              <span className="text-primary">→</span> Intent detected: <span className="text-accent">business_analysis</span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">→</span> Creating agents: <span className="text-foreground">market_analyst, risk_assessor, strategy_planner</span>
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">→</span> Pipeline status: <span className="text-green-400">running</span>
            </p>
            <p className="mt-2 text-muted-foreground">
              <span className="text-primary">✓</span> <span className="text-foreground">Analysis complete.</span> 3 agents executed in 4.2s
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const features = [
  { icon: Brain, title: "LLM-Powered Routing", desc: "AI analyzes user intent and decides which agents to deploy — no hardcoded rules." },
  { icon: Workflow, title: "Dynamic Agent Creation", desc: "Agents are created at runtime using a factory pattern based on LLM decisions." },
  { icon: Network, title: "Multi-Agent Collaboration", desc: "Agents work together through an orchestration pipeline with shared context." },
  { icon: Cpu, title: "Modular Architecture", desc: "Clean separation of concerns — processor, handler, orchestrator, and agents." },
  { icon: Zap, title: "FastAPI Backend", desc: "High-performance async API with automatic Swagger docs and explainable outputs." },
  { icon: Shield, title: "Fault Tolerant", desc: "Graceful fallback logic ensures the system works even when LLM calls fail." },
];

const AboutSection = () => (
  <section id="about" className="relative py-32">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          About <span className="gradient-text">AgentVerse</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          AgentVerse is a production-ready AI orchestration platform built from scratch. 
          It uses LLMs to intelligently route queries and dynamically create specialized agents 
          for any domain — business, healthcare, education, and beyond.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl border border-border bg-card p-6 hover:glow-border transition-all duration-300"
          >
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="relative py-32 border-t border-border">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground mb-10">
          Have questions or want to collaborate? Reach out and we'll get back to you.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto max-w-lg space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
        <textarea
          rows={5}
          placeholder="Your message..."
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
        />
        <button
          type="submit"
          className="w-full rounded-lg gradient-primary py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Send Message
        </button>
      </motion.form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2026 AgentVerse. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
        <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <>
    <HeroSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
