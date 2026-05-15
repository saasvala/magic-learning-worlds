import { motion } from "framer-motion";
import { Building2, Search, Plus, MapPin, Loader2 } from "lucide-react";
import { SuperAdminPageShell } from "@/components/SuperAdminPageShell";
import { TableSkeleton } from "@/components/states";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface School {
  id: string;
  name: string;
  code: string;
  city: string | null;
  region: string | null;
  subscription_status: string;
  max_students: number;
  max_teachers: number;
}

function AddSchoolDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("schools").insert({ name, code, city: city || null, region: region || null });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "School added" });
      qc.invalidateQueries({ queryKey: ["super-admin-schools"] });
      setOpen(false);
      setName(""); setCode(""); setCity(""); setRegion("");
    },
    onError: (e: any) => toast({ title: "Failed to add school", description: e.message, variant: "destructive" }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add school</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
          <div><Label>Code</Label><Input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. MAB-2025" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label>City</Label><Input value={city} onChange={e => setCity(e.target.value)} /></div>
            <div><Label>Region</Label><Input value={region} onChange={e => setRegion(e.target.value)} /></div>
          </div>
          <Button onClick={() => mutation.mutate()} disabled={!name || !code || mutation.isPending} className="w-full">
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data: schools, isLoading } = useQuery({
    queryKey: ["super-admin-schools"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schools").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as School[];
    },
  });

  const filtered = (schools ?? []).filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const totalCapacity = (schools ?? []).reduce((acc, s) => acc + (s.max_students || 0), 0);

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magic-blue/20 flex items-center justify-center"><Building2 className="w-5 h-5 text-magic-blue" /></div>
            <div>
              <h1 className="text-2xl font-bold">Schools</h1>
              <p className="text-muted-foreground text-sm">{schools?.length ?? 0} schools • {totalCapacity.toLocaleString()} student capacity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input placeholder="Search schools..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-1 focus:ring-primary w-48" /></div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium"><Plus className="w-4 h-4" /> Add School</motion.button>
              </DialogTrigger>
              <AddSchoolDialog open={open} setOpen={setOpen} />
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : filtered.length === 0 ? (
          <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">
            {search ? "No schools match your search." : "No schools yet. Add one to get started."}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02, y: -3 }} className="glass rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">{s.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.subscription_status === "active" ? "bg-xp-green/20 text-xp-green" : s.subscription_status === "trial" ? "bg-streak-orange/20 text-streak-orange" : "bg-muted text-muted-foreground"}`}>{s.subscription_status}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" />{s.city || "—"}{s.region ? `, ${s.region}` : ""}</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-muted/50 rounded-lg p-2 text-center"><div className="text-sm font-bold">{s.max_students.toLocaleString()}</div><div className="text-[10px] text-muted-foreground">Max Students</div></div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center"><div className="text-sm font-bold">{s.max_teachers}</div><div className="text-[10px] text-muted-foreground">Max Teachers</div></div>
                </div>
                <div className="text-[10px] text-muted-foreground">Code: <span className="font-mono">{s.code}</span></div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function SuperAdminSchools() {
  return (<SuperAdminPageShell><SchoolsPage /></SuperAdminPageShell>);
}
