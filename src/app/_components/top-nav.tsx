import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function TopNav() {
  return (
    <>
      <nav className="z-40 flex items-center justify-between p-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:animate-pulse hover:text-primary"
        >
          <Image
            title="CatWay cat logo"
            draggable="false"
            src="/cat-logo.webp"
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-lg font-bold md:text-2xl">
            CatWay<span className="font-light">MAIL</span>
          </h1>
        </Link>
        <Link href={"/docs"}>
          <Button variant="outline">Docs</Button>
        </Link>
      </nav>
      <Separator />
    </>
  );
}
