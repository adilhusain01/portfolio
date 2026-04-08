"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

const navItems = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "achievements", href: "/achievements" },
  { name: "resume", href: "/resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-neutral-200/50 bg-white/60 backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-900/60 shadow-lg shadow-black/[0.03]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                isActive
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full -z-10" />
              )}
              {item.name}
            </Link>
          );
        })}
        <div className="w-[1px] h-4 mx-2 bg-neutral-300 dark:bg-neutral-700" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
