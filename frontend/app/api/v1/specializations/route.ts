import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/supabase";

export async function GET() {
  try {
    const specializations = await db.getSpecializations();

    const response = {
      data: specializations.map((spec) => ({
        type: "specializations",
        id: spec.id,
        attributes: {
          name: spec.name,
          code: spec.code,
          description: spec.description,
          is_active: spec.is_active,
          created_at: spec.created_at,
        },
      })),
      meta: {
        total: specializations.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Get specializations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Name and code are required" },
        { status: 400 },
      );
    }

    const specialization = await db.createSpecialization({
      name: body.name,
      code: body.code.toUpperCase(),
      description: body.description,
    });

    const response = {
      data: {
        type: "specializations",
        id: specialization.id,
        attributes: specialization,
      },
      meta: {
        created_at: specialization.created_at,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Create specialization error:", error);

    if (error.code === "23505") {
      // Unique constraint violation
      return NextResponse.json(
        { error: "Specialization with this code already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
