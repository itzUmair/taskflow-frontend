import { DarkModeToggle } from "@/components/DarkModeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <h1>
      <DarkModeToggle />
      <Link href={"/login"}>login</Link>
      <Link href={"/dashbaord"}>dashboard</Link>
    </h1>
  );
}
