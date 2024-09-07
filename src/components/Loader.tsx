import Image from "next/image";
import React from "react";

function Loader() {
  return (
    <div className="flex mx-auto h-screen">
      <Image
        src={"/icons/loading-circle.svg"}
        width={80}
        height={80}
        alt={"loader"}
        className="mx-auto"
      />
    </div>
  );
}

export default Loader;
