import { getSession } from "@/lib/session";
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
