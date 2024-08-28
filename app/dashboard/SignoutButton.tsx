"use client";

import { setCurrentSelectedProject } from "@/lib/localstorage";
import SignOut from "@/lib/signout";
import { PinLeftIcon } from "@radix-ui/react-icons";

function SignoutButton() {
  return (
    <button
      className="text-left flex items-center gap-x-1"
      onClick={() => {
        setCurrentSelectedProject(undefined);
        SignOut();
      }}
    >
      <PinLeftIcon width={20} height={20} />
      Signout
    </button>
  );
}

export default SignoutButton;
