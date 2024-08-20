import { DarkModeToggle } from "@/components/DarkModeToggle";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="flex justify-between items-center border-b-2 py-3 px-4 md:px-8 lg:px-16 border-primary-dark-800 dark:border-primary-light-200">
      <div>
        <Image
          src={"/logo-light.png"}
          alt="taskflow"
          width={120}
          height={120}
          className="dark:hidden"
        />
        <Image
          src={"/logo-dark.png"}
          alt="taskflow"
          width={120}
          height={120}
          className="hidden dark:block"
        />
      </div>
      <DarkModeToggle />
    </nav>
  );
}

export default Navbar;
