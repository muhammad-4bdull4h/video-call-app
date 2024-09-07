import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignInUp() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
}

export default SignInUp;
