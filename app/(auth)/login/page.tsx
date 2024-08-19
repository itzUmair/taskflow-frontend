import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import Image from "next/image";

async function page() {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <div className="pt-4 md:pt-8">
      <Image
        src="/logo-light.png"
        width={170}
        height={170}
        className="mx-auto my-4 md:my-8 dark:hidden"
        alt="taskflow"
      />
      <Image
        src="/logo-dark.png"
        width={170}
        height={170}
        className="mx-auto my-4 md:my-8 hidden dark:block"
        alt="taskflow"
      />
      <LoginForm />
    </div>
  );
}

export default page;
