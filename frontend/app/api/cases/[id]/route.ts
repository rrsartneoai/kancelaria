import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: case_, error } = await supabase
      .from("cases")
      .select(
        `
        *,
        documents(*),
        analysis(*),
        generated_documents(*)
      `,
      )
      .eq("id", params.id)
      .eq("client_id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching case:", error);
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json({ case: case_ });
  } catch (error) {
    console.error("Error in GET /api/cases/[id]:", error);
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
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { client_notes } = body;

    const { data: updatedCase, error } = await supabase
      .from("cases")
      .update({
        client_notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("client_id", session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating case:", error);
      return NextResponse.json(
        { error: "Failed to update case" },
        { status: 500 },
      );
    }

    return NextResponse.json({ case: updatedCase });
  } catch (error) {
    console.error("Error in PUT /api/cases/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
