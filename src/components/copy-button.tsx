"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
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
    <Button type="button" variant="outline" onClick={copy}>
      {copied ? (
        <ClipboardCheck className="h-5 w-5" />
      ) : (
        <Clipboard className="h-5 w-5" />
      )}
    </Button>
  );
}
