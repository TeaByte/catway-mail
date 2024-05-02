import Link from "next/link";

import { getMailData } from "~/server/queries";

import { Button } from "~/components/ui/button";
import MailCard from "./mail-card";
import MailInput from "~/app/_components/mail-input";
import { Info, RotateCcw } from "lucide-react";

interface MailPageProps {
  params: { mail: string };
}

export default async function MailPage({ params }: MailPageProps) {
  const mail = params.mail + "@catdns.in";
  const mailData = await getMailData(mail);

  return (
    <main className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-lg font-semibold">
          Purring into your inbox with temporary addresses, ensuring your
          privacy pounces away without a trace.
        </p>
      </div>
      <MailInput defaultMail={mail}>
        <Button type="button" variant="outline">
          <RotateCcw className="h5 w-5" />
        </Button>
      </MailInput>
      <section className="flex w-full flex-col gap-2">
        <p className="flex w-full items-center gap-1 ">
          <Info className="h-4 w-4" />
          <span className="text-start text-sm font-semibold">
            Total Emails: 0
          </span>
        </p>
        {mailData
          ? mailData.mails.map((mail) => (
              <MailCard key={mail.id} mailData={mail} />
            ))
          : null}
      </section>
    </main>
  );
}
