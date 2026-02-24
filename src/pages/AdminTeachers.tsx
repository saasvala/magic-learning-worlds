import { useState } from "react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, Pencil, Search } from "lucide-react";

type TeacherProfile = {
  id: string;
  full_name: string;
  language: string;
  created_at: string;
};

function TeacherForm({
  initial,
  onSubmit,
  loading,
}: {
  initial?: Partial<TeacherProfile>;
  onSubmit: (data: { full_name: string }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(initial?.full_name || "");

  return (
    <div className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Teacher name" />
      </div>
      <Button onClick={() => onSubmit({ full_name: name })} disabled={loading || !name} className="w-full">
        {loading ? "Saving..." : "Update Teacher"}
      </Button>
    </div>
  );
}

function AdminTeachersPage() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeacherProfile | null>(null);

  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["admin-teachers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "teacher")
        .order("full_name");
      if (error) throw error;
      return (data || []) as unknown as TeacherProfile[];
    },
    enabled: !!profile,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; full_name: string }) => {
      const { error } = await supabase.from("profiles").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-teachers"] });
      toast({ title: "Teacher updated" });
      setDialogOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const filtered = teachers.filter((t) =>
    t.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Teachers</h1>
              <p className="text-xs text-muted-foreground">{teachers.length} teachers registered</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading teachers...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No teachers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.full_name}</TableCell>
                    <TableCell>{t.language}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(t.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog open={dialogOpen && editing?.id === t.id} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => { setEditing(t); setDialogOpen(true); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Teacher</DialogTitle></DialogHeader>
                          <TeacherForm
                            initial={editing || undefined}
                            loading={updateMutation.isPending}
                            onSubmit={(data) => updateMutation.mutate({ id: t.id, ...data })}
                          />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminTeachers() {
  return (
    <AdminPageShell>
      <AdminTeachersPage />
    </AdminPageShell>
  );
}
