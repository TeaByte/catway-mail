import { getMailData } from "~/server/queries";

import MailInput from "~/app/_components/mail-input";
import MailSection from "./mails-section";

interface MailPageProps {
  params: { mail: string };
}

export default async function MailPage({ params }: MailPageProps) {
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
