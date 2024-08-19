import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import SignOut from "@/lib/signout";
import { redirect } from "next/navigation";
import SignoutButton from "./SignoutButton";

async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <SignoutButton />
    </div>
  );
}

export default page;
