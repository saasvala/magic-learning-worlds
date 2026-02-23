import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronRight, Clock, Target, Award, FileText,
  Video, Headphones, Gamepad2, PenTool, Image, FolderOpen,
  CheckCircle2, BarChart3, ArrowLeft, Layers
} from "lucide-react";
import {
  allGrades,
  stageLabels,
  stageColors,
  type GradeLevel,
  type Subject,
  type Chapter,
} from "@/data/syllabus";

const materialIcons: Record<string, typeof Video> = {
  video: Video,
  audio: Headphones,
  interactive: Gamepad2,
  worksheet: PenTool,
  flashcard: Image,
  project: FolderOpen,
  reading: BookOpen,
};

const materialColors: Record<string, string> = {
  video: "text-magic-blue",
  audio: "text-magic-purple",
  interactive: "text-primary",
  worksheet: "text-xp-green",
  flashcard: "text-streak-orange",
  project: "text-coral",
  reading: "text-muted-foreground",
};

interface CurriculumExplorerProps {
  /** If provided, only show this grade */
  fixedGradeId?: string;
}

export default function CurriculumExplorer({ fixedGradeId }: CurriculumExplorerProps) {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(
    fixedGradeId ? allGrades.find((g) => g.id === fixedGradeId) || null : null
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Group grades by stage
  const stages = Object.entries(
    allGrades.reduce((acc, g) => {
      (acc[g.stage] = acc[g.stage] || []).push(g);
      return acc;
    }, {} as Record<string, GradeLevel[]>)
  );

  const goBack = () => {
    if (selectedChapter) setSelectedChapter(null);
    else if (selectedSubject) setSelectedSubject(null);
    else if (selectedGrade && !fixedGradeId) setSelectedGrade(null);
  };

  const breadcrumb = [
    !fixedGradeId && "All Grades",
    selectedGrade?.name,
    selectedSubject?.name,
    selectedChapter?.name,
  ].filter(Boolean);

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {(selectedGrade || selectedSubject || selectedChapter) && (
          <button onClick={goBack} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm">
            {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            <span className={i === breadcrumb.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>
              {item}
            </span>
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== GRADE LIST ===== */}
        {!selectedGrade && (
          <motion.div key="grades" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold mb-2">
              Curriculum <span className="text-gradient-gold">Explorer</span>
            </h1>
            <p className="text-muted-foreground text-sm mb-8">Complete Philippines K-12 Syllabus • LKG to Grade 12</p>

            {stages.map(([stage, grades]) => (
              <div key={stage} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${stageColors[stage]}`} />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {stageLabels[stage]}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {grades.map((g, i) => (
                    <motion.button
                      key={g.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      onClick={() => { setSelectedGrade(g); setSelectedSubject(null); setSelectedChapter(null); }}
                      className="glass rounded-xl p-4 text-center hover:shadow-glow-gold transition-shadow"
                    >
                      <div className="text-2xl mb-1">{g.emoji}</div>
                      <div className="text-sm font-semibold truncate">{g.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{g.subjects.length} subjects</div>
                      {g.strand && (
                        <div className="text-[10px] text-primary mt-0.5 font-medium">{g.strand}</div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ===== SUBJECT LIST ===== */}
        {selectedGrade && !selectedSubject && (
          <motion.div key="subjects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-2xl font-bold mb-1">
              {selectedGrade.emoji} {selectedGrade.name}
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              {selectedGrade.subjects.length} Subjects • {selectedGrade.subjects.reduce((a, s) => a + s.chapters.length, 0)} Chapters
              {selectedGrade.strand && <span className="ml-2 text-primary font-medium">({selectedGrade.strand} Strand)</span>}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedGrade.subjects.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedSubject(s)}
                  className="glass rounded-xl p-5 text-left hover:ring-1 hover:ring-primary transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.chapters.length} chapters</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{s.overview}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {s.skillMapping.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== SUBJECT DETAIL ===== */}
        {selectedSubject && !selectedChapter && (
          <motion.div key="subject-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedSubject.emoji}</span>
              <div>
                <h1 className="text-2xl font-bold">{selectedSubject.name}</h1>
                <p className="text-sm text-muted-foreground">{selectedGrade?.name}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">{selectedSubject.overview}</p>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chapters */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Chapters
                </h2>
                <div className="space-y-2">
                  {selectedSubject.chapters.map((ch, i) => (
                    <motion.button
                      key={ch.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedChapter(ch)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl glass hover:ring-1 hover:ring-primary transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{ch.name}</div>
                        <div className="text-xs text-muted-foreground">{ch.topics.length} topics • {ch.estimatedHours}h</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {ch.estimatedHours}h
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-5">
                {/* Learning Objectives */}
                <div className="glass rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" /> Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {selectedSubject.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-xp-green shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam Pattern */}
                <div className="glass rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-magic-purple" /> Exam Pattern
                  </h3>
                  <div className="space-y-2">
                    {selectedSubject.examPattern.components.map((comp) => (
                      <div key={comp.name} className="flex items-center gap-2">
                        <span className="text-xs flex-1">{comp.name}</span>
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${comp.weight}%` }} />
                        </div>
                        <span className="text-xs font-medium w-8 text-right">{comp.weight}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Difficulty</div>
                    <div className="flex gap-2">
                      {Object.entries(selectedSubject.examPattern.difficulty).map(([level, pct]) => (
                        <div key={level} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          level === "easy" ? "bg-xp-green/20 text-xp-green" :
                          level === "moderate" ? "bg-primary/20 text-primary" : "bg-streak-orange/20 text-streak-orange"
                        }`}>
                          {level} {pct}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assessment Flow */}
                <div className="glass rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-xp-green" /> Assessment Flow
                  </h3>
                  <div className="space-y-1.5">
                    {selectedSubject.assessmentFlow.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Mapping */}
                <div className="glass rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-streak-orange" /> Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSubject.skillMapping.map((skill) => (
                      <span key={skill} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mastery Rule */}
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">80%</div>
                  <div>
                    <div className="text-xs font-semibold">Mastery Required</div>
                    <div className="text-[10px] text-muted-foreground">Score 80%+ to unlock next level</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== CHAPTER DETAIL ===== */}
        {selectedChapter && (
          <motion.div key="chapter-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h1 className="text-xl font-bold mb-1">{selectedChapter.name}</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {selectedSubject?.name} • {selectedGrade?.name} • {selectedChapter.estimatedHours} hours
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Topics */}
              <div>
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Topics
                </h2>
                <div className="space-y-2">
                  {selectedChapter.topics.map((topic, i) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 p-3 rounded-xl glass"
                    >
                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">{i + 1}</div>
                      <span className="text-sm">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-magic-purple" /> Study Materials
                </h2>
                <div className="space-y-2">
                  {selectedChapter.materials.map((mat, i) => {
                    const Icon = materialIcons[mat.type] || FileText;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-3 rounded-xl glass"
                      >
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className={`w-3.5 h-3.5 ${materialColors[mat.type]}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{mat.title}</div>
                          <div className="text-[10px] text-muted-foreground capitalize">{mat.type}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Chapter Learning Flow */}
                <div className="mt-6">
                  <h2 className="text-base font-semibold mb-3">Learning Flow</h2>
                  <div className="space-y-1.5">
                    {[
                      "1. Animated Story Intro",
                      "2. Concept Explanation",
                      "3. Guided Practice",
                      "4. Interactive Activity",
                      "5. Mini Quiz",
                      "6. Boss Battle",
                      "7. XP Reward",
                      "8. Badge Unlock",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/30">
                        <CheckCircle2 className="w-3 h-3 text-xp-green shrink-0" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
