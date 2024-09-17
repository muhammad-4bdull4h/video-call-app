"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Loader from "./Loader";
import { toast } from "./hooks/use-toast";

const MeetingCard = lazy(() => import("./MeetingCard"));

function CallList({ type }: { type: "upcoming" | "recording" | "ended" }) {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setrecordings] = useState<CallRecording[] | any>([]);
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recording":
        return recordings;
      case "upcoming":
        return upcomingCalls;

      default:
        return [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case "ended":
        return "No previous Calls";
      case "recording":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";

      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setrecordings(recordings);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recordings",
          variant: "destructive",
        });
      }
    };

    if (type === "recording") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallMessage = getNoCallMessage();

  return (
    <div
      className={`grid grid-cols-1 gap-5 ${
        !isLoading ? "xl:grid-cols-2 " : ""
      }`}
    >
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          return (
            <Suspense key={(meeting as Call)?.id} fallback={<Loader />}>
              <MeetingCard
                key={(meeting as Call)?.id}
                icon={
                  type === "ended"
                    ? "/icons/previous.svg"
                    : type === "upcoming"
                    ? "/icons/upcoming.svg"
                    : "/icons/recordings.svg"
                }
                title={
                  (meeting as Call).state?.custom?.description?.substring(
                    0,
                    26
                  ) ||
                  (meeting as CallRecording).filename?.substring(0, 26) ||
                  "Personal meeting"
                }
                date={
                  (meeting as Call).state?.startsAt?.toLocaleString() ||
                  (meeting as CallRecording).start_time?.toLocaleString()
                }
                isPreviousMeeting={type === "ended"}
                buttonIcon1={
                  type === "recording" ? "/icons/play.svg" : undefined
                }
                handleClick={
                  type === "recording"
                    ? () => {
                        router.push((meeting as CallRecording).url);
                      }
                    : () => {
                        router.push(`/meeting/${(meeting as Call)?.id}`);
                      }
                }
                link={
                  type === "recording"
                    ? (meeting as CallRecording).url
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                        (meeting as Call)?.id
                      }`
                }
                buttonText={type === "recording" ? "play" : "start"}
              />
            </Suspense>
          );
        })
      ) : isLoading ? (
        <div className="flex w-full mx-auto h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <h1 className="text-2xl">{noCallMessage}</h1>
      )}
    </div>
  );
}

export default CallList;
