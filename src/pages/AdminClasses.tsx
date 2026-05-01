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
import { Layers, Plus, Pencil, Trash2, Search } from "lucide-react";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";
import type { Tables } from "@/integrations/supabase/types";

const GRADE_OPTIONS = [
  { value: "lkg", label: "LKG" }, { value: "ukg", label: "UKG" },
  { value: "g1", label: "Grade 1" }, { value: "g2", label: "Grade 2" },
  { value: "g3", label: "Grade 3" }, { value: "g4", label: "Grade 4" },
  { value: "g5", label: "Grade 5" }, { value: "g6", label: "Grade 6" },
  { value: "g7", label: "Grade 7" }, { value: "g8", label: "Grade 8" },
  { value: "g9", label: "Grade 9" }, { value: "g10", label: "Grade 10" },
  { value: "g11", label: "Grade 11" }, { value: "g12", label: "Grade 12" },
];

type ClassRow = Tables<"classes">;

function ClassForm({
  initial,
  onSubmit,
  loading,
  schoolId,
}: {
  initial?: Partial<ClassRow>;
  onSubmit: (data: { name: string; grade: string; section: string; strand: string; academic_year: string }) => void;
  loading: boolean;
  schoolId: string;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [grade, setGrade] = useState(initial?.grade || "");
  const [section, setSection] = useState(initial?.section || "");
  const [strand, setStrand] = useState(initial?.strand || "");
  const [year, setYear] = useState(initial?.academic_year || "2025-2026");

  return (
    <div className="space-y-4">
      <div>
        <Label>Class Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Grade 5 - Section A" />
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Section</Label>
          <Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="A, B, C..." />
        </div>
        <div>
          <Label>Academic Year</Label>
          <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025-2026" />
        </div>
      </div>
      <div>
        <Label>Strand (SHS)</Label>
        <Input value={strand} onChange={(e) => setStrand(e.target.value)} placeholder="STEM, ABM..." />
      </div>
      <Button onClick={() => onSubmit({ name, grade, section, strand, academic_year: year })} disabled={loading || !name || !grade} className="w-full">
        {loading ? "Saving..." : initial?.id ? "Update Class" : "Create Class"}
      </Button>
    </div>
  );
}

function AdminClassesPage() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ClassRow | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const schoolId = profile?.school_id || "";

  const { data: classes = [], isLoading, error, refetch } = useQuery({
    queryKey: ["admin-classes", schoolId],
    queryFn: async () => {
      const query = supabase.from("classes").select("*").order("grade").order("name");
      if (schoolId) query.eq("school_id", schoolId);
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as ClassRow[];
    },
    enabled: !!profile,
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; grade: string; section: string; strand: string; academic_year: string }) => {
      if (!schoolId) throw new Error("No school assigned to your profile. Contact a super admin.");
      const { error } = await supabase.from("classes").insert({
        ...data,
        grade: data.grade as any,
        school_id: schoolId,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      toast({ title: "Class created" });
      setDialogOpen(false);
      setIsAdding(false);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; name: string; grade: string; section: string; strand: string; academic_year: string }) => {
      const { error } = await supabase.from("classes").update({ ...updates, grade: updates.grade as any }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      toast({ title: "Class updated" });
      setDialogOpen(false);
      setEditing(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("classes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      toast({ title: "Class deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const filtered = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const gradeLabel = (g: string) => GRADE_OPTIONS.find((o) => o.value === g)?.label || g;

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Classes</h1>
              <p className="text-xs text-muted-foreground">{classes.length} classes configured</p>
            </div>
          </div>
          <Dialog open={dialogOpen && isAdding} onOpenChange={(open) => { setDialogOpen(open); if (!open) setIsAdding(false); }}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => { setIsAdding(true); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-1" /> Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Class</DialogTitle></DialogHeader>
              <ClassForm
                schoolId={schoolId}
                loading={createMutation.isPending}
                onSubmit={(data) => createMutation.mutate(data)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search classes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          {isLoading ? (
            <LoadingState message="Loading classes..." />
          ) : error ? (
            <ErrorState
              title="Couldn't load classes"
              description="There was a problem fetching the class list."
              onRetry={() => refetch()}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Layers className="w-7 h-7 text-muted-foreground" />}
              title="No classes yet"
              description={search ? "No classes match your search." : "Create your first class to get started."}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Strand</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell><Badge variant="secondary">{gradeLabel(c.grade)}</Badge></TableCell>
                    <TableCell>{c.section || "—"}</TableCell>
                    <TableCell>{c.strand || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.academic_year}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Dialog open={dialogOpen && editing?.id === c.id} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => { setEditing(c); setDialogOpen(true); }}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Class</DialogTitle></DialogHeader>
                          <ClassForm
                            initial={editing || undefined}
                            schoolId={schoolId}
                            loading={updateMutation.isPending}
                            onSubmit={(data) => updateMutation.mutate({ id: c.id, ...data })}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete this class?")) deleteMutation.mutate(c.id); }}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
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

export default function AdminClasses() {
  return (
    <AdminPageShell>
      <AdminClassesPage />
    </AdminPageShell>
  );
}
