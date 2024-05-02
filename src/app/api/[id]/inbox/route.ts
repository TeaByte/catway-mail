import { type NextRequest, NextResponse } from "next/server";
import { getInbox } from "~/server/queries";

interface APIProps {
  params: { id: string };
}
export async function GET(request: NextRequest, { params }: APIProps) {
  const data = await getInbox(params.id);

  if (!data) {
    return NextResponse.json(
      { ok: false, error: "inbox not found" },
      {
        status: 403,
      },
    );
  }

  return NextResponse.json({ ok: true, data });
}
