import CallList from "@/components/CallList";
import React from "react";

function Recording() {
  return (
    <section className="felx size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <CallList type="recording" />
    </section>
  );
}

export default Recording;
