interface MailPageProps {
  params: { mail: string };
}

export default async function MailPage({ params }: MailPageProps) {
  const mail = params.mail + "@catway.org";

  return (
    <main className="mx-4 mb-14 mt-6 flex flex-col items-center justify-center gap-6 md:mx-[200px] md:mt-10 lg:mx-[300px] xl:mx-[400px] 2xl:mx-[700px]">
      <p>{mail}</p>
    </main>
  );
}
