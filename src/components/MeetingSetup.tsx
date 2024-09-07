"use client";
import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";

function MeetingSetup() {
  const [isMicCamToggeledOn, setIsMicCamToggeledOn] = React.useState(false);
  const call = useCall();
  useEffect(() => {
    if (isMicCamToggeledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justofy-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
    </div>
  );
}

export default MeetingSetup;
