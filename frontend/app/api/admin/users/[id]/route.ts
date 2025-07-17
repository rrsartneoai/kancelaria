import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { data: user, error } = await db.client
      .from("users")
      .select(
        `
        *,
        law_firm:law_firms(id, name),
        lawyer:lawyers(*)
      `,
      )
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user stats
    const [apiUsage, searches] = await Promise.all([
      db.client
        .from("api_usage")
        .select("id")
        .eq("law_firm_id", user.law_firm?.id)
        .then(({ data }) => data?.length || 0),
      db.client
        .from("search_analytics")
        .select("id")
        .eq("user_id", user.id)
        .then(({ data }) => data?.length || 0),
    ]);

    const userWithStats = {
      ...user,
      stats: {
        api_calls: apiUsage,
        searches,
        documents_analyzed: 0, // Placeholder
      },
    };

    return NextResponse.json({ user: userWithStats });
  } catch (error) {
    console.error("Error in get user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { email, full_name, phone, role, is_active } = body;

    // Update user
    const { data: user, error } = await db.client
      .from("users")
      .update({
        email,
        full_name,
        phone,
        role,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in update user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Soft delete - set is_active to false
    const { error } = await db.client
      .from("users")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in delete user API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
