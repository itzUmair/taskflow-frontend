"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <Button
      // variant="outline"
      className="border border-black text-black bg-secondary-light-400 dark:bg-secondary-dark-600 dark:text-white dark:border-white hover:bg-secondary-light-400 dark:hover:bg-secondary-dark-600"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
