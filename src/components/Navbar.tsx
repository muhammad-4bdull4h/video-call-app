import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`justify-between ${className} flex fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10`}
    >
      <Link href={"/"} className="flex items-center gap-1 ">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          className="max-sm:size-10"
          alt="Logo"
        />
        <p className="text-[22px] font-extrabold text-white">Boom</p>
      </Link>
      <div className="justify-between flex gap-5 ">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav className="sm:hidden " />
      </div>
    </nav>
  );
}

export default Navbar;
