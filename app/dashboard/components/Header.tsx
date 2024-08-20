import { getUserProjects } from "@/data-access";
import { User } from "@/types";
import { BackpackIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { ProjectSelector } from "./ProjectsSelector";
import { Button } from "@/components/ui/button";
import { ProjectMemberDisplay } from "./ProjectMemberDisplay";

async function Header({ user }: { user: User }) {
  const projects = await getUserProjects(user.user_id);

  return (
    <section className="flex justify-between items-center pt-4 px-4 md:px-8 lg:px-16">
      <Button
        variant="outline"
        className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600"
      >
        <span className="flex items-center justify-center font-bold text-lg bg-green-400 rounded-full w-6 h-6 mr-2">
          <p>{user?.fname[0].toUpperCase()}</p>
        </span>
        <span>
          <p>Profile</p>
        </span>
      </Button>
      <div className="flex gap-x-2">
        {projects && <ProjectMemberDisplay />}
        {projects && <ProjectSelector projects={projects} />}
        <Button
          variant="outline"
          className="bg-secondary-light-400 dark:bg-secondary-dark-600 outline-none border-none hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600"
        >
          <PlusIcon width={20} height={20} />
          <p className="hidden md:block ml-2">Add project</p>
        </Button>
      </div>
    </section>
  );
}

export default Header;
