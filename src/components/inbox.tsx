interface InboxProps {
  subject: string;
  body: string;
  date: string;
  fromEmail: string;
  fromName: string;
}

export default function Inbox() {
  return (
    <section className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <p>11/12/2022</p>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-lg font-bold">example@thing.com</h1>
        <p className="text-center text-sm font-semibold">Yazan Alqasem</p>
      </div>
      <p className="text-lg font-semibold">Your code is 1123445</p>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-semibold">Subject:</p>
        <div className="flex min-h-56 w-full flex-col items-center justify-center rounded border p-4">
          This is a test
        </div>
      </div>
    </section>
  );
}
