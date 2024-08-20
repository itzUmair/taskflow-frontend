"use client";

import { Button } from "@/components/ui/button";
import SignOut from "@/lib/signout";
import { PinLeftIcon } from "@radix-ui/react-icons";

function SignoutButton() {
  return (
    <button
      className="text-left flex items-center gap-x-1"
      onClick={() => SignOut()}
    >
      <PinLeftIcon width={20} height={20} />
      Signout
    </button>
  );
}

export default SignoutButton;
