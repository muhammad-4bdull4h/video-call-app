import Image from "next/image";
import React from "react";

function HomeCard({
  title,
  description,
  img,
  handleClick,
  className="",
}: {
  title: string;
  description: string;
  img: string;
  handleClick: () => void;
  className: string;
}) {
  return (
    <div
      onClick={handleClick}
      className={`${className} px-4 cursor-pointer py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]`}
    >
      <div className="flex justify-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} width={27} height={27} alt="Meeting" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
}

export default HomeCard;
