import { motion } from "framer-motion";
import { ParentPageShell } from "@/components/ParentPageShell";
import { MessageSquare } from "lucide-react";
import { DemoBadge } from "@/components/states/DemoBadge";

const conversations = [
  { teacher: "Ms. Reyes", subject: "Math", lastMsg: "Maria is doing great in algebra! She scored 92% on the last test.", time: "2h ago", unread: 2, avatar: "R" },
  { teacher: "Mr. Cruz", subject: "Science", lastMsg: "Juan needs to submit his lab report by tomorrow.", time: "5h ago", unread: 1, avatar: "C" },
  { teacher: "Ms. Dela Cruz", subject: "English", lastMsg: "Great improvement in reading comprehension this quarter.", time: "1d ago", unread: 0, avatar: "D" },
  { teacher: "Mr. Garcia", subject: "History", lastMsg: "Reminder: History project due next Friday.", time: "2d ago", unread: 0, avatar: "G" },
];

function MessagesPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-magic-blue" /></div>
          <div><h1 className="text-2xl font-bold">💬 Guild Chat</h1><p className="text-sm text-muted-foreground">Messages from your children's teachers</p></div>
        </div>

        <div className="space-y-3">
          {conversations.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 border border-transparent transition-all">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-sm font-bold">{c.avatar}</div>
                {c.unread > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[9px] font-bold flex items-center justify-center">{c.unread}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{c.teacher}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{c.subject}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.lastMsg}</div>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{c.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ParentMessages() {
  return <ParentPageShell><MessagesPage /></ParentPageShell>;
}
