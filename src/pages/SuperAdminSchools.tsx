import { motion } from "framer-motion";
import { Building2, Search, Plus, Eye, Users, TrendingUp, MapPin } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { useState } from "react";

const schools = [
  { id: 1, name: "Mabini Academy", code: "MAB-2025", city: "Manila", region: "NCR", students: 2847, teachers: 156, plan: "Premium", status: "active", mastery: 78 },
  { id: 2, name: "Rizal National HS", code: "RIZ-2025", city: "Laguna", region: "CALABARZON", students: 4200, teachers: 210, plan: "Enterprise", status: "active", mastery: 82 },
  { id: 3, name: "Bonifacio School", code: "BON-2025", city: "Cebu", region: "Central Visayas", students: 1580, teachers: 85, plan: "Standard", status: "active", mastery: 71 },
  { id: 4, name: "Luna Academy", code: "LUN-2025", city: "Davao", region: "Davao", students: 980, teachers: 52, plan: "Premium", status: "trial", mastery: 0 },
  { id: 5, name: "Del Pilar Institute", code: "DEL-2025", city: "Iloilo", region: "Western Visayas", students: 650, teachers: 35, plan: "Standard", status: "active", mastery: 74 },
  { id: 6, name: "Aguinaldo Academy", code: "AGU-2025", city: "Cavite", region: "CALABARZON", students: 1200, teachers: 68, plan: "Premium", status: "active", mastery: 80 },
];

function SchoolsPage() {
  const [search, setSearch] = useState("");
  const filtered = schools.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><Building2 className="w-5 h-5 text-magic-blue" /></div>
            <div>
              <h1 className="text-2xl font-bold">Schools</h1>
              <p className="text-muted-foreground text-sm">{schools.length} schools • {schools.reduce((s, sc) => s + sc.students, 0).toLocaleString()} total students</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input placeholder="Search schools..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary w-48" /></div>
            <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium"><Plus className="w-4 h-4" /> Add School</motion.button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02, y: -3 }} className="glass rounded-xl p-5 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{s.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.status === "active" ? "bg-xp-green/20 text-xp-green" : "bg-streak-orange/20 text-streak-orange"}`}>{s.status}</span>
              </div>
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{s.city}, {s.region}</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-muted/50 rounded-lg p-2 text-center"><div className="text-sm font-bold">{s.students.toLocaleString()}</div><div className="text-[10px] text-muted-foreground">Students</div></div>
                <div className="bg-muted/50 rounded-lg p-2 text-center"><div className="text-sm font-bold">{s.teachers}</div><div className="text-[10px] text-muted-foreground">Teachers</div></div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  s.plan === "Enterprise" ? "bg-magic-purple/20 text-magic-purple" : s.plan === "Premium" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>{s.plan}</span>
                {s.mastery > 0 && <span className="text-xs text-muted-foreground">Mastery: <span className="font-bold text-primary">{s.mastery}%</span></span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SuperAdminSchools() {
  return (<SuperAdminPageShell><SchoolsPage /></SuperAdminPageShell>);
}
