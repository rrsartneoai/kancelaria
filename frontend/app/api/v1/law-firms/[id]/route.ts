import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Mock data - same as in the main route
const mockLawFirms = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Kancelaria Kowalski & Associates",
    tax_number: "1234567890",
    krs_number: "0000123456",
    founded_date: "2010-01-15T00:00:00Z",
    description:
      "Profesjonalna kancelaria prawna specjalizująca się w prawie gospodarczym i cywilnym.",
    address: {
      street: "ul. Długa 15/3",
      city: "Gdańsk",
      postal_code: "80-831",
      country: "PL",
    },
    contact: {
      phone: "+48123456789",
      email: "kontakt@kowalski-law.pl",
      website: "https://kowalski-law.pl",
    },
    business_hours: {
      monday: "9:00-17:00",
      tuesday: "9:00-17:00",
      wednesday: "9:00-17:00",
      thursday: "9:00-17:00",
      friday: "9:00-17:00",
    },
    created_at: "2010-01-15T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    is_active: true,
    lawyers: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        first_name: "Jan",
        last_name: "Kowalski",
        title: "adw.",
        email: "j.kowalski@kowalski-law.pl",
        phone: "+48123456789",
        bar_number: "ADW12345",
      },
    ],
    specializations: [
      {
        id: "550e8400-e29b-41d4-a716-446655440010",
        name: "Prawo Gospodarcze",
        code: "COMMERCIAL",
        description: "Obsługa prawna przedsiębiorstw",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        name: "Prawo Cywilne",
        code: "CIVIL",
        description: "Sprawy cywilne i rodzinne",
      },
    ],
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const lawFirmId = params.id;

    // Validate UUID format
    const uuidSchema = z.string().uuid();
    const validatedId = uuidSchema.parse(lawFirmId);

    // Find law firm
    const lawFirm = mockLawFirms.find(
      (firm) => firm.id === validatedId && firm.is_active,
    );

    if (!lawFirm) {
      return NextResponse.json(
        { error: `Law firm with ID ${validatedId} not found` },
        { status: 404 },
      );
    }

    // Build JSON:API response with relationships
    const response = {
      data: {
        type: "law-firms",
        id: lawFirm.id,
        attributes: lawFirm,
        relationships: {
          lawyers: {
            data: lawFirm.lawyers.map((lawyer) => ({
              type: "lawyers",
              id: lawyer.id,
            })),
          },
          specializations: {
            data: lawFirm.specializations.map((spec) => ({
              type: "specializations",
              id: spec.id,
            })),
          },
        },
      },
      included: [
        ...lawFirm.lawyers.map((lawyer) => ({
          type: "lawyers",
          id: lawyer.id,
          attributes: lawyer,
        })),
        ...lawFirm.specializations.map((spec) => ({
          type: "specializations",
          id: spec.id,
          attributes: spec,
        })),
      ],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Get law firm error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid law firm ID format" },
        { status: 400 },
      );
    }

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
    const lawFirmId = params.id;
    const body = await request.json();

    // Validate UUID format
    const uuidSchema = z.string().uuid();
    const validatedId = uuidSchema.parse(lawFirmId);

    // Find law firm
    const firmIndex = mockLawFirms.findIndex(
      (firm) => firm.id === validatedId && firm.is_active,
    );

    if (firmIndex === -1) {
      return NextResponse.json(
        { error: `Law firm with ID ${validatedId} not found` },
        { status: 404 },
      );
    }

    // Validate update data
    const updateSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      address: z
        .object({
          street: z.string(),
          city: z.string(),
          postal_code: z.string(),
          country: z.string(),
        })
        .optional(),
      contact: z
        .object({
          phone: z.string().optional(),
          email: z.string().email().optional(),
          website: z.string().url().optional(),
        })
        .optional(),
    });

    const validatedData = updateSchema.parse(body);

    // Update law firm
    const updatedFirm = {
      ...mockLawFirms[firmIndex],
      ...validatedData,
      updated_at: new Date().toISOString(),
    };

    mockLawFirms[firmIndex] = updatedFirm;

    // Return JSON:API response
    const response = {
      data: {
        type: "law-firms",
        id: updatedFirm.id,
        attributes: updatedFirm,
      },
      meta: {
        updated_at: updatedFirm.updated_at,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Update law firm error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 },
      );
    }

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
    const lawFirmId = params.id;

    // Validate UUID format
    const uuidSchema = z.string().uuid();
    const validatedId = uuidSchema.parse(lawFirmId);

    // Find law firm
    const firmIndex = mockLawFirms.findIndex(
      (firm) => firm.id === validatedId && firm.is_active,
    );

    if (firmIndex === -1) {
      return NextResponse.json(
        { error: `Law firm with ID ${validatedId} not found` },
        { status: 404 },
      );
    }

    // Soft delete (set is_active to false)
    mockLawFirms[firmIndex].is_active = false;
    mockLawFirms[firmIndex].updated_at = new Date().toISOString();

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Delete law firm error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid law firm ID format" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
