import { getInbox } from "~/server/queries";
import { Database } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface InboxProps {
  inboxId: string;
  isParallel?: boolean;
}

function getRemainingTime(expireAt: Date) {
  const remainingTime = expireAt.getTime() - Date.now();

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return `Will expire in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

export default async function Inbox({ inboxId, isParallel }: InboxProps) {
  const mailData = await getInbox(inboxId);

  return (
    <section className="mx-4 mb-14 flex flex-col items-center justify-center gap-6 lg:container lg:mx-auto">
      {mailData ? (
        <>
          <div className="flex w-full">
            {!isParallel && (
              <div className="w-full">
                <Link href={`/mail/${mailData.mailboxOwner.split("@")[0]}`}>
                  <Button className="w-full" variant="outline">
                    {mailData.mailboxOwner}
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-lg font-bold">
              {mailData.senderEmail}
            </h1>
            <p className="text-center text-sm font-semibold">
              {mailData.senderName}
            </p>
            <p className="text-center text-xs">
              {getRemainingTime(mailData.expireAt)}
            </p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm font-semibold">Subject:</p>
            <p className="w-full rounded border p-4 text-center text-lg font-semibold">
              {mailData.subject}
            </p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm font-semibold">Content:</p>
            <div className="trancate min-h-56 w-full truncate text-wrap rounded border p-4">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    mailData.html !== "No html"
                      ? mailData.html
                      : mailData.content,
                }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-2 text-lg font-semibold">
          <Database className="h-24 w-24" />
          Inbox not found or expired!
        </div>
      )}
    </section>
  );
}
