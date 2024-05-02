interface ApiSectionProps {
  title: string;
  endpoint: string;
  description: string;
  method: string;
  parameters: string;
  exampleUsage: string;
  response: string;
}

function ApiSection({
  title,
  endpoint,
  description,
  method,
  parameters,
  exampleUsage,
  response,
}: ApiSectionProps) {
  return (
    <section className="w-full">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex flex-col gap-2">
        <DataBox>{`Endpoint: ${endpoint}`}</DataBox>
        <DataBox>{`Description: ${description}`}</DataBox>
        <DataBox>{`Method: ${method}`}</DataBox>
        <DataBox>
          Parameters:
          <ul className="mb-4 ml-6 list-disc">
            <li>
              <div dangerouslySetInnerHTML={{ __html: parameters }}></div>
            </li>
          </ul>
        </DataBox>
        <DataBox>
          Example Usage:
          <pre className="mb-4 rounded-md p-4">
            <code>{exampleUsage}</code>
          </pre>
          <p>Response:</p>
          <pre>
            <code>{response}</code>
          </pre>
        </DataBox>
      </div>
    </section>
  );
}

function DataBox({ children }: { children: React.ReactNode }) {
  return <div className="rounded border p-2">{children}</div>;
}

export default function Docs() {
  return (
    <main className="container mx-auto mb-14 mt-6 flex flex-col items-center justify-center gap-6 lg:w-1/2">
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-lg font-semibold lg:w-[60%]">
          Purring into your inbox with temporary addresses, ensuring your
          privacy pounces away without a trace.
        </p>
      </div>
      <ApiSection
        title="Mail Data API"
        endpoint="https://mail.catway.org/api/:email/email"
        description="Retrieve mail data for a specific email."
        method="GET"
        parameters="<code>email</code> (string): Email address"
        exampleUsage="GET /api/sadf/email"
        response={`{
  "ok": true,
  "data": { ... }
}`}
      />
      <ApiSection
        title="Inbox API"
        endpoint="/api/:id/inbox"
        description="Retrieve inbox data for a specific inbox ID."
        method="GET"
        parameters="<code>id</code> (string): Inbox ID"
        exampleUsage="GET /api/:id/inbox"
        response={`{
  "ok": true,
  "data": { ... }
}`}
      />
    </main>
  );
}
