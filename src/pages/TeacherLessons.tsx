import { motion } from "framer-motion";
import { BookOpen, FileText, Clock, Eye, Plus, Video, File, Play } from "lucide-react";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState, EmptyState, ErrorState } from "@/components/states";
import { toast } from "sonner";

const typeIcons: Record<string, typeof Video> = { video: Video, pdf: File, interactive: Play, text: FileText };

function LessonsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", chapter_id: "", content_type: "video", content_url: "", content_body: "", duration_minutes: "" });

  const { data: chapters } = useQuery({
    queryKey: ["chapters-list"],
    queryFn: async () => {
      const { data } = await supabase.from("chapters").select("id, name, subject_id, subjects(name)").order("order_index");
      return data || [];
    },
  });

  const { data: lessons, isLoading, error, refetch } = useQuery({
    queryKey: ["teacher-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("id, title, content_type, duration_minutes, chapter_id, created_at, chapters(name, subjects(name))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!form.title.trim()) throw new Error("Title required");
      if (!form.chapter_id) throw new Error("Chapter required");
      const { error } = await supabase.from("lessons").insert({
        title: form.title.trim(),
        chapter_id: form.chapter_id,
        content_type: form.content_type,
        content_url: form.content_url || null,
        content_body: form.content_body || null,
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lesson created");
      setOpen(false);
      setForm({ title: "", chapter_id: "", content_type: "video", content_url: "", content_body: "", duration_minutes: "" });
      qc.invalidateQueries({ queryKey: ["teacher-lessons"] });
    },
    onError: (e: any) => toast.error(e.message || "Failed to create lesson"),
  });

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lesson Manager</h1>
              <p className="text-muted-foreground text-sm">{lessons?.length ?? 0} lessons</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-magic text-secondary-foreground text-sm font-medium shadow-glow-purple">
                <Plus className="w-4 h-4" /> New Lesson
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Lesson</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div>
                  <Label>Chapter</Label>
                  <Select value={form.chapter_id} onValueChange={v => setForm({ ...form, chapter_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Select chapter" /></SelectTrigger>
                    <SelectContent>
                      {(chapters || []).map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.subjects?.name ? `${c.subjects.name} — ` : ""}{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={form.content_type} onValueChange={v => setForm({ ...form, content_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="interactive">Interactive</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Content URL (optional)</Label><Input value={form.content_url} onChange={e => setForm({ ...form, content_url: e.target.value })} /></div>
                <div><Label>Body (optional)</Label><Textarea value={form.content_body} onChange={e => setForm({ ...form, content_body: e.target.value })} /></div>
                <div><Label>Duration (minutes)</Label><Input type="number" value={form.duration_minutes} onChange={e => setForm({ ...form, duration_minutes: e.target.value })} /></div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => create.mutate()} disabled={create.isPending}>{create.isPending ? "Saving..." : "Create"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <LoadingState variant="skeleton" rows={5} />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !lessons || lessons.length === 0 ? (
          <EmptyState title="No lessons yet" description="Create your first lesson to get started." />
        ) : (
          <div className="space-y-3">
            {lessons.map((l: any, i) => {
              const TypeIcon = typeIcons[l.content_type] || FileText;
              return (
                <motion.div key={l.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    l.content_type === "video" ? "bg-magic-blue/20" : l.content_type === "interactive" ? "bg-magic-purple/20" : "bg-muted"
                  }`}>
                    <TypeIcon className={`w-5 h-5 ${l.content_type === "video" ? "text-magic-blue" : l.content_type === "interactive" ? "text-magic-purple" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{l.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {l.chapters?.subjects?.name ?? "—"} • {l.chapters?.name ?? "Unassigned"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground">
                    {l.duration_minutes ? <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{l.duration_minutes}m</span> : null}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground capitalize">{l.content_type}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function TeacherLessons() {
  return (
    <TeacherPageShell>
      <LessonsPage />
    </TeacherPageShell>
  );
}
