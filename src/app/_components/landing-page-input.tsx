import { Icon } from "~/components/ui/plus-icon";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { MousePointerClick } from "lucide-react";

export default function LandingPageInput() {
  return (
    <>
      <div className="relative flex w-full flex-col items-start border border-white/[0.2] p-4">
        <Icon className="absolute -left-3 -top-3 h-6 w-6 text-white " />
        <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white " />
        <Icon className="absolute -right-3 -top-3 h-6 w-6 text-white " />
        <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-white " />
        <div className="flex h-full w-full items-start justify-center">
          <div className="flex gap-1">
            <Input type="email" className="w-60" />
            <Button variant="outline">
              <MousePointerClick />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 text-sm">
        Replace the email or stick with the random one.
        <div className="flex items-center gap-1">
          Click <MousePointerClick className="h-6 w-6" /> to get started.
        </div>
      </div>
    </>
  );
}
