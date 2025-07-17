import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/supabase";

export async function GET(request: NextRequest) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    // Build query
    let query = db.client
      .from("users")
      .select(
        `
        *,
        law_firm:law_firms(id, name)
      `,
      )
      .order("created_at", { ascending: false });

    // Apply filters
    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    if (status === "active") {
      query = query.eq("is_active", true);
    } else if (status === "inactive") {
      query = query.eq("is_active", false);
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
    }

    // Get paginated results
    const {
      data: users,
      error,
      count,
    } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 },
      );
    }

    // Get stats
    const { data: statsData } = await db.client
      .from("users")
      .select("role, is_active, created_at");

    const stats = {
      total: statsData?.length || 0,
      active: statsData?.filter((u) => u.is_active).length || 0,
      clients: statsData?.filter((u) => u.role === "client").length || 0,
      lawyers: statsData?.filter((u) => u.role === "lawyer").length || 0,
      admins: statsData?.filter((u) => u.role === "admin").length || 0,
      operators: statsData?.filter((u) => u.role === "operator").length || 0,
      newThisMonth:
        statsData?.filter((u) => {
          const createdAt = new Date(u.created_at);
          const now = new Date();
          return (
            createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear()
          );
        }).length || 0,
    };

    return NextResponse.json({
      users,
      stats,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, full_name, phone, role, is_active, law_firm_id } = body;

    // Validate required fields
    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const { data: existingUser } = await db.client
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Create user
    const { data: user, error } = await db.client
      .from("users")
      .insert([
        {
          id: crypto.randomUUID(),
          email,
          full_name,
          phone,
          role,
          is_active: is_active ?? true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    // If user is a lawyer and law_firm_id is provided, create lawyer record
    if (role === "lawyer" && law_firm_id) {
      await db.client.from("lawyers").insert([
        {
          user_id: user.id,
          law_firm_id,
          first_name: full_name?.split(" ")[0] || "",
          last_name: full_name?.split(" ").slice(1).join(" ") || "",
          email,
          phone,
        },
      ]);
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error in create user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
