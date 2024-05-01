import Link from "next/link";
import { Separator } from "~/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background fixed bottom-0 z-50 w-full">
      <Separator />
      <ul className="flex items-center justify-center px-5 py-1">
        <li>
          <Link
            title="Catway MAIL Github repository"
            target="_blank"
            href="https://github.com/TeaByte/catway-mail"
            className="hover:underline"
          >
            <strong className="text-sm font-semibold">
              Please ⭐ us on Github!
            </strong>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
