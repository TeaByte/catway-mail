import Image from "next/image";
import { Separator } from "~/components/ui/separator";

export default function TopNav() {
  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
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
        </div>
        {/* <Later /> */}
      </nav>
      <Separator />
    </>
  );
}
