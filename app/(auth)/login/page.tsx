import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

async function page() {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return <LoginForm />;
}

export default page;
