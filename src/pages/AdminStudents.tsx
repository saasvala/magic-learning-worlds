import { useState } from "react";
import { AdminPageShell } from "@/components/AdminPageShell";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Users, Plus, Pencil, Trash2, Search, GraduationCap } from "lucide-react";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";

const GRADE_OPTIONS = [
  { value: "lkg", label: "LKG" }, { value: "ukg", label: "UKG" },
  { value: "g1", label: "Grade 1" }, { value: "g2", label: "Grade 2" },
  { value: "g3", label: "Grade 3" }, { value: "g4", label: "Grade 4" },
  { value: "g5", label: "Grade 5" }, { value: "g6", label: "Grade 6" },
  { value: "g7", label: "Grade 7" }, { value: "g8", label: "Grade 8" },
  { value: "g9", label: "Grade 9" }, { value: "g10", label: "Grade 10" },
  { value: "g11", label: "Grade 11" }, { value: "g12", label: "Grade 12" },
];

type StudentProfile = {
  id: string;
  full_name: string;
  grade: string | null;
  strand: string | null;
  xp_total: number;
  level: number;
  rank_title: string;
  daily_streak: number;
  language: string;
  created_at: string;
};

function StudentForm({
  initial,
  onSubmit,
  loading,
}: {
  initial?: Partial<StudentProfile>;
  onSubmit: (data: { full_name: string; grade: string; strand: string }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(initial?.full_name || "");
  const [grade, setGrade] = useState(initial?.grade || "");
  const [strand, setStrand] = useState(initial?.strand || "");

  return (
    <div className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" />
      </div>
      <div>
        <Label>Grade Level</Label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
          <SelectContent>
            {GRADE_OPTIONS.map((g) => (
              <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Strand (SHS only)</Label>
        <Input value={strand} onChange={(e) => setStrand(e.target.value)} placeholder="STEM, ABM, HUMSS..." />
      </div>
      <Button onClick={() => onSubmit({ full_name: name, grade, strand })} disabled={loading || !name || !grade} className="w-full">
        {loading ? "Saving..." : initial?.id ? "Update Student" : "Add Student"}
      </Button>
    </div>
  );
}

function AdminStudentsPage() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StudentProfile | null>(null);

  const schoolId = profile?.school_id;

  const { data: students = [], isLoading, error, refetch } = useQuery({
    queryKey: ["admin-students", schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("full_name");
      if (error) throw error;
      return (data || []) as unknown as StudentProfile[];
    },
    enabled: !!profile,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; full_name: string; grade: string; strand: string }) => {
      const { error } = await supabase.from("profiles").update({ ...updates, grade: updates.grade as any }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students"] });
      toast({ title: "Student updated successfully" });
      setDialogOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const filtered = students.filter((s) =>
    s.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const gradeLabel = (g: string | null) => GRADE_OPTIONS.find((o) => o.value === g)?.label || g || "—";

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Students</h1>
              <p className="text-xs text-muted-foreground">{students.length} students enrolled</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          {isLoading ? (
            <LoadingState message="Loading students..." />
          ) : error ? (
            <ErrorState
              title="Couldn't load students"
              description="There was a problem fetching the student list."
              onRetry={() => refetch()}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<GraduationCap className="w-7 h-7 text-muted-foreground" />}
              title="No students found"
              description={search ? "Try adjusting your search query." : "Add your first student to get started."}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Strand</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell><Badge variant="secondary">{gradeLabel(s.grade)}</Badge></TableCell>
                    <TableCell>{s.strand || "—"}</TableCell>
                    <TableCell>Lv. {s.level}</TableCell>
                    <TableCell className="text-xp-green font-medium">{s.xp_total.toLocaleString()} XP</TableCell>
                    <TableCell>{s.daily_streak > 0 ? `🔥 ${s.daily_streak}` : "—"}</TableCell>
                    <TableCell className="text-right">
                      <Dialog open={dialogOpen && editing?.id === s.id} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => { setEditing(s); setDialogOpen(true); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
                          <StudentForm
                            initial={editing || undefined}
                            loading={updateMutation.isPending}
                            onSubmit={(data) => updateMutation.mutate({ id: s.id, ...data })}
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

export default function AdminStudents() {
  return (
    <AdminPageShell>
      <AdminStudentsPage />
    </AdminPageShell>
  );
}
