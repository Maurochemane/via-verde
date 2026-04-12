import { NextResponse } from "next/server";

// Mock database example (replace with real DB queries)
const providers = [
  {
    id: 1,
    name: "Bright Smile Dentist",
    category: "Dentist",
    location: "Cape Town",
    description: "Family-friendly dental care",
  },
  {
    id: 2,
    name: "Clean Car Wash",
    category: "Car Wash",
    location: "Cape Town",
    description: "Affordable car wash services",
  },
  // ...more providers
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";
  const type = searchParams.get("type") || "Any";
  // const location = searchParams.get("location"); // for future use

  // Filter providers by category (if not 'Any') and query keyword match (name or description)
  const results = providers.filter((p) => {
    const matchesType =
      type === "Any" || p.category.toLowerCase() === type.toLowerCase();

    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  return NextResponse.json(results);
}
