import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeacherPageShell } from "@/components/TeacherPageShell";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Plus, Trash2, Save, GraduationCap, CheckCircle2,
  ChevronDown, ChevronUp, Sparkles
} from "lucide-react";

type QuestionType = "mcq" | "short_answer" | "essay";
type Difficulty = "easy" | "moderate" | "hard";

interface QuestionDraft {
  id: string;
  type: QuestionType;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: Difficulty;
  points: number;
}

const emptyQuestion = (): QuestionDraft => ({
  id: crypto.randomUUID(),
  type: "mcq",
  question_text: "",
  options: ["", "", "", ""],
  correct_answer: "",
  explanation: "",
  difficulty: "moderate",
  points: 1,
});

const typeLabels: Record<QuestionType, { label: string; emoji: string }> = {
  mcq: { label: "Multiple Choice", emoji: "🔘" },
  short_answer: { label: "Short Answer", emoji: "✏️" },
  essay: { label: "Essay", emoji: "📝" },
};

const difficultyColors: Record<Difficulty, string> = {
  easy: "bg-xp-green/20 text-xp-green",
  moderate: "bg-primary/20 text-primary",
  hard: "bg-destructive/20 text-destructive",
};

export default function TeacherQuizBuilder() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionDraft[]>([emptyQuestion()]);
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id ?? null);
  const [saving, setSaving] = useState(false);
  const [chapterId, setChapterId] = useState("");

  const updateQuestion = (id: string, updates: Partial<QuestionDraft>) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const updateOption = (qId: string, idx: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === qId ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) } : q
      )
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  };

  const addQuestion = () => {
    const q = emptyQuestion();
    setQuestions((qs) => [...qs, q]);
    setExpandedId(q.id);
  };

  const saveAll = async () => {
    if (!user) return;
    if (!chapterId.trim()) {
      toast({ title: "Chapter ID required", description: "Enter a chapter ID to associate questions with.", variant: "destructive" });
      return;
    }

    const invalid = questions.find((q) => !q.question_text.trim() || !q.correct_answer.trim());
    if (invalid) {
      toast({ title: "Incomplete question", description: "Each question needs text and a correct answer.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const rows = questions.map((q) => ({
      chapter_id: chapterId.trim(),
      question_type: q.type as any,
      question_text: q.question_text,
      options: q.type === "mcq" ? q.options.filter(Boolean) : null,
      correct_answer: q.correct_answer,
      explanation: q.explanation || null,
      difficulty: q.difficulty,
      points: q.points,
      created_by: user.id,
    }));

    const { error } = await supabase.from("question_bank").insert(rows);
    setSaving(false);

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `${questions.length} question(s) saved!`, description: "Questions added to the question bank." });
      setQuestions([emptyQuestion()]);
      setExpandedId(null);
    }
  };

  return (
    <TeacherPageShell>
      <div className="p-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-magic flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Quiz Builder</h1>
              <p className="text-sm text-muted-foreground">Create questions and save them to the question bank.</p>
            </div>
          </div>

          {/* Chapter ID */}
          <div className="glass rounded-xl p-4 mb-6">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chapter ID</label>
            <input
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              placeholder="Paste the chapter UUID here"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <AnimatePresence>
              {questions.map((q, idx) => {
                const isOpen = expandedId === q.id;
                return (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="glass rounded-xl overflow-hidden"
                  >
                    {/* Header */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : q.id)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/20 transition-colors"
                    >
                      <span className="text-lg">{typeLabels[q.type].emoji}</span>
                      <span className="flex-1 text-sm font-medium truncate">
                        {q.question_text || `Question ${idx + 1}`}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColors[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>

                    {/* Body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 space-y-4 overflow-hidden"
                        >
                          {/* Type & Difficulty row */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">Type</label>
                              <select
                                value={q.type}
                                onChange={(e) => updateQuestion(q.id, { type: e.target.value as QuestionType })}
                                className="w-full px-3 py-2 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-primary"
                              >
                                <option value="mcq">Multiple Choice</option>
                                <option value="short_answer">Short Answer</option>
                                <option value="essay">Essay</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">Difficulty</label>
                              <select
                                value={q.difficulty}
                                onChange={(e) => updateQuestion(q.id, { difficulty: e.target.value as Difficulty })}
                                className="w-full px-3 py-2 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-primary"
                              >
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="hard">Hard</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">Points</label>
                              <input
                                type="number"
                                min={1}
                                value={q.points}
                                onChange={(e) => updateQuestion(q.id, { points: Number(e.target.value) || 1 })}
                                className="w-full px-3 py-2 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>

                          {/* Question text */}
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Question</label>
                            <textarea
                              rows={2}
                              value={q.question_text}
                              onChange={(e) => updateQuestion(q.id, { question_text: e.target.value })}
                              placeholder="Enter your question..."
                              className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary resize-none"
                            />
                          </div>

                          {/* MCQ options */}
                          {q.type === "mcq" && (
                            <div className="space-y-2">
                              <label className="text-xs text-muted-foreground block">Options</label>
                              {q.options.map((opt, oi) => (
                                <div key={oi} className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => updateQuestion(q.id, { correct_answer: opt })}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                      q.correct_answer === opt && opt
                                        ? "bg-xp-green text-background"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                    title="Mark as correct"
                                  >
                                    {q.correct_answer === opt && opt ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{String.fromCharCode(65 + oi)}</span>}
                                  </button>
                                  <input
                                    value={opt}
                                    onChange={(e) => updateOption(q.id, oi, e.target.value)}
                                    placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                                    className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Correct answer for non-MCQ */}
                          {q.type !== "mcq" && (
                            <div>
                              <label className="text-xs text-muted-foreground mb-1 block">
                                {q.type === "essay" ? "Expected answer / rubric keywords" : "Correct Answer"}
                              </label>
                              <textarea
                                rows={q.type === "essay" ? 3 : 1}
                                value={q.correct_answer}
                                onChange={(e) => updateQuestion(q.id, { correct_answer: e.target.value })}
                                placeholder="Enter the correct answer..."
                                className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary resize-none"
                              />
                            </div>
                          )}

                          {/* Explanation */}
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Explanation (optional)</label>
                            <textarea
                              rows={2}
                              value={q.explanation}
                              onChange={(e) => updateQuestion(q.id, { explanation: e.target.value })}
                              placeholder="Why is this the correct answer?"
                              className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary resize-none"
                            />
                          </div>

                          {/* Remove */}
                          {questions.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removeQuestion(q.id)} className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4 mr-1" /> Remove
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" onClick={addQuestion} className="gap-2">
              <Plus className="w-4 h-4" /> Add Question
            </Button>
            <Button onClick={saveAll} disabled={saving || !questions.length} className="gap-2 bg-gradient-gold text-primary-foreground shadow-glow-gold hover:opacity-90">
              {saving ? (
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Saving...</span>
              ) : (
                <><Save className="w-4 h-4" /> Save {questions.length} Question{questions.length > 1 ? "s" : ""}</>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </TeacherPageShell>
  );
}
