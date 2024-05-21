import { type NextRequest, NextResponse } from "next/server";
import { getMailData } from "~/server/queries";

interface APIProps {
  params: { id: string };
}

const badResponse = { ok: false, error: "mail not found" };

export async function GET(request: NextRequest, { params }: APIProps) {
  if (!params.id.includes("@")) {
    params.id = params.id + "@catway.org";
  }

  const data = await getMailData(params.id);

  if (!data) {
    return NextResponse.json(badResponse, {
      status: 403,
    });
  }

  // TEMP FIX
  // TODO: MAKE DB DELETE EXPIRE MAILBOX
  if (data.mails.length == 0) {
    return NextResponse.json(badResponse, {
      status: 403,
    });
  }

  return NextResponse.json({ ok: true, data });
}
