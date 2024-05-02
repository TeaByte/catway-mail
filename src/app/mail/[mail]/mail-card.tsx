import Link from "next/link";

interface MailCardProps {
  id: string;
  senderEmail: string;
  senderName: string;
  subject: string;
  createdAt: Date | string;
  updatedAt: Date;
  expireAt: Date;
}

export default function MailCard({ mailData }: { mailData: MailCardProps }) {
  const createdAt = new Date(mailData.createdAt);

  return (
    <Link
      href={`/inbox/${mailData.id}`}
      className="rounded-md border p-4 hover:bg-primary/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="truncate font-bold">{mailData.senderEmail}</span>
          <span className="truncate text-sm">{mailData.senderName}</span>
        </div>
        <span className="text-sm font-semibold">
          {createdAt.toLocaleDateString()}
        </span>
      </div>
      <p className="truncate pt-2 text-lg font-extralight">
        {mailData.subject}
      </p>
    </Link>
  );
}
