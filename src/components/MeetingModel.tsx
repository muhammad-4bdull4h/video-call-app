import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface meetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}
function MeetingModel({
  isOpen,
  onClose,
  title,
  buttonText,
  className,
  children,
  handleClick,
  image,
  buttonIcon,
}: meetingModelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full flex max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            {image && (
              <Image src={image} width={72} height={72} alt="meeting" />
            )}
          </div>
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} width={13} height={13} alt="meeting" />
            )}
            &nbsp;
            {buttonText || "Schedule meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModel;
