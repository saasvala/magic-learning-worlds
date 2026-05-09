import { motion } from "framer-motion";
import { MessageSquare, Send, Search } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";
import { DemoBadge } from "@/components/states/DemoBadge";

const conversations = [
  { id: 1, name: "Maria Santos (Parent)", lastMsg: "Thank you for the update on Maria's progress!", time: "10m", unread: 0 },
  { id: 2, name: "Carlos Garcia", lastMsg: "Sir, can I resubmit my Math worksheet?", time: "1h", unread: 1 },
  { id: 3, name: "Ana Lopez (Parent)", lastMsg: "Ana has been sick this week. Will send medical cert.", time: "3h", unread: 1 },
  { id: 4, name: "Bea Reyes", lastMsg: "Ma'am, the Science project is ready for review.", time: "1d", unread: 0 },
  { id: 5, name: "Grade 5-A (Group)", lastMsg: "Reminder: Quiz tomorrow on Chapter 5!", time: "2d", unread: 0 },
];

const messages = [
  { sender: "Carlos Garcia", content: "Good morning Sir! I wanted to ask about my Math worksheet.", time: "9:00 AM", isMe: false },
  { sender: "Me", content: "Good morning Carlos! What about it?", time: "9:05 AM", isMe: true },
  { sender: "Carlos Garcia", content: "I made some mistakes on problems 3-5. Can I redo them?", time: "9:06 AM", isMe: false },
  { sender: "Me", content: "Yes, you can resubmit by Friday. Just make sure to show your solutions clearly this time.", time: "9:10 AM", isMe: true },
  { sender: "Carlos Garcia", content: "Sir, can I resubmit my Math worksheet?", time: "9:15 AM", isMe: false },
];

function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(2);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground text-sm">Communicate with students and parents</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[400px]">
          {/* Conversation List */}
          <div className="glass rounded-xl p-3 overflow-y-auto">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search messages..." className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1">
              {conversations.map(c => (
                <motion.button
                  key={c.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedConvo(c.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                    selectedConvo === c.id ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{c.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium flex justify-between">
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMsg}</div>
                  </div>
                  {c.unread > 0 && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">{c.unread}</div>}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 glass rounded-xl flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="font-semibold text-sm">{conversations.find(c => c.id === selectedConvo)?.name}</div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
                  }`}>
                    {m.content}
                    <div className={`text-[10px] mt-1 ${m.isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary"
              />
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Send className="w-4 h-4 text-primary-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TeacherMessages() {
  return (
    <TeacherPageShell>
      <MessagesPage />
    </TeacherPageShell>
  );
}
