import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { avatarImages } from "../../constants";
import { Button } from "./ui/button";
import { toast } from "./hooks/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

function MeetingCard({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[16px] bg-dark-1 px-8 py-8 xl:max-w-[568px] ">
      <article className="flex flex-col gap-5">
        <Image src={icon} width={28} height={28} alt="upcoming" />
        <div className="flex justify-between">
          <div className="flex flex-col gap2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative ", {})}>
        <div className="relative w-full flex max-sm:hidden">
          {avatarImages.map((img, idx) => (
            <Image
              src={img}
              key={idx}
              alt="avatar"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: idx > 0 })}
              style={{ top: 0, left: idx * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[137px] size-10 bg-dark-4 border-[5px] border-dark-3 rounded-full">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} width={13} height={13} alt="meeting" />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              className="bg-dark-4 px-6"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
            >
              <Image
                src={"/icons/copy.svg"}
                width={20}
                height={20}
                alt={"copy"}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}

export default MeetingCard;
