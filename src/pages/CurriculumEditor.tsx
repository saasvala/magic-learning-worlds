import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminPageShell } from "@/components/AdminPageShell";
import {
  BookOpen, ChevronRight, ChevronDown, GripVertical, Plus, Edit, Film,
  ArrowLeft, FileText, Play, Image, Cube, Music, Link2
} from "lucide-react";

interface Topic {
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  title: string;
  type: "video" | "text" | "interactive" | "3d";
  duration: string;
  mediaUrl?: string;
}

interface Chapter {
  title: string;
  topics: Topic[];
  status: "complete" | "in_progress" | "draft";
}

interface SubjectData {
  name: string;
  emoji: string;
  chapters: Chapter[];
}

interface GradeData {
  grade: string;
  subjects: SubjectData[];
}

const mediaIcon = (type: string) => {
  const icons: Record<string, any> = { video: Play, text: FileText, interactive: Film, "3d": Cube };
  const Icon = icons[type] || FileText;
  return <Icon className="w-3.5 h-3.5" />;
};

const curriculum: GradeData[] = [
  {
    grade: "Grade 7", subjects: [
      {
        name: "Mathematics", emoji: "📐", chapters: [
          {
            title: "Sets & Numbers", status: "complete", topics: [
              { title: "Introduction to Sets", lessons: [
                { title: "What is a Set?", type: "video", duration: "8 min" },
                { title: "Set Notation", type: "text", duration: "5 min" },
                { title: "Set Builder Game", type: "interactive", duration: "10 min" },
              ]},
              { title: "Union & Intersection", lessons: [
                { title: "Venn Diagram Explorer", type: "interactive", duration: "12 min" },
                { title: "Practice Problems", type: "text", duration: "15 min" },
              ]},
              { title: "Number Systems", lessons: [
                { title: "Natural to Real Numbers", type: "video", duration: "10 min" },
                { title: "Number Line 3D Model", type: "3d", duration: "8 min" },
              ]},
            ]
          },
          {
            title: "Algebra Basics", status: "complete", topics: [
              { title: "Variables & Expressions", lessons: [
                { title: "Intro to Variables", type: "video", duration: "7 min" },
                { title: "Expression Builder", type: "interactive", duration: "10 min" },
              ]},
              { title: "Solving Equations", lessons: [
                { title: "Balance Method", type: "video", duration: "12 min" },
                { title: "Step-by-Step Solver", type: "interactive", duration: "15 min" },
              ]},
            ]
          },
          {
            title: "Geometry", status: "in_progress", topics: [
              { title: "Points, Lines, Planes", lessons: [
                { title: "Basic Elements", type: "video", duration: "6 min" },
                { title: "3D Geometry Viewer", type: "3d", duration: "10 min" },
              ]},
            ]
          },
        ]
      },
      {
        name: "Science", emoji: "🔬", chapters: [
          {
            title: "Matter & Energy", status: "complete", topics: [
              { title: "States of Matter", lessons: [
                { title: "Solid, Liquid, Gas", type: "video", duration: "8 min" },
                { title: "Phase Change Sim", type: "interactive", duration: "12 min" },
              ]},
              { title: "Energy Forms", lessons: [
                { title: "Types of Energy", type: "video", duration: "9 min" },
                { title: "Energy Transfer Lab", type: "interactive", duration: "15 min" },
              ]},
            ]
          },
          {
            title: "Living Things", status: "draft", topics: [
              { title: "Cell Structure", lessons: [
                { title: "Cell 3D Model", type: "3d", duration: "10 min" },
                { title: "Cell Parts Quiz", type: "interactive", duration: "8 min" },
              ]},
            ]
          },
        ]
      },
    ]
  },
  {
    grade: "Grade 8", subjects: [
      {
        name: "Mathematics", emoji: "📐", chapters: [
          {
            title: "Linear Equations", status: "complete", topics: [
              { title: "Graphing Lines", lessons: [
                { title: "Slope & Y-Intercept", type: "video", duration: "10 min" },
                { title: "Graph Plotter", type: "interactive", duration: "12 min" },
              ]},
            ]
          },
          {
            title: "Polynomials", status: "in_progress", topics: [
              { title: "Polynomial Operations", lessons: [
                { title: "Adding Polynomials", type: "video", duration: "8 min" },
                { title: "Algebra Tiles", type: "interactive", duration: "10 min" },
              ]},
            ]
          },
        ]
      },
    ]
  },
];

type DrillLevel = "grades" | "chapters" | "topics" | "lessons";

function CurriculumEditorPage() {
  const [level, setLevel] = useState<DrillLevel>("grades");
  const [selectedGrade, setSelectedGrade] = useState<GradeData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [attachingLesson, setAttachingLesson] = useState<string | null>(null);

  const goBack = () => {
    if (level === "lessons") { setLevel("topics"); setSelectedTopic(null); }
    else if (level === "topics") { setLevel("chapters"); setSelectedChapter(null); }
    else if (level === "chapters") { setLevel("grades"); setSelectedGrade(null); setSelectedSubject(null); }
  };

  const breadcrumbs = [
    level !== "grades" && selectedGrade?.grade,
    level !== "grades" && selectedSubject?.name,
    (level === "topics" || level === "lessons") && selectedChapter?.title,
    level === "lessons" && selectedTopic?.title,
  ].filter(Boolean);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {level !== "grades" && (
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goBack} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            )}
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-secondary" /></div>
            <div>
              <h1 className="text-2xl font-bold">📖 Curriculum Forge</h1>
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  {breadcrumbs.map((b, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <ChevronRight className="w-3 h-3" />}
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            <Plus className="w-4 h-4" />
            {level === "grades" ? "Add Chapter" : level === "chapters" ? "Add Chapter" : level === "topics" ? "Add Topic" : "Add Lesson"}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {/* GRADE + SUBJECT VIEW */}
          {level === "grades" && (
            <motion.div key="grades" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {curriculum.map((g, gi) => (
                <div key={g.grade} className="mb-6">
                  <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{g.grade.split(' ')[1]}</span>
                    {g.grade}
                  </h2>
                  {g.subjects.map((s) => (
                    <div key={s.name} className="mb-4">
                      <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <span>{s.emoji}</span> {s.name}
                      </div>
                      <div className="space-y-2 pl-4">
                        {s.chapters.map((ch, ci) => (
                          <motion.div
                            key={ch.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ci * 0.03 }}
                            onClick={() => { setSelectedGrade(g); setSelectedSubject(s); setSelectedChapter(ch); setLevel("topics"); }}
                            className="glass rounded-xl p-3 flex items-center gap-3 hover:border-primary/30 border border-transparent transition-all cursor-pointer group"
                          >
                            <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground cursor-grab" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{ch.title}</div>
                              <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                                <span>{ch.topics.length} topics</span>•
                                <span>{ch.topics.reduce((a, t) => a + t.lessons.length, 0)} lessons</span>•
                                <span className="inline-flex items-center gap-1"><Film className="w-3 h-3" />{ch.topics.reduce((a, t) => a + t.lessons.filter(l => l.type !== "text").length, 0)} media</span>
                              </div>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              ch.status === "complete" ? "bg-xp-green/20 text-xp-green" : ch.status === "in_progress" ? "bg-streak-orange/20 text-streak-orange" : "bg-muted text-muted-foreground"
                            }`}>{ch.status === "in_progress" ? "In Progress" : ch.status === "complete" ? "Complete" : "Draft"}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}

          {/* TOPICS VIEW */}
          {level === "topics" && selectedChapter && (
            <motion.div key="topics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="space-y-3">
                {selectedChapter.topics.map((topic, ti) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ti * 0.05 }}
                    onClick={() => { setSelectedTopic(topic); setLevel("lessons"); }}
                    className="glass rounded-xl p-4 cursor-pointer hover:border-primary/30 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">{ti + 1}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{topic.title}</div>
                        <div className="text-[10px] text-muted-foreground">{topic.lessons.length} lessons • {topic.lessons.filter(l => l.type !== "text").length} media assets</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* LESSONS VIEW with Media Attachment */}
          {level === "lessons" && selectedTopic && (
            <motion.div key="lessons" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="space-y-3">
                {selectedTopic.lessons.map((lesson, li) => (
                  <motion.div
                    key={lesson.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: li * 0.05 }}
                    className="glass rounded-xl p-4 border border-transparent hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        lesson.type === "video" ? "bg-blue-500/20 text-blue-400" :
                        lesson.type === "interactive" ? "bg-purple-500/20 text-purple-400" :
                        lesson.type === "3d" ? "bg-emerald-500/20 text-emerald-400" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {mediaIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{lesson.title}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                          <span className="capitalize">{lesson.type}</span>•
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAttachingLesson(attachingLesson === lesson.title ? null : lesson.title)}
                          className={`text-[10px] px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                            attachingLesson === lesson.title ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          }`}
                        >
                          <Link2 className="w-3 h-3" />Attach Media
                        </motion.button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                          <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Media Attachment Panel */}
                    <AnimatePresence>
                      {attachingLesson === lesson.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Attach media asset:</p>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { label: "Video", icon: Play, color: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" },
                                { label: "Image", icon: Image, color: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" },
                                { label: "3D Model", icon: Cube, color: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" },
                                { label: "Audio", icon: Music, color: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30" },
                              ].map(m => (
                                <motion.button
                                  key={m.label}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-colors ${m.color}`}
                                >
                                  <m.icon className="w-5 h-5" />
                                  <span className="text-[10px] font-medium">{m.label}</span>
                                </motion.button>
                              ))}
                            </div>
                            <div className="mt-2 p-3 rounded-lg border-2 border-dashed border-border/50 text-center">
                              <p className="text-[10px] text-muted-foreground">Drag & drop files here or click a type above to browse the media library</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function CurriculumEditor() {
  return <AdminPageShell><CurriculumEditorPage /></AdminPageShell>;
}
