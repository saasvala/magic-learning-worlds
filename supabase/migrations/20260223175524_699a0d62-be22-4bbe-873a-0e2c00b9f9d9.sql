
-- =====================================================
-- MAGIC LEARNING WORLD — COMPLETE DATABASE SCHEMA
-- =====================================================

-- ENUM TYPES
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'school_admin', 'super_admin');
CREATE TYPE public.grade_level AS ENUM ('lkg', 'ukg', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12');
CREATE TYPE public.exam_type AS ENUM ('diagnostic', 'practice_quiz', 'chapter_test', 'monthly_test', 'quarterly_exam', 'annual_exam', 'performance_task', 'boss_battle');
CREATE TYPE public.question_type AS ENUM ('mcq', 'short_answer', 'essay', 'fill_blanks', 'matching', 'diagram', 'oral', 'project');
CREATE TYPE public.assignment_status AS ENUM ('pending', 'submitted', 'graded', 'returned');
CREATE TYPE public.subscription_status AS ENUM ('trial', 'active', 'expired', 'cancelled');

-- 1. PROFILES (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role public.user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  grade public.grade_level,
  strand TEXT,
  school_id UUID,
  xp_total INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  rank_title TEXT NOT NULL DEFAULT 'Beginner',
  daily_streak INTEGER NOT NULL DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SCHOOLS
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  address TEXT,
  city TEXT,
  region TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  logo_url TEXT,
  subscription_status public.subscription_status NOT NULL DEFAULT 'trial',
  subscription_expires_at TIMESTAMPTZ,
  max_students INTEGER NOT NULL DEFAULT 500,
  max_teachers INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK for profiles.school_id
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_school FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE SET NULL;

-- 3. CLASSES
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade public.grade_level NOT NULL,
  strand TEXT,
  section TEXT,
  academic_year TEXT NOT NULL DEFAULT '2025-2026',
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CLASS ENROLLMENTS
CREATE TABLE public.class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(class_id, student_id)
);

-- 5. SUBJECTS (curriculum subjects per school)
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  syllabus_id TEXT NOT NULL,
  name TEXT NOT NULL,
  emoji TEXT,
  grade public.grade_level NOT NULL,
  strand TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. CHAPTERS
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  syllabus_chapter_id TEXT NOT NULL,
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_locked BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. LESSONS
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'video',
  content_url TEXT,
  content_body TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. QUESTION BANK
CREATE TABLE public.question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  question_type public.question_type NOT NULL DEFAULT 'mcq',
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT NOT NULL DEFAULT 'moderate',
  points INTEGER NOT NULL DEFAULT 1,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. EXAMS
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  exam_type public.exam_type NOT NULL DEFAULT 'chapter_test',
  total_marks INTEGER NOT NULL DEFAULT 100,
  passing_marks INTEGER NOT NULL DEFAULT 80,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  is_published BOOLEAN NOT NULL DEFAULT false,
  question_ids UUID[] DEFAULT '{}',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ
);

-- 10. RESULTS
CREATE TABLE public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  total_marks INTEGER NOT NULL DEFAULT 100,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false,
  answers JSONB,
  time_taken_seconds INTEGER,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  graded_at TIMESTAMPTZ,
  graded_by UUID REFERENCES public.profiles(id)
);

-- 11. XP RECORDS
CREATE TABLE public.xp_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  source_id UUID,
  description TEXT,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. ATTENDANCE
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present',
  remarks TEXT,
  marked_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(class_id, student_id, date)
);

-- 13. ASSIGNMENTS
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  total_marks INTEGER NOT NULL DEFAULT 100,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. ASSIGNMENT SUBMISSIONS
CREATE TABLE public.assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  status public.assignment_status NOT NULL DEFAULT 'pending',
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  graded_at TIMESTAMPTZ,
  UNIQUE(assignment_id, student_id)
);

-- 15. NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. AI INTERACTIONS
CREATE TABLE public.ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  subject_context TEXT,
  chapter_context TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. ACTIVITY LOGS
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. STUDENT PROGRESS (per chapter mastery tracking)
CREATE TABLE public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  mastery_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  is_unlocked BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, chapter_id)
);

-- 19. BADGES
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT NOT NULL DEFAULT '🏆',
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL DEFAULT 1,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. STUDENT BADGES
CREATE TABLE public.student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

-- 21. PAYMENTS
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PHP',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  description TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- INDEXES
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_school ON public.profiles(school_id);
CREATE INDEX idx_classes_school ON public.classes(school_id);
CREATE INDEX idx_class_enrollments_student ON public.class_enrollments(student_id);
CREATE INDEX idx_subjects_school ON public.subjects(school_id);
CREATE INDEX idx_chapters_subject ON public.chapters(subject_id);
CREATE INDEX idx_lessons_chapter ON public.lessons(chapter_id);
CREATE INDEX idx_question_bank_chapter ON public.question_bank(chapter_id);
CREATE INDEX idx_exams_school ON public.exams(school_id);
CREATE INDEX idx_results_student ON public.results(student_id);
CREATE INDEX idx_xp_records_student ON public.xp_records(student_id);
CREATE INDEX idx_attendance_class_date ON public.attendance(class_id, date);
CREATE INDEX idx_assignments_class ON public.assignments(class_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_ai_interactions_user ON public.ai_interactions(user_id);
CREATE INDEX idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX idx_student_progress_student ON public.student_progress(student_id);
