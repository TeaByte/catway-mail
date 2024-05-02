import Inbox from "~/components/inbox";

export default function InboxPage({
  params: { id: inboxId },
}: {
  params: { id: string };
}) {
  return <Inbox inboxId={inboxId} />;
}
