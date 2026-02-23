
-- =====================================================
-- RLS POLICIES — ROLE-BASED ACCESS CONTROL
-- =====================================================

-- Helper function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Helper function to get user school_id
CREATE OR REPLACE FUNCTION public.get_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Fix handle_new_user search path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ========== ENABLE RLS ON ALL TABLES ==========
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- ========== PROFILES ==========
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins view school profiles" ON public.profiles FOR SELECT USING (
  get_user_role() IN ('school_admin', 'super_admin') AND (school_id = get_user_school_id() OR get_user_role() = 'super_admin')
);
CREATE POLICY "Teachers view class students" ON public.profiles FOR SELECT USING (
  get_user_role() = 'teacher' AND id IN (
    SELECT ce.student_id FROM class_enrollments ce JOIN classes c ON ce.class_id = c.id WHERE c.teacher_id = auth.uid()
  )
);

-- ========== SCHOOLS ==========
CREATE POLICY "Super admin manages all schools" ON public.schools FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "School admin views own school" ON public.schools FOR SELECT USING (id = get_user_school_id());
CREATE POLICY "Teachers view own school" ON public.schools FOR SELECT USING (id = get_user_school_id());

-- ========== CLASSES ==========
CREATE POLICY "School admin manages classes" ON public.classes FOR ALL USING (
  get_user_role() IN ('school_admin', 'super_admin') AND (school_id = get_user_school_id() OR get_user_role() = 'super_admin')
);
CREATE POLICY "Teachers view own classes" ON public.classes FOR SELECT USING (teacher_id = auth.uid());
CREATE POLICY "Students view enrolled classes" ON public.classes FOR SELECT USING (
  id IN (SELECT class_id FROM class_enrollments WHERE student_id = auth.uid())
);

-- ========== CLASS ENROLLMENTS ==========
CREATE POLICY "Admin manages enrollments" ON public.class_enrollments FOR ALL USING (
  get_user_role() IN ('school_admin', 'super_admin')
);
CREATE POLICY "Students view own enrollment" ON public.class_enrollments FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Teachers view class enrollments" ON public.class_enrollments FOR SELECT USING (
  class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid())
);

-- ========== SUBJECTS ==========
CREATE POLICY "Everyone reads subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admin manages subjects" ON public.subjects FOR ALL USING (get_user_role() IN ('school_admin', 'super_admin'));

-- ========== CHAPTERS ==========
CREATE POLICY "Everyone reads chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Admin manages chapters" ON public.chapters FOR ALL USING (get_user_role() IN ('school_admin', 'super_admin'));

-- ========== LESSONS ==========
CREATE POLICY "Everyone reads lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Teachers manage lessons" ON public.lessons FOR ALL USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== QUESTION BANK ==========
CREATE POLICY "Teachers manage questions" ON public.question_bank FOR ALL USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Students read questions in exams" ON public.question_bank FOR SELECT USING (get_user_role() = 'student');

-- ========== EXAMS ==========
CREATE POLICY "Teachers manage exams" ON public.exams FOR ALL USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Students view published exams" ON public.exams FOR SELECT USING (get_user_role() = 'student' AND is_published = true);

-- ========== RESULTS ==========
CREATE POLICY "Students view own results" ON public.results FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students insert own results" ON public.results FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Teachers view class results" ON public.results FOR SELECT USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Teachers grade results" ON public.results FOR UPDATE USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== XP RECORDS ==========
CREATE POLICY "Students view own xp" ON public.xp_records FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "System inserts xp" ON public.xp_records FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Admin views xp" ON public.xp_records FOR SELECT USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== ATTENDANCE ==========
CREATE POLICY "Teachers manage attendance" ON public.attendance FOR ALL USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT USING (student_id = auth.uid());

-- ========== ASSIGNMENTS ==========
CREATE POLICY "Teachers manage assignments" ON public.assignments FOR ALL USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Students view assignments" ON public.assignments FOR SELECT USING (
  class_id IN (SELECT class_id FROM class_enrollments WHERE student_id = auth.uid())
);

-- ========== ASSIGNMENT SUBMISSIONS ==========
CREATE POLICY "Students manage own submissions" ON public.assignment_submissions FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Teachers view submissions" ON public.assignment_submissions FOR SELECT USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));
CREATE POLICY "Teachers grade submissions" ON public.assignment_submissions FOR UPDATE USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== NOTIFICATIONS ==========
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System inserts notifications" ON public.notifications FOR INSERT WITH CHECK (get_user_role() IN ('teacher', 'school_admin', 'super_admin') OR user_id = auth.uid());

-- ========== AI INTERACTIONS ==========
CREATE POLICY "Users manage own ai chats" ON public.ai_interactions FOR ALL USING (user_id = auth.uid());

-- ========== ACTIVITY LOGS ==========
CREATE POLICY "Super admin views all logs" ON public.activity_logs FOR SELECT USING (get_user_role() = 'super_admin');
CREATE POLICY "Admin views school logs" ON public.activity_logs FOR SELECT USING (get_user_role() = 'school_admin');
CREATE POLICY "System inserts logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

-- ========== STUDENT PROGRESS ==========
CREATE POLICY "Students manage own progress" ON public.student_progress FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Teachers view progress" ON public.student_progress FOR SELECT USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== BADGES ==========
CREATE POLICY "Everyone reads badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admin manages badges" ON public.badges FOR ALL USING (get_user_role() IN ('school_admin', 'super_admin'));

-- ========== STUDENT BADGES ==========
CREATE POLICY "Students view own badges" ON public.student_badges FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "System awards badges" ON public.student_badges FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Admin views badges" ON public.student_badges FOR SELECT USING (get_user_role() IN ('teacher', 'school_admin', 'super_admin'));

-- ========== PAYMENTS ==========
CREATE POLICY "Super admin manages payments" ON public.payments FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "School admin views own payments" ON public.payments FOR SELECT USING (school_id = get_user_school_id() AND get_user_role() = 'school_admin');
