import type { Metadata, ResolvingMetadata } from "next";

import { getMailData, getMailDataCount } from "~/server/queries";

import MailInput from "~/app/_components/mail-input";
import MailSection from "./mails-section";

interface MailPageProps {
  params: { mail: string };
}

export async function generateMetadata({
  params,
}: MailPageProps): Promise<Metadata> {
  if (params.mail.includes("%40")) {
    params.mail = params.mail.split("%40")[0] ?? params.mail;
  }
  const mail = params.mail + "@catway.org";
  const mailsInMailBox = await getMailDataCount(mail);
  const title = `Inbox for ${mail}`;
  const description =
    mailsInMailBox > 0
      ? `You have ${mailsInMailBox} unread mails in your Catway inbox.`
      : `Purring into your inbox with temporary addresses, ensuring your privacy pounces away without a trace.`;
  return {
    title,
    description,
  };
}

export default async function MailPage({ params }: MailPageProps) {
  if (params.mail.includes("%40")) {
    params.mail = params.mail.split("%40")[0] ?? params.mail;
  }

  const mail = params.mail + "@catway.org";
  const mailData = await getMailData(mail);
  return (
    <main className="container mx-auto mb-14 mt-6 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-lg font-semibold lg:w-[60%]">
          Purring into your inbox with temporary addresses, ensuring your
          privacy pounces away without a trace.
        </p>
      </div>
      <MailInput defaultMail={mail} />
      <MailSection mailData={mailData} mailSlug={mail} />
    </main>
  );
}
