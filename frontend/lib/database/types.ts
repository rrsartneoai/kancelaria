export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      analysis: {
        Row: {
          case_id: string;
          content: string | null;
          created_at: string;
          id: string;
          price: number | null;
          preview_content: string | null;
          recommendations: string[] | null;
          status: Database["public"]["Enums"]["analysis_status"];
          summary: string | null;
        };
        Insert: {
          case_id: string;
          content?: string | null;
          created_at?: string;
          id?: string;
          price?: number | null;
          preview_content?: string | null;
          recommendations?: string[] | null;
          status?: Database["public"]["Enums"]["analysis_status"];
          summary?: string | null;
        };
        Update: {
          case_id?: string;
          content?: string | null;
          created_at?: string;
          id?: string;
          price?: number | null;
          preview_content?: string | null;
          recommendations?: string[] | null;
          status?: Database["public"]["Enums"]["analysis_status"];
          summary?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_case_id_fkey";
            columns: ["case_id"];
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      cases: {
        Row: {
          client_id: string;
          client_notes: string | null;
          created_at: string;
          description: string | null;
          document_count: number | null;
          id: string;
          name: string;
          operator_notes: string | null;
          status: Database["public"]["Enums"]["case_status"];
          updated_at: string;
        };
        Insert: {
          client_id: string;
          client_notes?: string | null;
          created_at?: string;
          description?: string | null;
          document_count?: number | null;
          id?: string;
          name: string;
          operator_notes?: string | null;
          status?: Database["public"]["Enums"]["case_status"];
          updated_at?: string;
        };
        Update: {
          client_id?: string;
          client_notes?: string | null;
          created_at?: string;
          description?: string | null;
          document_count?: number | null;
          id?: string;
          name?: string;
          operator_notes?: string | null;
          status?: Database["public"]["Enums"]["case_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cases_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          case_id: string;
          created_at: string;
          id: string;
          name: string;
          size: number | null;
          type: Database["public"]["Enums"]["document_type"];
          url: string;
        };
        Insert: {
          case_id: string;
          created_at?: string;
          id?: string;
          name: string;
          size?: number | null;
          type: Database["public"]["Enums"]["document_type"];
          url: string;
        };
        Update: {
          case_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          size?: number | null;
          type?: Database["public"]["Enums"]["document_type"];
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_case_id_fkey";
            columns: ["case_id"];
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      generated_documents: {
        Row: {
          case_id: string;
          created_at: string;
          id: string;
          name: string;
          price: number | null;
          type: Database["public"]["Enums"]["document_type"];
          url: string;
        };
        Insert: {
          case_id: string;
          created_at?: string;
          id?: string;
          name: string;
          price?: number | null;
          type: Database["public"]["Enums"]["document_type"];
          url: string;
        };
        Update: {
          case_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          price?: number | null;
          type?: Database["public"]["Enums"]["document_type"];
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "generated_documents_case_id_fkey";
            columns: ["case_id"];
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      law_firms: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          description: string | null;
          email: string | null;
          id: string;
          is_active: boolean;
          name: string;
          phone: string | null;
          postal_code: string | null;
          specializations: string[] | null;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          is_active?: boolean;
          name: string;
          phone?: string | null;
          postal_code?: string | null;
          specializations?: string[] | null;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          is_active?: boolean;
          name?: string;
          phone?: string | null;
          postal_code?: string | null;
          specializations?: string[] | null;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          id: string;
          payment_method: string | null;
          status: Database["public"]["Enums"]["payment_status"];
          transaction_id: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency: string;
          id?: string;
          payment_method?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transaction_id?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          payment_method?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transaction_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      specializations: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          created_at: string;
          end_date: string | null;
          id: string;
          plan_id: string;
          price: number | null;
          start_date: string;
          status: Database["public"]["Enums"]["subscription_status"];
          stripe_subscription_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          plan_id: string;
          price?: number | null;
          start_date: string;
          status?: Database["public"]["Enums"]["subscription_status"];
          stripe_subscription_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          id?: string;
          plan_id?: string;
          price?: number | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["subscription_status"];
          stripe_subscription_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          last_login_at: string | null;
          name: string | null;
          role: Database["public"]["Enums"]["user_role"];
          status: Database["public"]["Enums"]["user_status"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          last_login_at?: string | null;
          name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          status?: Database["public"]["Enums"]["user_status"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          last_login_at?: string | null;
          name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          status?: Database["public"]["Enums"]["user_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      analysis_status: "pending" | "completed" | "rejected";
      case_status:
        | "new"
        | "analyzing"
        | "analysis_ready"
        | "documents_ready"
        | "completed"
        | "rejected";
      document_type: "pdf" | "image" | "docx";
      payment_status: "pending" | "completed" | "failed";
      subscription_status: "active" | "inactive" | "cancelled";
      user_role: "admin" | "client" | "operator";
      user_status: "active" | "inactive" | "suspended";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
