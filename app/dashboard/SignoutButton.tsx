"use client";

import { Button } from "@/components/ui/button";
import SignOut from "@/lib/signout";

function SignoutButton() {
  return <Button onClick={() => SignOut()}>Signout</Button>;
}

export default SignoutButton;
