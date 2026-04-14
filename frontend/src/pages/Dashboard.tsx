import { motion } from "framer-motion";
import { Bot, ChevronLeft, Clock, Send, User } from "lucide-react";
import { useEffect, useState } from "react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

interface Agent {
  name: string;
  icon: React.ElementType;
  status: "idle" | "running" | "done";
  detail?: string;
}

const mockHistory = [
  { id: 1, title: "Analyze startup idea", date: "Today" },
  { id: 2, title: "Market research — SaaS", date: "Today" },
  { id: 3, title: "Risk assessment for fintech", date: "Yesterday" },
  { id: 4, title: "Education platform plan", date: "Yesterday" },
  { id: 5, title: "Healthcare compliance check", date: "Mar 5" },
];

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "ai", text: "Hello! I'm AgentVerse. Describe your idea or query and I'll orchestrate the right agents for you.", timestamp: "10:30 AM" },
  ]);
  const [input, setInput] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedChat, setSelectedChat] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);

    const userQuery = input;

    setInput("");

    try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: userQuery
      })
    });

    const data = await response.json();
    // Simulate agent activation
    setAgents(
    data.agents.map((a: any) => ({
    name: a.agent_name.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    icon: Bot,
    status: a.status === "completed" ? "done" : "running",
    detail: a.status === "completed" ? "Complete" : "Running..."
  }))
);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: data.step_5,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 2000);
    } catch (error) {

    console.error("API ERROR:", error);
  }
};

  const statusColor = (s: Agent["status"]) =>
    s === "running" ? "text-yellow-400" : s === "done" ? "text-green-400" : "text-muted-foreground";

  const statusDot = (s: Agent["status"]) =>
    s === "running" ? "bg-yellow-400 animate-pulse" : s === "done" ? "bg-green-400" : "bg-muted-foreground/40";

  return (
    <div className="flex h-screen pt-16 bg-background">
      {/* LEFT — Chat History */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} shrink-0 border-r border-border bg-card transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground font-mono">Chat History</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {mockHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors ${
                selectedChat === chat.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <p className="truncate font-medium">{chat.title}</p>
              <p className="text-xs mt-0.5 opacity-60">{chat.date}</p>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <button className="w-full rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            + New Chat
          </button>
        </div>
      </motion.aside>

      {/* CENTER — Chat Window */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground mr-1">
              <Clock className="h-4 w-4" />
            </button>
          )}
          <Bot className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">AgentVerse Chat</span>
          <span className="ml-auto text-xs font-mono text-muted-foreground">Session #{selectedChat}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className="text-[10px] mt-1.5 opacity-50">{msg.timestamp}</p>
              </div>
              {msg.role === "user" && (
                <div className="shrink-0 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Describe your idea or query…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={handleSend}
              className="rounded-lg gradient-primary p-2 text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT — Agent Activity */}
      <motion.aside
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex w-72 shrink-0 flex-col border-l border-border bg-card"
      >
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground font-mono">Agent Activity</h2>
          <p className="text-xs text-muted-foreground mt-1">Live agent pipeline status</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-xl border border-border bg-background p-4 transition-all hover:glow-border"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <agent.icon className={`h-4 w-4 ${statusColor(agent.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{agent.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{agent.detail || "Waiting…"}</p>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${statusDot(agent.status)}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-xs font-mono text-muted-foreground">
              {agents.filter((a) => a.status === "done").length}/{agents.length} agents complete
            </p>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default Dashboard;
