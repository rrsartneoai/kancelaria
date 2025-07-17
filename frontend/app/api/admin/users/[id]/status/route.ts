import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/supabase";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { is_active } = body;

    const { data: user, error } = await db.client
      .from("users")
      .update({
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user status:", error);
      return NextResponse.json(
        { error: "Failed to update user status" },
        { status: 500 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in update user status API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
