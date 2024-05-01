"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import { ArrowBigLeftDash } from "lucide-react";
import { Button } from "~/components/ui/button";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-black/90 text-white"
      onClose={onDismiss}
    >
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={onDismiss}
          className="flex w-full gap-1 p-10 text-lg font-bold"
        >
          Go Back
          <ArrowBigLeftDash className="h-6 w-6" />
        </Button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
