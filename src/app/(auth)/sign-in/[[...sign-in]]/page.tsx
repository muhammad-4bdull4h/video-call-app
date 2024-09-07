import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
}

export default SignInPage;
