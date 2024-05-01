import { Modal } from "./modal";
import Inbox from "~/components/inbox";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <Inbox />
    </Modal>
  );
}
