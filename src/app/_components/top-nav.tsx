import Image from "next/image";
import Link from "next/link";

import { Separator } from "~/components/ui/separator";

export default function TopNav() {
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <Link
          href={"/"}
          className="hover:text-primary flex items-center gap-2 hover:animate-pulse"
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
            CatWay<span className="text-primary">MAIL</span>
          </h1>
        </Link>
        {/* <Later /> */}
      </nav>
      <Separator />
    </>
  );
}
