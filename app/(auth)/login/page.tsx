import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import Image from "next/image";
import { DarkModeToggle } from "@/components/DarkModeToggle";

async function page() {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <main className="pt-4 md:pt-8">
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
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
    </main>
  );
}

export default page;
