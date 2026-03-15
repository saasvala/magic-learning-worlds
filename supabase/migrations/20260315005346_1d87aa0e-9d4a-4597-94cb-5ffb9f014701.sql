
-- Add 'parent' to user_role enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'parent';

-- Create parent_students linking table
CREATE TABLE public.parent_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

-- Enable RLS
ALTER TABLE public.parent_students ENABLE ROW LEVEL SECURITY;

-- Parents can view their own links
CREATE POLICY "Parents view own children"
  ON public.parent_students FOR SELECT
  USING (parent_id = auth.uid());

-- Parents can insert their own links (for linking children)
CREATE POLICY "Parents link children"
  ON public.parent_students FOR INSERT
  WITH CHECK (parent_id = auth.uid());

-- Admins manage all parent-student links
CREATE POLICY "Admins manage parent_students"
  ON public.parent_students FOR ALL
  USING (public.get_user_role() IN ('school_admin', 'super_admin'));

-- Allow parents to view attendance of their children
CREATE POLICY "Parents view children attendance"
  ON public.attendance FOR SELECT
  USING (student_id IN (
    SELECT ps.student_id FROM public.parent_students ps WHERE ps.parent_id = auth.uid()
  ));

-- Allow parents to view assignments of their children's classes
CREATE POLICY "Parents view children assignments"
  ON public.assignments FOR SELECT
  USING (class_id IN (
    SELECT ce.class_id FROM public.class_enrollments ce
    WHERE ce.student_id IN (
      SELECT ps.student_id FROM public.parent_students ps WHERE ps.parent_id = auth.uid()
    )
  ));

-- Allow parents to view results of their children
CREATE POLICY "Parents view children results"
  ON public.results FOR SELECT
  USING (student_id IN (
    SELECT ps.student_id FROM public.parent_students ps WHERE ps.parent_id = auth.uid()
  ));

-- Allow parents to view their children's profiles
CREATE POLICY "Parents view children profiles"
  ON public.profiles FOR SELECT
  USING (id IN (
    SELECT ps.student_id FROM public.parent_students ps WHERE ps.parent_id = auth.uid()
  ));

-- Allow parents to view submission status of their children
CREATE POLICY "Parents view children submissions"
  ON public.assignment_submissions FOR SELECT
  USING (student_id IN (
    SELECT ps.student_id FROM public.parent_students ps WHERE ps.parent_id = auth.uid()
  ));
