export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interactions: {
        Row: {
          ai_response: string
          chapter_context: string | null
          created_at: string
          id: string
          language: string
          session_id: string | null
          subject_context: string | null
          user_id: string
          user_message: string
        }
        Insert: {
          ai_response: string
          chapter_context?: string | null
          created_at?: string
          id?: string
          language?: string
          session_id?: string | null
          subject_context?: string | null
          user_id: string
          user_message: string
        }
        Update: {
          ai_response?: string
          chapter_context?: string | null
          created_at?: string
          id?: string
          language?: string
          session_id?: string | null
          subject_context?: string | null
          user_id?: string
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          content: string | null
          feedback: string | null
          file_url: string | null
          graded_at: string | null
          id: string
          score: number | null
          status: Database["public"]["Enums"]["assignment_status"]
          student_id: string
          submitted_at: string | null
        }
        Insert: {
          assignment_id: string
          content?: string | null
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["assignment_status"]
          student_id: string
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string
          content?: string | null
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["assignment_status"]
          student_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          class_id: string
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          subject_id: string | null
          title: string
          total_marks: number
        }
        Insert: {
          class_id: string
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          subject_id?: string | null
          title: string
          total_marks?: number
        }
        Update: {
          class_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          subject_id?: string | null
          title?: string
          total_marks?: number
        }
        Relationships: [
          {
            foreignKeyName: "assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          class_id: string
          created_at: string
          date: string
          id: string
          marked_by: string | null
          remarks: string | null
          status: string
          student_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          date?: string
          id?: string
          marked_by?: string | null
          remarks?: string | null
          status?: string
          student_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          date?: string
          id?: string
          marked_by?: string | null
          remarks?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string
          description: string | null
          emoji: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
          xp_reward: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          emoji?: string
          id?: string
          name: string
          requirement_type: string
          requirement_value?: number
          xp_reward?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          emoji?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
          xp_reward?: number
        }
        Relationships: []
      }
      chapters: {
        Row: {
          created_at: string
          id: string
          is_locked: boolean
          name: string
          order_index: number
          subject_id: string
          syllabus_chapter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_locked?: boolean
          name: string
          order_index?: number
          subject_id: string
          syllabus_chapter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_locked?: boolean
          name?: string
          order_index?: number
          subject_id?: string
          syllabus_chapter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_year: string
          created_at: string
          grade: Database["public"]["Enums"]["grade_level"]
          id: string
          name: string
          school_id: string
          section: string | null
          strand: string | null
          teacher_id: string | null
        }
        Insert: {
          academic_year?: string
          created_at?: string
          grade: Database["public"]["Enums"]["grade_level"]
          id?: string
          name: string
          school_id: string
          section?: string | null
          strand?: string | null
          teacher_id?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string
          grade?: Database["public"]["Enums"]["grade_level"]
          id?: string
          name?: string
          school_id?: string
          section?: string | null
          strand?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          chapter_id: string | null
          class_id: string | null
          created_at: string
          created_by: string | null
          duration_minutes: number
          ends_at: string | null
          exam_type: Database["public"]["Enums"]["exam_type"]
          id: string
          is_published: boolean
          passing_marks: number
          question_ids: string[] | null
          school_id: string | null
          starts_at: string | null
          subject_id: string | null
          title: string
          total_marks: number
        }
        Insert: {
          chapter_id?: string | null
          class_id?: string | null
          created_at?: string
          created_by?: string | null
          duration_minutes?: number
          ends_at?: string | null
          exam_type?: Database["public"]["Enums"]["exam_type"]
          id?: string
          is_published?: boolean
          passing_marks?: number
          question_ids?: string[] | null
          school_id?: string | null
          starts_at?: string | null
          subject_id?: string | null
          title: string
          total_marks?: number
        }
        Update: {
          chapter_id?: string | null
          class_id?: string | null
          created_at?: string
          created_by?: string | null
          duration_minutes?: number
          ends_at?: string | null
          exam_type?: Database["public"]["Enums"]["exam_type"]
          id?: string
          is_published?: boolean
          passing_marks?: number
          question_ids?: string[] | null
          school_id?: string | null
          starts_at?: string | null
          subject_id?: string | null
          title?: string
          total_marks?: number
        }
        Relationships: [
          {
            foreignKeyName: "exams_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          content_body: string | null
          content_type: string
          content_url: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          content_body?: string | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          content_body?: string | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_students: {
        Row: {
          created_at: string
          id: string
          parent_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parent_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parent_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_students_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          id: string
          paid_at: string | null
          payment_method: string | null
          school_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          school_id: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          school_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          daily_streak: number
          full_name: string
          grade: Database["public"]["Enums"]["grade_level"] | null
          id: string
          language: string
          last_active_at: string | null
          level: number
          rank_title: string
          role: Database["public"]["Enums"]["user_role"]
          school_id: string | null
          strand: string | null
          updated_at: string
          xp_total: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          daily_streak?: number
          full_name?: string
          grade?: Database["public"]["Enums"]["grade_level"] | null
          id: string
          language?: string
          last_active_at?: string | null
          level?: number
          rank_title?: string
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          strand?: string | null
          updated_at?: string
          xp_total?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          daily_streak?: number
          full_name?: string
          grade?: Database["public"]["Enums"]["grade_level"] | null
          id?: string
          language?: string
          last_active_at?: string | null
          level?: number
          rank_title?: string
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          strand?: string | null
          updated_at?: string
          xp_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      question_bank: {
        Row: {
          chapter_id: string
          correct_answer: string
          created_at: string
          created_by: string | null
          difficulty: string
          explanation: string | null
          id: string
          options: Json | null
          points: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          chapter_id: string
          correct_answer: string
          created_at?: string
          created_by?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number
          question_text: string
          question_type?: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          chapter_id?: string
          correct_answer?: string
          created_at?: string
          created_by?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number
          question_text?: string
          question_type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "question_bank_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_bank_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          answers: Json | null
          exam_id: string
          graded_at: string | null
          graded_by: string | null
          id: string
          passed: boolean
          percentage: number
          score: number
          student_id: string
          submitted_at: string
          time_taken_seconds: number | null
          total_marks: number
        }
        Insert: {
          answers?: Json | null
          exam_id: string
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          passed?: boolean
          percentage?: number
          score?: number
          student_id: string
          submitted_at?: string
          time_taken_seconds?: number | null
          total_marks?: number
        }
        Update: {
          answers?: Json | null
          exam_id?: string
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          passed?: boolean
          percentage?: number
          score?: number
          student_id?: string
          submitted_at?: string
          time_taken_seconds?: number | null
          total_marks?: number
        }
        Relationships: [
          {
            foreignKeyName: "results_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          code: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          logo_url: string | null
          max_students: number
          max_teachers: number
          name: string
          region: string | null
          subscription_expires_at: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          max_students?: number
          max_teachers?: number
          name: string
          region?: string | null
          subscription_expires_at?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          max_students?: number
          max_teachers?: number
          name?: string
          region?: string | null
          subscription_expires_at?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
        }
        Relationships: []
      }
      student_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          student_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          student_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          chapter_id: string
          completed_at: string | null
          id: string
          is_unlocked: boolean
          mastery_percent: number
          student_id: string
          subject_id: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          completed_at?: string | null
          id?: string
          is_unlocked?: boolean
          mastery_percent?: number
          student_id: string
          subject_id: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          completed_at?: string | null
          id?: string
          is_unlocked?: boolean
          mastery_percent?: number
          student_id?: string
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          emoji: string | null
          grade: Database["public"]["Enums"]["grade_level"]
          id: string
          is_active: boolean
          name: string
          school_id: string | null
          strand: string | null
          syllabus_id: string
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          grade: Database["public"]["Enums"]["grade_level"]
          id?: string
          is_active?: boolean
          name: string
          school_id?: string | null
          strand?: string | null
          syllabus_id: string
        }
        Update: {
          created_at?: string
          emoji?: string | null
          grade?: Database["public"]["Enums"]["grade_level"]
          id?: string
          is_active?: boolean
          name?: string
          school_id?: string | null
          strand?: string | null
          syllabus_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      xp_records: {
        Row: {
          amount: number
          description: string | null
          earned_at: string
          id: string
          source: string
          source_id: string | null
          student_id: string
        }
        Insert: {
          amount: number
          description?: string | null
          earned_at?: string
          id?: string
          source: string
          source_id?: string | null
          student_id: string
        }
        Update: {
          amount?: number
          description?: string | null
          earned_at?: string
          id?: string
          source?: string
          source_id?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "xp_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_student_class_ids: {
        Args: { _student_id: string }
        Returns: string[]
      }
      get_teacher_student_ids: {
        Args: { _teacher_id: string }
        Returns: string[]
      }
      get_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_school_id: { Args: never; Returns: string }
    }
    Enums: {
      assignment_status: "pending" | "submitted" | "graded" | "returned"
      exam_type:
        | "diagnostic"
        | "practice_quiz"
        | "chapter_test"
        | "monthly_test"
        | "quarterly_exam"
        | "annual_exam"
        | "performance_task"
        | "boss_battle"
      grade_level:
        | "lkg"
        | "ukg"
        | "g1"
        | "g2"
        | "g3"
        | "g4"
        | "g5"
        | "g6"
        | "g7"
        | "g8"
        | "g9"
        | "g10"
        | "g11"
        | "g12"
      question_type:
        | "mcq"
        | "short_answer"
        | "essay"
        | "fill_blanks"
        | "matching"
        | "diagram"
        | "oral"
        | "project"
      subscription_status: "trial" | "active" | "expired" | "cancelled"
      user_role:
        | "student"
        | "teacher"
        | "school_admin"
        | "super_admin"
        | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assignment_status: ["pending", "submitted", "graded", "returned"],
      exam_type: [
        "diagnostic",
        "practice_quiz",
        "chapter_test",
        "monthly_test",
        "quarterly_exam",
        "annual_exam",
        "performance_task",
        "boss_battle",
      ],
      grade_level: [
        "lkg",
        "ukg",
        "g1",
        "g2",
        "g3",
        "g4",
        "g5",
        "g6",
        "g7",
        "g8",
        "g9",
        "g10",
        "g11",
        "g12",
      ],
      question_type: [
        "mcq",
        "short_answer",
        "essay",
        "fill_blanks",
        "matching",
        "diagram",
        "oral",
        "project",
      ],
      subscription_status: ["trial", "active", "expired", "cancelled"],
      user_role: [
        "student",
        "teacher",
        "school_admin",
        "super_admin",
        "parent",
      ],
    },
  },
} as const
