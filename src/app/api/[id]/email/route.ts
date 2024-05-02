import { type NextRequest, NextResponse } from "next/server";
import { getMailData } from "~/server/queries";

interface APIProps {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: APIProps) {
  const data = await getMailData(params.id);

  if (!data) {
    return NextResponse.json(
      { ok: false, error: "mail not found" },
      {
        status: 403,
      },
    );
  }

  return NextResponse.json({ ok: true, data });
}
