"use client";

import { useState } from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Clipboard, ClipboardCheck, MousePointerClick } from "lucide-react";

interface MailClintInputsProps {
  mail: string;
}

export default function MailClintInputs({ mail }: MailClintInputsProps) {
  const [copied, setCopied] = useState(false);
  const [intputValue, setInputValue] = useState(mail);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(intputValue);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <Input
        name="mail"
        value={intputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="email"
        className="grow"
      />
      <Button type="submit" variant="outline">
        <MousePointerClick />
      </Button>
      <Button type="button" variant="outline" onClick={copy}>
        {copied ? (
          <ClipboardCheck className="h-5 w-5" />
        ) : (
          <Clipboard className="h-5 w-5" />
        )}
      </Button>
    </>
  );
}
