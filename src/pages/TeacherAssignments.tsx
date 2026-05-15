import { motion } from "framer-motion";
import { FileText, Plus, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { StatCardsSkeleton, TableSkeleton } from "@/components/states";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  total_marks: number;
  class_id: string;
  created_at: string;
}

function NewAssignmentDialog({ classes, open, setOpen }: { classes: { id: string; name: string }[]; open: boolean; setOpen: (v: boolean) => void }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classId, setClassId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("100");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      const { error } = await supabase.from("assignments").insert({
        title: title.trim(),
        description: description.trim() || null,
        class_id: classId,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
        total_marks: parseInt(totalMarks, 10) || 100,
        created_by: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Assignment created" });
      qc.invalidateQueries({ queryKey: ["teacher-assignments"] });
      setOpen(false);
      setTitle(""); setDescription(""); setDueDate(""); setTotalMarks("100");
    },
    onError: (e: any) => toast({ title: "Failed to create", description: e.message, variant: "destructive" }),
  });

  const valid = title.trim().length > 0 && classId && parseInt(totalMarks, 10) > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>New assignment</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Math Worksheet: Fractions" /></div>
          <div><Label>Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} /></div>
          <div>
            <Label>Class *</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>
                {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label>Due date</Label><Input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
            <div><Label>Total marks *</Label><Input type="number" min="1" value={totalMarks} onChange={e => setTotalMarks(e.target.value)} /></div>
          </div>
          <Button onClick={() => mutation.mutate()} disabled={!valid || mutation.isPending} className="w-full">
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AssignmentsPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { data: classes } = useQuery({
    queryKey: ["teacher-classes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("classes").select("id, name").eq("teacher_id", user!.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["teacher-assignments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const classIds = (classes ?? []).map(c => c.id);
      if (classIds.length === 0) {
        const { data: own } = await supabase.from("classes").select("id").eq("teacher_id", user!.id);
        const ids = (own ?? []).map(c => c.id);
        if (ids.length === 0) return [] as Assignment[];
        const { data, error } = await supabase.from("assignments").select("*").in("class_id", ids).order("created_at", { ascending: false });
        if (error) throw error;
        return (data ?? []) as Assignment[];
      }
      const { data, error } = await supabase.from("assignments").select("*").in("class_id", classIds).order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Assignment[];
    },
  });

  const items = assignments ?? [];
  const now = Date.now();
  const active = items.filter(a => !a.due_date || new Date(a.due_date).getTime() > now).length;
  const completed = items.filter(a => a.due_date && new Date(a.due_date).getTime() <= now).length;
  const classMap = new Map((classes ?? []).map(c => [c.id, c.name]));

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center"><FileText className="w-5 h-5 text-primary-foreground" /></div>
            <div>
              <h1 className="text-2xl font-bold">Assignments</h1>
              <p className="text-muted-foreground text-sm">Create and track student assignments</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.button whileHover={{ scale: 1.05 }} disabled={!classes || classes.length === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium disabled:opacity-50">
                <Plus className="w-4 h-4" /> New Assignment
              </motion.button>
            </DialogTrigger>
            <NewAssignmentDialog classes={classes ?? []} open={open} setOpen={setOpen} />
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <StatCardsSkeleton count={3} />
            <TableSkeleton rows={5} />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary">{active}</div><div className="text-xs text-muted-foreground">Active</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold text-xp-green">{completed}</div><div className="text-xs text-muted-foreground">Past Due</div></div>
              <div className="glass rounded-xl p-4 text-center"><div className="text-2xl font-bold">{items.length}</div><div className="text-xs text-muted-foreground">Total</div></div>
            </div>

            {items.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center text-muted-foreground text-sm">
                {classes && classes.length === 0 ? "You have no classes yet — ask an admin to assign you a class." : "No assignments yet. Create one to get started."}
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((a, i) => {
                  const isCompleted = a.due_date && new Date(a.due_date).getTime() <= now;
                  return (
                    <motion.div key={a.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? "bg-xp-green/20" : "bg-primary/20"}`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5 text-xp-green" /> : <Clock className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{a.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {classMap.get(a.class_id) ?? "Class"} • {a.due_date ? `Due ${new Date(a.due_date).toLocaleDateString()}` : "No due date"} • {a.total_marks} marks
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isCompleted ? "bg-xp-green/20 text-xp-green" : "bg-primary/20 text-primary"}`}>{isCompleted ? "past due" : "active"}</span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function TeacherAssignments() {
  return (<TeacherPageShell><AssignmentsPage /></TeacherPageShell>);
}
