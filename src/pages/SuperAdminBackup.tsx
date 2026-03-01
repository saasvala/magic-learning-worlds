import { motion } from "framer-motion";
import { Database, Download, Clock, CheckCircle2, Play, Calendar } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";

const backups = [
  { id: 1, name: "Full Backup - Mar 1", date: "Mar 1, 2026 03:00 AM", size: "2.4 GB", status: "completed", duration: "12m" },
  { id: 2, name: "Full Backup - Feb 28", date: "Feb 28, 2026 03:00 AM", size: "2.3 GB", status: "completed", duration: "11m" },
  { id: 3, name: "Full Backup - Feb 27", date: "Feb 27, 2026 03:00 AM", size: "2.3 GB", status: "completed", duration: "13m" },
  { id: 4, name: "Incremental - Feb 26", date: "Feb 26, 2026 12:00 PM", size: "450 MB", status: "completed", duration: "3m" },
  { id: 5, name: "Full Backup - Feb 25", date: "Feb 25, 2026 03:00 AM", size: "2.2 GB", status: "completed", duration: "10m" },
];

function BackupPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><Database className="w-5 h-5 text-magic-blue" /></div>
            <div>
              <h1 className="text-2xl font-bold">Backup & Recovery</h1>
              <p className="text-muted-foreground text-sm">Manage database backups and restoration points</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium">
            <Play className="w-4 h-4" /> Run Backup Now
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center"><div className="text-xl font-bold text-xp-green">Healthy</div><div className="text-xs text-muted-foreground">Backup Status</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-xl font-bold">Daily 3:00 AM</div><div className="text-xs text-muted-foreground">Schedule</div></div>
          <div className="glass rounded-xl p-4 text-center"><div className="text-xl font-bold">30 days</div><div className="text-xs text-muted-foreground">Retention</div></div>
        </div>

        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Backup History</h3>
          <div className="space-y-2">
            {backups.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <CheckCircle2 className="w-4 h-4 text-xp-green shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.date} • {b.duration}</div>
                </div>
                <span className="text-xs text-muted-foreground">{b.size}</span>
                <motion.button whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminBackup() {
  return (<SuperAdminPageShell><BackupPage /></SuperAdminPageShell>);
}
