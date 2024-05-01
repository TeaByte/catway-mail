import Link from "next/link";
import Image from "next/image";

import LandingPageInput from "./_components/landing-page-input";

export default function LandingPage() {
  return (
    <main className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <div className="flex flex-col items-center gap-2">
        <Image
          draggable="false"
          title="CatWay cat logo"
          src="/cat-logo.webp"
          alt="logo"
          width={200}
          height={200}
          className="h-36 w-36"
        />
        <p className="text-center text-lg font-semibold">
          Purring into your inbox with temporary addresses, ensuring your
          privacy pounces away without a trace.
        </p>
      </div>
      <LandingPageInput />
      <div className="w-full">
        <Link
          className="bg-primary/20 hover:bg-primary/30 flex w-full flex-col gap-4 rounded-xl p-4 text-white"
          href="/docs"
        >
          <h3 className="text-2xl font-bold">API Documentation →</h3>
          <div className="text-lg">
            Learn more about Catway MAIL API, it benefits, and how to use it in
            your needs.
          </div>
        </Link>
      </div>
    </main>
  );
}
