import type { User as AuthUser } from "@supabase/supabase-js";

export type UserRole = "admin" | "client" | "operator" | null;

export interface User extends AuthUser {
  role: UserRole;
  name?: string;
}

export interface LawFirm {
  id: string;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  specializations: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Specialization {
  id: string;
  name: string;
  description?: string;
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  type: "pdf" | "image" | "docx";
  url: string;
  uploadedAt: Date;
  size: number;
}

export interface Analysis {
  id: string;
  caseId: string;
  content: string;
  summary: string;
  recommendations: string[];
  possibleDocuments: {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedTime: string;
    category: string;
  }[];
  price: number;
  status: "pending" | "completed" | "rejected";
  previewContent: string;
  createdAt: Date;
}

export interface GeneratedDocument {
  id: string;
  caseId: string;
  name: string;
  type: "pdf" | "docx";
  url: string;
  generatedAt: Date;
  price: number;
}

export interface Case {
  id: string;
  name: string;
  clientId: string;
  status:
    | "new"
    | "analyzing"
    | "analysis_ready"
    | "documents_ready"
    | "completed"
    | "rejected";
  documents: Document[];
  analysis?: Analysis;
  generatedDocuments: GeneratedDocument[];
  clientNotes?: string;
  operatorNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "inactive" | "cancelled";
  start_date: string;
  end_date: string;
  price: number;
  currency: string;
  stripe_subscription_id?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  payment_method: string;
  transaction_id: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: string;
  created_at: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newCasesLastMonth: number;
  completedCasesLastMonth: number;
  revenueLastMonth: number;
  pendingAnalysis: number;
}

export interface UserManagementUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  last_login_at: string;
  cases_count: number;
  subscription_status: "active" | "inactive" | "none";
}
