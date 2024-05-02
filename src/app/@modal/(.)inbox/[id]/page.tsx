import { Modal } from "./modal";
import Inbox from "~/components/inbox";

export default function InboxPage({
  params: { id: inboxId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <Inbox inboxId={inboxId} />
    </Modal>
  );
}
