"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-3" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-3xl mx-auto z-50", className)}
    >
      <div className="px-10">
      <Menu setActive={setActive}>
        <div className="px-8">
          <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          </div>
        <div className="px-8">
          <Link href="/dashboard">
          <MenuItem setActive={setActive} active={active} item="Explore" />
          </Link>
          </div>
        <div className="px-8">
          <Link href="/talk"> 
             <MenuItem setActive={setActive} active={active} item="Talk to Experts"/>
          </Link>
          </div>
      </Menu>
      </div>
    </div>
  );
}
