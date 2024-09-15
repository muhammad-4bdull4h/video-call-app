import Loader from "@/components/Loader";
import React, { lazy, Suspense } from "react";

const CallList = lazy(() => import("@/components/CallList"));

function Upcoming() {
  return (
    <section className="felx size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <Suspense fallback={<Loader />}>
        <CallList type="upcoming" />
      </Suspense>
    </section>
  );
}

export default Upcoming;
