import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SignoutButton from "./SignoutButton";
import { getUserDataByToken } from "@/data-access";

async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserDataByToken(session);

  console.log(user);

  return (
    <div>
      <SignoutButton />
    </div>
  );
}

export default page;
