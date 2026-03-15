import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useParentChildren, ChildProfile } from "./useParentChildren";

export function useParentAttendance() {
  const { children, loading: childrenLoading } = useParentChildren();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childrenLoading || children.length === 0) { setLoading(false); return; }
    const fetch = async () => {
      const ids = children.map(c => c.id);
      const { data } = await supabase
        .from("attendance")
        .select("*")
        .in("student_id", ids)
        .order("date", { ascending: false })
        .limit(50);
      setAttendance(data || []);
      setLoading(false);
    };
    fetch();
  }, [children, childrenLoading]);

  return { attendance, children, loading: loading || childrenLoading };
}

export function useParentAssignments() {
  const { children, loading: childrenLoading } = useParentChildren();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childrenLoading || children.length === 0) { setLoading(false); return; }
    const fetch = async () => {
      const ids = children.map(c => c.id);
      // Get class IDs for children
      const { data: enrollments } = await supabase
        .from("class_enrollments")
        .select("class_id, student_id")
        .in("student_id", ids);

      if (enrollments && enrollments.length > 0) {
        const classIds = [...new Set(enrollments.map(e => e.class_id))];
        const { data: assignData } = await supabase
          .from("assignments")
          .select("*")
          .in("class_id", classIds)
          .order("due_date", { ascending: false })
          .limit(20);
        setAssignments(assignData || []);

        const { data: subData } = await supabase
          .from("assignment_submissions")
          .select("*")
          .in("student_id", ids);
        setSubmissions(subData || []);
      }
      setLoading(false);
    };
    fetch();
  }, [children, childrenLoading]);

  return { assignments, submissions, children, loading: loading || childrenLoading };
}

export function useParentResults() {
  const { children, loading: childrenLoading } = useParentChildren();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childrenLoading || children.length === 0) { setLoading(false); return; }
    const fetch = async () => {
      const ids = children.map(c => c.id);
      const { data } = await supabase
        .from("results")
        .select("*, exams(title, exam_type, subject_id)")
        .in("student_id", ids)
        .order("submitted_at", { ascending: false })
        .limit(20);
      setResults(data || []);
      setLoading(false);
    };
    fetch();
  }, [children, childrenLoading]);

  return { results, children, loading: loading || childrenLoading };
}
