import { auth } from "@/auth";
import { getUserData } from "@/lib/manageCookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  const userData = getUserData();

  if (!session) {
    redirect("/");
  }

  return <div>{JSON.stringify(userData)}</div>;
}

export default page;
