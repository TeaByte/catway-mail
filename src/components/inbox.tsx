import { getInbox } from "~/server/queries";
import { Database } from "lucide-react";

interface InboxProps {
  inboxId: string;
}

export default async function Inbox({ inboxId }: InboxProps) {
  const mailData = await getInbox(inboxId);
  return (
    <section className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      {mailData ? (
        <>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-lg font-bold">
              {mailData.senderEmail}
            </h1>
            <p className="text-center text-sm font-semibold">
              {mailData.senderName}
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
            <div className="flex min-h-56 w-full flex-col items-center justify-center rounded border p-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: mailData.html ? mailData.html : mailData.content,
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
