import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ChildProfile {
  id: string;
  full_name: string;
  grade: string | null;
  xp_total: number;
  level: number;
  rank_title: string;
  daily_streak: number;
  avatar_url: string | null;
}

export function useParentChildren() {
  const { user } = useAuth();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      // Get linked student IDs
      const { data: links } = await supabase
        .from("parent_students" as any)
        .select("student_id")
        .eq("parent_id", user.id);

      if (links && links.length > 0) {
        const studentIds = (links as any[]).map((l: any) => l.student_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, grade, xp_total, level, rank_title, daily_streak, avatar_url")
          .in("id", studentIds);
        setChildren((profiles as unknown as ChildProfile[]) || []);
      } else {
        setChildren([]);
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { children, loading };
}
