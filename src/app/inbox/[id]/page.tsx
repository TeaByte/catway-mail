import Inbox from "~/components/inbox";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <Inbox />;
}
