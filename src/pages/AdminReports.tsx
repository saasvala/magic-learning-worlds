import { motion } from "framer-motion";
import { BarChart3, Download, FileText, TrendingUp, Users, GraduationCap, Loader2 } from "lucide-react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

type ReportKey = "performance" | "attendance" | "teachers" | "finance" | "enrollment";

const reportTypes: { key: ReportKey; title: string; desc: string; icon: any; color: string }[] = [
  { key: "performance", title: "Student Performance Report", desc: "Mastery levels, grades, and progress across all subjects", icon: TrendingUp, color: "text-xp-green" },
  { key: "attendance", title: "Attendance Summary", desc: "Daily, weekly, and monthly attendance statistics", icon: Users, color: "text-magic-blue" },
  { key: "teachers", title: "Teacher Roster", desc: "List of teachers and assigned classes", icon: GraduationCap, color: "text-magic-purple" },
  { key: "finance", title: "Financial Summary", desc: "Fee collection, expenses, and financial health", icon: FileText, color: "text-primary" },
  { key: "enrollment", title: "Enrollment Report", desc: "Student enrollment list and demographic data", icon: Users, color: "text-streak-orange" },
];

function toCSV(rows: Record<string, any>[]) {
  if (!rows.length) return "No data available\n";
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map(r => headers.map(h => escape(r[h])).join(","))].join("\n");
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

async function fetchReport(key: ReportKey) {
  switch (key) {
    case "performance": {
      const { data, error } = await supabase.from("results").select("student_id, exam_id, score, total_marks, percentage, passed, submitted_at").order("submitted_at", { ascending: false }).limit(1000);
      if (error) throw error;
      return data ?? [];
    }
    case "attendance": {
      const { data, error } = await supabase.from("attendance").select("student_id, class_id, status, date").order("date", { ascending: false }).limit(1000);
      if (error) throw error;
      return data ?? [];
    }
    case "teachers": {
      const { data, error } = await supabase.from("profiles").select("id, full_name, role, school_id, created_at").eq("role", "teacher");
      if (error) throw error;
      return data ?? [];
    }
    case "finance": {
      const { data, error } = await supabase.from("payments").select("id, amount, currency, status, payment_method, description, paid_at, created_at").order("created_at", { ascending: false }).limit(1000);
      if (error) throw error;
      return data ?? [];
    }
    case "enrollment": {
      const { data, error } = await supabase.from("profiles").select("id, full_name, role, grade, strand, created_at").eq("role", "student");
      if (error) throw error;
      return data ?? [];
    }
  }
}

function AdminReportsPage() {
  const [loading, setLoading] = useState<ReportKey | null>(null);

  const generate = async (key: ReportKey, title: string) => {
    try {
      setLoading(key);
      const rows = await fetchReport(key);
      if (!rows.length) {
        toast({ title: "No data", description: `No records available for ${title}.` });
        return;
      }
      download(`${key}-${new Date().toISOString().slice(0, 10)}.csv`, toCSV(rows as any));
      toast({ title: "Report generated", description: `${rows.length} rows exported.` });
    } catch (e: any) {
      toast({ title: "Failed to generate report", description: e.message ?? "Try again later.", variant: "destructive" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground text-sm">Generate and download school reports as CSV</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((r, i) => {
            const isLoading = loading === r.key;
            return (
              <motion.div key={r.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.02, y: -3 }} className="glass rounded-xl p-5 flex flex-col">
                <r.icon className={`w-6 h-6 ${r.color} mb-3`} />
                <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground flex-1 mb-4">{r.desc}</p>
                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  disabled={isLoading || loading !== null}
                  onClick={() => generate(r.key, r.title)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-gradient-gold text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                  {isLoading ? "Generating…" : "Generate Report"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminReports() {
  return (<AdminPageShell><AdminReportsPage /></AdminPageShell>);
}
