
-- Fix infinite recursion: profiles policy references class_enrollments,
-- which references classes, which references class_enrollments again.

-- 1. Drop the problematic policies
DROP POLICY IF EXISTS "Teachers view class students" ON public.profiles;
DROP POLICY IF EXISTS "Students view enrolled classes" ON public.classes;
DROP POLICY IF EXISTS "Students view assignments" ON public.assignments;

-- 2. Recreate with SECURITY DEFINER functions to break the cycle

CREATE OR REPLACE FUNCTION public.get_teacher_student_ids(_teacher_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT ce.student_id
  FROM class_enrollments ce
  JOIN classes c ON ce.class_id = c.id
  WHERE c.teacher_id = _teacher_id;
$$;

CREATE OR REPLACE FUNCTION public.get_student_class_ids(_student_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT class_id FROM class_enrollments WHERE student_id = _student_id;
$$;

-- 3. Recreate policies using the helper functions
CREATE POLICY "Teachers view class students"
ON public.profiles FOR SELECT
USING (
  get_user_role() = 'teacher'::user_role
  AND id IN (SELECT get_teacher_student_ids(auth.uid()))
);

CREATE POLICY "Students view enrolled classes"
ON public.classes FOR SELECT
USING (
  id IN (SELECT get_student_class_ids(auth.uid()))
);

CREATE POLICY "Students view assignments"
ON public.assignments FOR SELECT
USING (
  class_id IN (SELECT get_student_class_ids(auth.uid()))
);
