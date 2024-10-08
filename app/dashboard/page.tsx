import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserDataByToken } from "@/data-access";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ProjectContextProvider from "@/context/CurrentProjectContext";
import Content from "./components/Content";

async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserDataByToken(session);

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <Navbar />
      <ProjectContextProvider>
        <Header user={user} />
        <Content />
      </ProjectContextProvider>
    </main>
  );
}

export default page;
