import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LawFirmCreateSchema } from "@/lib/api/types";

// Mock data for development - replace with real database
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
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Kancelaria Nowak Legal",
    tax_number: "9876543210",
    description: "Specjalizujemy się w prawie karnym i administracyjnym.",
    address: {
      street: "ul. Świętojańska 22",
      city: "Gdańsk",
      postal_code: "80-840",
      country: "PL",
    },
    contact: {
      phone: "+48987654321",
      email: "biuro@nowak-legal.pl",
    },
    created_at: "2015-03-20T00:00:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    is_active: true,
    lawyers: [],
    specializations: [
      {
        id: "550e8400-e29b-41d4-a716-446655440012",
        name: "Prawo Karne",
        code: "CRIMINAL",
        description: "Obrona w sprawach karnych",
      },
    ],
  },
];

const SearchParamsSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(100).default(20),
  sort: z.string().default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate search parameters
    const params = SearchParamsSchema.parse({
      q: searchParams.get("q") || undefined,
      city: searchParams.get("city") || undefined,
      specializations: searchParams.getAll("specializations"),
      page: searchParams.get("page") || "1",
      per_page: searchParams.get("per_page") || "20",
      sort: searchParams.get("sort") || "name",
      order: searchParams.get("order") || "asc",
    });

    // Filter law firms based on search parameters
    let filteredFirms = [...mockLawFirms];

    // Text search
    if (params.q) {
      const query = params.q.toLowerCase();
      filteredFirms = filteredFirms.filter(
        (firm) =>
          firm.name.toLowerCase().includes(query) ||
          (firm.description && firm.description.toLowerCase().includes(query)),
      );
    }

    // City filter
    if (params.city) {
      const city = params.city.toLowerCase();
      filteredFirms = filteredFirms.filter((firm) =>
        firm.address.city.toLowerCase().includes(city),
      );
    }

    // Specialization filter
    if (params.specializations && params.specializations.length > 0) {
      filteredFirms = filteredFirms.filter((firm) =>
        firm.specializations.some((spec) =>
          params.specializations!.includes(spec.code),
        ),
      );
    }

    // Sorting
    filteredFirms.sort((a, b) => {
      const aValue = a[params.sort as keyof typeof a] as string;
      const bValue = b[params.sort as keyof typeof b] as string;

      if (params.order === "desc") {
        return bValue.localeCompare(aValue);
      }
      return aValue.localeCompare(bValue);
    });

    // Pagination
    const total = filteredFirms.length;
    const pages = Math.ceil(total / params.per_page);
    const offset = (params.page - 1) * params.per_page;
    const paginatedFirms = filteredFirms.slice(
      offset,
      offset + params.per_page,
    );

    // Build JSON:API response
    const response = {
      data: paginatedFirms.map((firm) => ({
        type: "law-firms",
        id: firm.id,
        attributes: firm,
        relationships: {
          lawyers: {
            data: firm.lawyers.map((lawyer) => ({
              type: "lawyers",
              id: lawyer.id,
            })),
          },
        },
      })),
      included: paginatedFirms.flatMap((firm) =>
        firm.lawyers.map((lawyer) => ({
          type: "lawyers",
          id: lawyer.id,
          attributes: lawyer,
        })),
      ),
      meta: {
        total,
        page: params.page,
        per_page: params.per_page,
        pages,
        has_next: params.page < pages,
        has_prev: params.page > 1,
      },
      links: {
        self: `/api/v1/law-firms?page=${params.page}&per_page=${params.per_page}`,
        first: `/api/v1/law-firms?page=1&per_page=${params.per_page}`,
        last: `/api/v1/law-firms?page=${pages}&per_page=${params.per_page}`,
        ...(params.page < pages && {
          next: `/api/v1/law-firms?page=${params.page + 1}&per_page=${params.per_page}`,
        }),
        ...(params.page > 1 && {
          prev: `/api/v1/law-firms?page=${params.page - 1}&per_page=${params.per_page}`,
        }),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Law firms search error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid search parameters", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = LawFirmCreateSchema.parse(body);

    // Check if law firm with this tax number already exists
    const existingFirm = mockLawFirms.find(
      (firm) => firm.tax_number === validatedData.tax_number,
    );
    if (existingFirm) {
      return NextResponse.json(
        {
          error: `Law firm with tax number ${validatedData.tax_number} already exists`,
        },
        { status: 409 },
      );
    }

    // Create new law firm
    const newFirm = {
      id: crypto.randomUUID(),
      ...validatedData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
      lawyers: [],
      specializations: [], // In real implementation, fetch by specialization_ids
    };

    // Add to mock data (in real implementation, save to database)
    mockLawFirms.push(newFirm);

    // Return JSON:API response
    const response = {
      data: {
        type: "law-firms",
        id: newFirm.id,
        attributes: newFirm,
      },
      meta: {
        created_at: newFirm.created_at,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Create law firm error:", error);

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
